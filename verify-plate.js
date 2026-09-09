// Vercel / Next.js API route — DVLA Vehicle Enquiry Service (VES) proxy.
// Deploy at: api/verify-plate.js
//
// Required environment variable (set in your hosting provider's dashboard,
// NEVER in this file or in client code):
//   DVLA_API_KEY   — your real key from the DVLA developer portal
//
// Optional environment variable:
//   DVLA_ENV       — "uat" (default) or "production"
//                     Switch to "production" only once UAT testing passes.
//
// Flow:
//   Driver enters plate -> taps Verify -> this endpoint -> DVLA VES -> vehicle info -> app

const DVLA_ENDPOINTS = {
  uat: "https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
  production: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
};

function normalizePlate(raw) {
  return String(raw || "").trim().toUpperCase().replace(/\s+/g, "");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const registrationNumber = normalizePlate(req.body?.registrationNumber);

  if (!registrationNumber) {
    return res.status(400).json({ error: "Invalid vehicle registration number." });
  }
  if (!/^[A-Z0-9]+$/.test(registrationNumber)) {
    return res.status(400).json({ error: "Invalid vehicle registration number." });
  }

  const apiKey = process.env.DVLA_API_KEY;
  if (!apiKey) {
    console.error("DVLA_API_KEY is not set in the environment.");
    return res.status(500).json({ error: "DVLA service is temporarily unavailable. Please try again later." });
  }

  const env = process.env.DVLA_ENV === "production" ? "production" : "uat";
  const dvlaUrl = DVLA_ENDPOINTS[env];

  let dvlaRes;
  try {
    dvlaRes = await fetch(dvlaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ registrationNumber }),
    });
  } catch (err) {
    console.error("DVLA VES network error:", err);
    return res.status(502).json({ error: "DVLA service is temporarily unavailable. Please try again later." });
  }

  let data = null;
  try {
    data = await dvlaRes.json();
  } catch {
    // some error responses have no body
  }

  switch (dvlaRes.status) {
    case 200:
      return res.status(200).json(data);
    case 400:
      return res.status(400).json({ error: "Invalid vehicle registration number." });
    case 404:
      return res.status(404).json({ error: "Vehicle not found." });
    case 429:
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    case 500:
    case 503:
      return res.status(dvlaRes.status).json({ error: "DVLA service is temporarily unavailable. Please try again later." });
    default:
      console.error("Unexpected DVLA VES response:", dvlaRes.status, data);
      return res.status(502).json({ error: "DVLA service is temporarily unavailable. Please try again later." });
  }
}
