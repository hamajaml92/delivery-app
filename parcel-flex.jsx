import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Package,
  MapPin,
  Camera,
  Wallet,
  User,
  Home,
  Navigation,
  ChevronRight,
  CheckCircle2,
  Clock,
  Banknote,
  CreditCard,
  X,
  Receipt,
  Phone,
  Mail,
  Lock,
  LogOut,
  ArrowRight,
  ArrowLeft,
  LocateFixed,
  Car,
  Truck,
  Container,
  Sun,
  Moon,
  Globe,
  ShieldCheck,
  XCircle,
  LayoutDashboard,
  Eye,
  Download,
  ShieldOff,
  ScanFace,
  LifeBuoy,
  Users,
  Shield,
  FileCheck2,
  Search,
  Bell,
} from "lucide-react";

/* ============================================================
   THEME TOKENS — dark (default) and light
============================================================ */
const DARK = {
  ink: "#10161F",
  surface: "#1A2330",
  raised: "#232F3E",
  hairline: "#2A3542",
  accent: "#FF9900",
  onAccent: "#1A1200",
  signal: "#00A8E8",
  onSignal: "#04222E",
  caution: "#FFC107",
  danger: "#FF6B6B",
  text: "#F4F6F8",
  textDim: "#8C99A8",
  textFaint: "#5C6875",
  overlay: "rgba(4,6,9,0.6)",
  chromeBg: "rgba(16,22,31,0.6)",
};

const LIGHT = {
  ink: "#F3F4F6",
  surface: "#FFFFFF",
  raised: "#F0F2F5",
  hairline: "#E1E5EA",
  accent: "#FF9900",
  onAccent: "#1A1200",
  signal: "#0089C4",
  onSignal: "#FFFFFF",
  caution: "#B8790A",
  danger: "#D6493D",
  text: "#12161C",
  textDim: "#5B6672",
  textFaint: "#8A94A0",
  overlay: "rgba(20,22,26,0.45)",
  chromeBg: "rgba(255,255,255,0.7)",
};

const RADIUS = { sheet: 28, card: 18, chip: 12, control: 14 };
const BASE_FARE = 4.0;
const PER_MILE_RATE = 1.89;

// Pricing varies by vehicle type — larger vehicles cost more, and Recovery
// uses a callout-fee model instead of a standard parcel base fare.
const VEHICLE_PRICING = {
  car: { base: 4.0, perMile: 1.89 },
  small_van: { base: 6.0, perMile: 2.2 },
  large_van: { base: 9.0, perMile: 2.6 },
  recovery: { base: 45.0, perMile: 2.5 },
};
const money = (n) => `£${n.toFixed(2)}`;

/* ============================================================
   TRANSLATIONS — English / Kurdish (Sorani)
============================================================ */
const STRINGS = {
  en: {
    tagline: "Parcels, on the move",
    welcomeBack: "Welcome back.",
    createProfile: "Create your profile.",
    signInContinue: "Sign in to continue.",
    setupAccount: "Set up an account to get started.",
    roleCustomer: "Send a parcel",
    roleDriver: "Drive & earn",
    fullName: "Full name",
    email: "Email address",
    emailNote: "We'll send your booking confirmations here.",
    mobileNumber: "Mobile number",
    vehicleType: "Vehicle type",
    vehicleCar: "Car",
    vehicleSmallVan: "Small van",
    vehicleLargeVan: "Large van",
    vehicleRecovery: "Recovery",
    vehiclePlateLabel: "Vehicle number plate",
    vehiclePlatePlaceholder: "AB12 CDE",
    verifyPlate: "Verify",
    checkingPlate: "Checking…",
    plateVerified: "Verified with DVLA",
    plateNotFound: "No vehicle found for that plate.",
    plateLookupFailed: "Couldn't reach the DVLA lookup service. You can continue without verifying.",
    plateNoApiKey: "Plate verification isn't set up yet. You can continue without it.",
    dvlaMake: "Make",
    dvlaColour: "Colour",
    dvlaYear: "Year",
    dvlaFuel: "Fuel",
    dvlaTax: "Tax",
    dvlaMot: "MOT",
    plateEmpty: "Please enter a vehicle registration number.",
    plateInvalid: "Invalid vehicle registration number.",
    plateAuthProblem: "DVLA authentication/API key problem.",
    plateRateLimited: "Too many requests. Please try again later.",
    plateServiceDown: "DVLA service is temporarily unavailable.",
    dvlaModel: "Model",
    dvlaEngine: "Engine",
    dvlaCo2: "CO2",
    dvlaEuroStatus: "Euro status",
    dvlaTypeApproval: "Type approval",
    dvlaWheelplan: "Wheelplan",
    dvlaTaxDue: "Tax due",
    dvlaExport: "Marked for export",
    yesWord: "Yes",
    noWord: "No",
    documentsTitle: "Verify your details",
    documentsHint: "Upload these so our team can verify you before you start driving.",
    vehiclePhoto: "Vehicle photo",
    driverPhoto: "Driver photo",
    tapToScanFace: "Tap to scan your face",
    faceScanComplete: "Face scan complete",
    idDocument: "Passport or driving licence",
    uploadPhoto: "Upload photo",
    changePhoto: "Change photo",
    submitForReview: "Submit for review",
    documentsSubmitError: "Couldn't submit your application. Please try again.",
    pendingReviewTitle: "Your account is under review",
    pendingReviewHint: "Our team is verifying your documents. We'll notify you once you're approved — this usually takes less than 24 hours.",
    simulateApproval: "Simulate admin approval (demo)",
    applicationRejectedTitle: "Application not approved",
    applicationRejectedHint: "Your driver application wasn't approved. Contact support if you think this is a mistake.",
    password: "Password",
    confirmPassword: "Confirm password",
    passwordsMismatch: "Passwords don't match.",
    continueAs: "Continue as",
    createAccountAs: "Create account as",
    customerWord: "customer",
    driverWord: "driver",
    alreadyHaveAccount: "Already have an account? Log in",
    newHere: "New here? Create a profile",
    demoCreds: "Enter your details to continue.",
    noAccountFound: "We couldn't find an account with these details. Create a profile to get started.",
    accountOnHold: "Your account is on hold. Contact support for help.",
    accountDisabled: "Your account has been disabled. Contact support for help.",
    accountOnHoldTitle: "Your account is on hold",
    accountOnHoldHint: "An admin has put your account on hold. Contact support if you think this is a mistake.",
    accountDisabledTitle: "Your account has been disabled",
    accountDisabledHint: "An admin has disabled your account. Contact support if you think this is a mistake.",
    phoneAlreadyRegistered: "An account with this number already exists. Log in instead.",
    processing: "Please wait…",
    forgotPasswordLink: "Forgot password?",
    forgotPasswordTitle: "Reset your password",
    forgotPasswordHint: "Enter the mobile number on your account and we'll let you set a new password.",
    findAccountBtn: "Find account",
    resetPasswordTitle: "Set a new password",
    resetPasswordHint: "Choose a new password for your account.",
    newPassword: "New password",
    resetPasswordBtn: "Reset password",
    passwordResetDone: "Password updated",
    passwordResetDoneHint: "You can now log in with your new password.",
    backToLogin: "Back to log in",
    confirmEmailTitle: "Confirm your account",
    confirmEmailHint: "We've sent a 4-digit confirmation code to",
    confirmationCode: "Confirmation code",
    demoCodeNote: "Demo code",
    resendCode: "Resend code",
    confirmBtn: "Confirm",
    invalidCode: "That code isn't right. Try again.",

    findAddress: "Find address",
    searching: "Searching…",
    selectYourAddress: "Select your address",
    changeAddress: "Change",
    noAddressesFound: "No addresses found for that postcode. Check it and try again.",
    lookupUnavailable: "Couldn't reach the address lookup service. Showing an estimate instead.",
    offlineEstimateNote: "Estimated addresses — live lookup was unavailable.",
    enterPostcode: "Enter a UK postcode",
    invalidPostcode: "Enter a valid UK postcode, e.g. SE1 7PB",
    useMyLocation: "Use my current location",
    locating: "Locating…",
    orEnterPostcode: "or enter a postcode",
    locationUnavailable: "Couldn't access your location. Check permissions and try again.",

    navOffers: "Offers",
    navWallet: "Wallet",
    navProfile: "Profile",
    navBook: "Book",
    navHistory: "History",

    walletBalance: "Wallet balance",
    youOffline: "You're offline",
    goOnlineHint: "Switch on to start receiving delivery offers nearby.",
    offersNearby: "offers nearby",
    accept: "Accept",
    viewOrder: "View order",
    newOrder: "New order",
    slideToAccept: "Slide to accept",
    accepted: "Accepted",
    decline: "Decline",
    cash: "Cash",
    card: "Card",
    online: "Online",
    offline: "Offline",

    pickingUpFrom: "Picking up from",
    droppingOffAt: "Dropping off at",
    pickupNote: "Ask at the front desk for the parcel.",
    dropoffNote: "Leave with reception if there's no answer.",
    job: "Job",
    completePickup: "Complete pickup & photo",
    confirmDropoff: "Confirm drop-off",

    earnings: "Earnings",
    walletTitle: "Wallet",
    availableBalance: "Available balance",
    recentActivity: "Recent activity",
    noDeliveriesYet: "No completed deliveries yet.",

    profileTitle: "Profile",
    logOut: "Log out",
    dvlaLicence: "DVLA licence",
    insurance: "Hire & reward insurance",
    shareCode: "DBS share code",
    verified: "Verified",
    savedAddresses: "Saved addresses",
    paymentMethods: "Payment methods",
    notifications: "Notifications",
    helpAndSupport: "Help & support",
    helpHint: "Tell us what's wrong or what you'd like to change. Our team will get back to you.",
    helpPlaceholder: "Type your question or complaint here…",
    sendMessage: "Send message",
    messageSentTitle: "Message sent",
    messageSentHint: "Thanks — our support team will review your message and get in touch if needed.",
    walletAdjustmentTitle: "Balance adjustment request",
    walletAdjustmentHint: "An admin wants to update your wallet balance. Nothing changes until you accept.",
    phoneLabel: "Mobile number",
    emailLabel: "Email address",
    vehicleLabel: "Vehicle type",
    driverActive: "Driver · Active",
    customerLondon: "Customer · London",

    newDelivery: "New delivery",
    whereGoing: "Where's it going?",
    pickupPostcode: "Pickup postcode",
    dropoffPostcode: "Drop-off postcode",
    parcelSize: "Parcel size",
    sizeEnvelope: "Envelope",
    sizeSmall: "Small",
    sizeMedium: "Medium",
    sizeLarge: "Large",
    paymentLabel: "Payment",
    getQuote: "Get a quote",

    yourQuote: "Your quote",
    baseFare: "Base fare",
    calloutFee: "Callout fee",
    milesAt: "miles at",
    total: "Total",
    confirmOrder: "Confirm order",
    confirmPay: "Confirm & pay",

    findingDriver: "Finding a nearby driver…",
    findingDriverHint: "Matching you with the closest available driver.",
    noDriversNearby: "No drivers available right now",
    noDriversNearbyHint: "We couldn't find a nearby driver in time. Please try again shortly.",
    backToBooking: "Back to booking",
    stageConfirmed: "Order confirmed",
    stageAssigned: "Driver assigned",
    stageHeadingToPickup: "Driver is heading to pickup",
    stagePickedUp: "Picked up",
    stageOnWay: "On the way",
    stageDelivered: "Delivered",
    simulateNext: "Simulate next update",
    milesAwaySuffix: "mi away",
    liveTracking: "Live tracking…",
    bookAnother: "Book another delivery",

    yourDeliveries: "Your deliveries",
    noPastDeliveries: "No past deliveries yet.",
    toWord: "to",
  },
  ku: {
    tagline: "گەیاندنی بارگە لە کاتی جوڵان",
    welcomeBack: "بەخێربێیتەوە.",
    createProfile: "پڕۆفایلی خۆت دروست بکە.",
    signInContinue: "بچۆرەژوورەوە بۆ بەردەوامبوون.",
    setupAccount: "هەژمارێک دروست بکە بۆ دەستپێکردن.",
    roleCustomer: "ناردنی بارگە",
    roleDriver: "شۆفێری بکە و داهات بەدەستبهێنە",
    fullName: "ناوی تەواو",
    email: "ناونیشانی ئیمێڵ",
    emailNote: "پشتڕاستکردنەوەی داواکاریەکانت بۆ ئێرە دەنێرین.",
    mobileNumber: "ژمارەی مۆبایل",
    vehicleType: "جۆری ئۆتۆمبیل",
    vehicleCar: "ئۆتۆمبیل",
    vehicleSmallVan: "ڤانی بچووک",
    vehicleLargeVan: "ڤانی گەورە",
    vehicleRecovery: "ڕەیکەڤەری",
    vehiclePlateLabel: "پلێتی ژمارەی ئۆتۆمبیل",
    vehiclePlatePlaceholder: "AB12 CDE",
    verifyPlate: "پشتڕاستکردنەوە",
    checkingPlate: "پشکنین...",
    plateVerified: "لەلایەن DVLA پشتڕاستکراوەتەوە",
    plateNotFound: "هیچ ئۆتۆمبیلێک بۆ ئەم پلێتە نەدۆزرایەوە.",
    plateLookupFailed: "نەمانتوانی پەیوەندی بە خزمەتگوزاری DVLA بکەین. دەتوانیت بەبێ پشتڕاستکردنەوە بەردەوامبیت.",
    plateNoApiKey: "پشتڕاستکردنەوەی پلێت هێشتا ئامادە نەکراوە. دەتوانیت بەبێ ئەوە بەردەوامبیت.",
    dvlaMake: "بەرهەمهێنەر",
    dvlaColour: "ڕەنگ",
    dvlaYear: "ساڵ",
    dvlaFuel: "سووتەمەنی",
    dvlaTax: "باج",
    dvlaMot: "پشکنینی گشتی (MOT)",
    plateEmpty: "تکایە ژمارەی پلێتی ئۆتۆمبیل بنووسە.",
    plateInvalid: "ژمارەی پلێتی ئۆتۆمبیل نادروستە.",
    plateAuthProblem: "کێشەیەک هەیە لە پشتڕاستکردنەوە/API key-ی DVLA.",
    plateRateLimited: "داواکاری زۆر کراوە. تکایە دواتر هەوڵبدەرەوە.",
    plateServiceDown: "خزمەتگوزاری DVLA کاتییانە بەردەست نییە.",
    dvlaModel: "مۆدێل",
    dvlaEngine: "بزوێنەر",
    dvlaCo2: "CO2",
    dvlaEuroStatus: "پلەی یۆرۆ",
    dvlaTypeApproval: "جۆری پەسەندکراو",
    dvlaWheelplan: "شێوازی چەرخ",
    dvlaTaxDue: "کاتی باج",
    dvlaExport: "نیشانکراو بۆ هەناردە",
    yesWord: "بەڵێ",
    noWord: "نەخێر",
    documentsTitle: "زانیارییەکانت پشتڕاست بکەرەوە",
    documentsHint: "ئەمانە بار بکە بۆ ئەوەی تیمەکەمان پشتڕاستت بکاتەوە پێش دەستپێکردنی شۆفێری.",
    vehiclePhoto: "وێنەی ئۆتۆمبیل",
    driverPhoto: "وێنەی شۆفێر",
    tapToScanFace: "کرتەبکە بۆ سکانکردنی ڕووت",
    faceScanComplete: "سکانی ڕوو تەواو بوو",
    idDocument: "پاسپۆرت یان ئیجازەی شۆفێری",
    uploadPhoto: "وێنە باربکە",
    changePhoto: "وێنە بگۆڕە",
    submitForReview: "بۆ پێداچوونەوە بینێرە",
    documentsSubmitError: "نەمانتوانی داواکارییەکەت بنێرین. تکایە دووبارە هەوڵبدەرەوە.",
    pendingReviewTitle: "هەژمارەکەت لە پێداچوونەوەدایە",
    pendingReviewHint: "تیمەکەمان بەڵگەنامەکانت پشتڕاست دەکاتەوە. کاتێک پەسەندکرا ئاگادارت دەکەینەوە — ئەمە زۆربەی کات کەمتر لە ٢٤ کاتژمێر دەخایەنێت.",
    simulateApproval: "پەسەندکردنی ئەدمین شێوەبکەرەوە (نموونە)",
    applicationRejectedTitle: "داواکارییەکە پەسەند نەکرا",
    applicationRejectedHint: "داواکاری شۆفێریتی تۆ پەسەند نەکرا. ئەگەر پێت وایە ئەمە هەڵەیە، پەیوەندی بە پشتگیری بکە.",
    password: "وشەی نهێنی",
    confirmPassword: "دووپاتکردنەوەی وشەی نهێنی",
    passwordsMismatch: "وشە نهێنییەکان یەک ناگرنەوە.",
    continueAs: "بەردەوامبە وەک",
    createAccountAs: "هەژمار دروستبکە وەک",
    customerWord: "کڕیار",
    driverWord: "شۆفێر",
    alreadyHaveAccount: "پێشتر هەژمارت هەیە؟ بچۆرەژوورەوە",
    newHere: "تازەیت لێرە؟ پڕۆفایلێک دروستبکە",
    demoCreds: "زانیارییەکانت بنووسە بۆ بەردەوامبوون.",
    noAccountFound: "هیچ هەژمارێکمان بەم زانیاریانە نەدۆزییەوە. پڕۆفایلێک دروستبکە بۆ دەستپێکردن.",
    accountOnHold: "هەژمارەکەت وەستێنراوە. پەیوەندی بە پشتگیری بکە.",
    accountDisabled: "هەژمارەکەت لابراوە. پەیوەندی بە پشتگیری بکە.",
    accountOnHoldTitle: "هەژمارەکەت وەستێنراوە",
    accountOnHoldHint: "ئەدمینێک هەژمارەکەتی وەستاندووە. ئەگەر پێت وایە ئەمە هەڵەیە، پەیوەندی بە پشتگیری بکە.",
    accountDisabledTitle: "هەژمارەکەت لابراوە",
    accountDisabledHint: "ئەدمینێک هەژمارەکەتی لابردووە. ئەگەر پێت وایە ئەمە هەڵەیە، پەیوەندی بە پشتگیری بکە.",
    phoneAlreadyRegistered: "هەژمارێک بەم ژمارەیە پێشتر هەیە. بچۆرەژوورەوە.",
    processing: "تکایە چاوەڕێبە...",
    forgotPasswordLink: "وشەی نهێنیت لەبیرچووە؟",
    forgotPasswordTitle: "وشەی نهێنی نوێ دابنێ",
    forgotPasswordHint: "ژمارە مۆبایلی هەژمارەکەت بنووسە با وشەی نهێنیەکی نوێت بۆ دابنێین.",
    findAccountBtn: "هەژمار بدۆزەوە",
    resetPasswordTitle: "وشەی نهێنی نوێ دابنێ",
    resetPasswordHint: "وشەی نهێنیەکی نوێ بۆ هەژمارەکەت هەڵبژێرە.",
    newPassword: "وشەی نهێنی نوێ",
    resetPasswordBtn: "وشەی نهێنی نوێبکەرەوە",
    passwordResetDone: "وشەی نهێنی نوێکرایەوە",
    passwordResetDoneHint: "ئێستا دەتوانیت بە وشەی نهێنی نوێکەت بچیتەژوورەوە.",
    backToLogin: "گەڕانەوە بۆ چوونەژوورەوە",
    confirmEmailTitle: "هەژمارەکەت پشتڕاست بکەرەوە",
    confirmEmailHint: "کۆدی پشتڕاستکردنەوەی ٤ ژمارەیمان نارد بۆ",
    confirmationCode: "کۆدی پشتڕاستکردنەوە",
    demoCodeNote: "کۆدی نموونە",
    resendCode: "دووبارە کۆدەکە بنێرەوە",
    confirmBtn: "پشتڕاستبکەرەوە",
    invalidCode: "کۆدەکە دروست نییە. دووبارە هەوڵبدەرەوە.",

    findAddress: "ئەدرەس بدۆزەوە",
    searching: "گەڕان...",
    selectYourAddress: "ئەدرەسەکەت هەڵبژێرە",
    changeAddress: "گۆڕین",
    noAddressesFound: "هیچ ئەدرەسێک بۆ ئەم پۆستکۆدە نەدۆزرایەوە. دووبارە بیپشکنە.",
    lookupUnavailable: "نەمانتوانی پەیوەندی بە خزمەتگوزاری دۆزینەوەی ئەدرەس بکەین. خەمڵاندنێک پیشان دەدەین.",
    offlineEstimateNote: "ئەمانە خەمڵاندنن — دۆزینەوەی ڕاستەوخۆ بەردەست نەبوو.",
    enterPostcode: "پۆستکۆدێکی بەریتانی بنووسە",
    invalidPostcode: "پۆستکۆدێکی دروست بنووسە، بۆ نموونە SE1 7PB",
    useMyLocation: "شوێنی ئێستام بەکاربهێنە",
    locating: "دیاریکردنی شوێن...",
    orEnterPostcode: "یان پۆستکۆدێک بنووسە",
    locationUnavailable: "نەمانتوانی شوێنەکەت بدۆزینەوە. مۆڵەتەکان بپشکنە و دووبارە هەوڵبدەرەوە.",

    navOffers: "داواکاریەکان",
    navWallet: "کیسەپارە",
    navProfile: "پڕۆفایل",
    navBook: "داواکردن",
    navHistory: "مێژوو",

    walletBalance: "باڵانسی کیسەپارە",
    youOffline: "ئۆفلاینیت",
    goOnlineHint: "ئۆنلاین ببە بۆ وەرگرتنی داواکاری گەیاندن لە نزیکەوە.",
    offersNearby: "داواکاری لە نزیک",
    accept: "وەریگرە",
    viewOrder: "بینینی داواکاری",
    newOrder: "داواکاری نوێ",
    slideToAccept: "بۆ وەرگرتن بیخشێنە",
    accepted: "وەرگیرا",
    decline: "ڕەتکردنەوە",
    cash: "کاش",
    card: "کارت",
    online: "ئۆنلاین",
    offline: "ئۆفلاین",

    pickingUpFrom: "وەرگرتن لە",
    droppingOffAt: "گەیاندن بۆ",
    pickupNote: "لە مێزی پێشوازی داوای بارگەکە بکە.",
    dropoffNote: "ئەگەر وەڵامت نەدایەوە لەلای پێشوازیکردن بیهێڵەوە.",
    job: "داواکاری",
    completePickup: "وەرگرتن تەواوبکە و وێنە بگرە",
    confirmDropoff: "دووپاتکردنەوەی گەیاندن",

    earnings: "داهات",
    walletTitle: "کیسەپارە",
    availableBalance: "باڵانسی بەردەست",
    recentActivity: "چالاکی دواین",
    noDeliveriesYet: "هیچ گەیاندنێکی تەواو نەکراوە.",

    profileTitle: "پڕۆفایل",
    logOut: "چوونەدەرەوە",
    dvlaLicence: "مۆڵەتی لێخوڕین (DVLA)",
    insurance: "بیمەی کرێ و پاداشت",
    shareCode: "کۆدی هاوبەشی DBS",
    verified: "پشتڕاستکراوەتەوە",
    savedAddresses: "ناونیشانە پاشەکەوتکراوەکان",
    paymentMethods: "شێوازەکانی پارەدان",
    notifications: "ئاگادارکردنەوەکان",
    helpAndSupport: "یارمەتی و پشتگیری",
    helpHint: "پێمان بڵێ کێشەکەت چییە یان دەتەوێت چی بگۆڕدرێت. تیمی پشتگیریمان وەڵامت دەداتەوە.",
    helpPlaceholder: "پرسیار یان سکاڵاکەت لێرە بنووسە...",
    sendMessage: "نامە بنێرە",
    messageSentTitle: "نامەکە نێردرا",
    messageSentHint: "سوپاس — تیمی پشتگیریمان سەیری نامەکەت دەکات و ئەگەر پێویست بوو پەیوەندیت پێوە دەکەن.",
    walletAdjustmentTitle: "داواکاری گۆڕینی باڵانس",
    walletAdjustmentHint: "ئەدمینێک دەیەوێت باڵانسی کیسە پارەکەت نوێبکاتەوە. هیچ شتێک ناگۆڕدرێت هەتاوەکو پەسەندی بکەیت.",
    phoneLabel: "ژمارەی مۆبایل",
    emailLabel: "ناونیشانی ئیمێڵ",
    vehicleLabel: "جۆری ئۆتۆمبیل",
    driverActive: "شۆفێر · چالاک",
    customerLondon: "کڕیار · لەندەن",

    newDelivery: "گەیاندنی نوێ",
    whereGoing: "بۆ کوێ دەچێت؟",
    pickupPostcode: "پۆستکۆدی وەرگرتن",
    dropoffPostcode: "پۆستکۆدی گەیاندن",
    parcelSize: "قەبارەی بارگە",
    sizeEnvelope: "پاکەت",
    sizeSmall: "بچووک",
    sizeMedium: "مامناوەند",
    sizeLarge: "گەورە",
    paymentLabel: "پارەدان",
    getQuote: "نرخ وەربگرە",

    yourQuote: "نرخەکەت",
    baseFare: "نرخی سەرەتایی",
    calloutFee: "نرخی بانگکردن",
    milesAt: "میل بە نرخی",
    total: "کۆی گشتی",
    confirmOrder: "داواکاری پشتڕاستبکەرەوە",
    confirmPay: "پشتڕاستکردنەوە و پارەدان",

    findingDriver: "گەڕان بەدوای شۆفێرێکی نزیک...",
    findingDriverHint: "لەگەڵ نزیکترین شۆفێری بەردەست ڕێکت دەخەین.",
    noDriversNearby: "ئێستا هیچ شۆفێرێک بەردەست نییە",
    noDriversNearbyHint: "لە کاتی دیاریکراودا شۆفێرێکی نزیکمان نەدۆزییەوە. تکایە دواتر هەوڵبدەرەوە.",
    backToBooking: "گەڕانەوە بۆ داواکردن",
    stageConfirmed: "داواکاری پشتڕاستکرا",
    stageAssigned: "شۆفێر دیاریکرا",
    stageHeadingToPickup: "شۆفێر بەرەو شوێنی وەرگرتن دەڕوات",
    stagePickedUp: "وەرگیرا",
    stageOnWay: "لە ڕێگادایە",
    stageDelivered: "گەیەندرا",
    simulateNext: "نوێکردنەوەی داهاتوو نیشان بدە",
    milesAwaySuffix: "میل دوورە",
    liveTracking: "شوێنپێگرتنی ڕاستەوخۆ...",
    bookAnother: "گەیاندنێکی تر داوابکە",

    yourDeliveries: "گەیاندنەکانت",
    noPastDeliveries: "هیچ گەیاندنێکی پێشوو نییە.",
    toWord: "بۆ",
  },
  ar: {
    tagline: "الطرود في طريقها",
    welcomeBack: "مرحبًا بعودتك.",
    createProfile: "أنشئ ملفك الشخصي.",
    signInContinue: "سجّل الدخول للمتابعة.",
    setupAccount: "أنشئ حسابًا للبدء.",
    roleCustomer: "إرسال طرد",
    roleDriver: "قد واربح",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    emailNote: "سنرسل تأكيدات الحجز إلى هنا.",
    mobileNumber: "رقم الهاتف",
    vehicleType: "نوع المركبة",
    vehicleCar: "سيارة",
    vehicleSmallVan: "فان صغير",
    vehicleLargeVan: "فان كبير",
    vehicleRecovery: "سطحة سحب",
    vehiclePlateLabel: "لوحة رقم المركبة",
    vehiclePlatePlaceholder: "AB12 CDE",
    verifyPlate: "تحقق",
    checkingPlate: "جارٍ التحقق…",
    plateVerified: "تم التحقق عبر DVLA",
    plateNotFound: "لم يتم العثور على مركبة بهذه اللوحة.",
    plateLookupFailed: "تعذّر الوصول إلى خدمة DVLA. يمكنك المتابعة دون التحقق.",
    plateNoApiKey: "التحقق من اللوحة غير مُفعّل بعد. يمكنك المتابعة دونه.",
    dvlaMake: "الصانع",
    dvlaColour: "اللون",
    dvlaYear: "السنة",
    dvlaFuel: "الوقود",
    dvlaTax: "الضريبة",
    dvlaMot: "الفحص الفني",
    plateEmpty: "يرجى إدخال رقم لوحة المركبة.",
    plateInvalid: "رقم لوحة المركبة غير صالح.",
    plateAuthProblem: "مشكلة في مصادقة DVLA أو مفتاح API.",
    plateRateLimited: "طلبات كثيرة جدًا. يرجى المحاولة مرة أخرى لاحقًا.",
    plateServiceDown: "خدمة DVLA غير متاحة مؤقتًا.",
    dvlaModel: "الطراز",
    dvlaEngine: "المحرك",
    dvlaCo2: "ثاني أكسيد الكربون",
    dvlaEuroStatus: "معيار اليورو",
    dvlaTypeApproval: "اعتماد النوع",
    dvlaWheelplan: "تصميم العجلات",
    dvlaTaxDue: "تاريخ استحقاق الضريبة",
    dvlaExport: "معلّمة للتصدير",
    yesWord: "نعم",
    noWord: "لا",
    documentsTitle: "تحقق من بياناتك",
    documentsHint: "ارفع هذه المستندات ليتمكن فريقنا من التحقق منك قبل أن تبدأ القيادة.",
    vehiclePhoto: "صورة المركبة",
    driverPhoto: "صورة السائق",
    tapToScanFace: "اضغط لمسح وجهك",
    faceScanComplete: "اكتمل مسح الوجه",
    idDocument: "جواز السفر أو رخصة القيادة",
    uploadPhoto: "رفع صورة",
    changePhoto: "تغيير الصورة",
    submitForReview: "إرسال للمراجعة",
    documentsSubmitError: "تعذّر إرسال طلبك. يرجى المحاولة مرة أخرى.",
    pendingReviewTitle: "حسابك قيد المراجعة",
    pendingReviewHint: "يقوم فريقنا بالتحقق من مستنداتك. سنخبرك بمجرد الموافقة — عادةً ما يستغرق هذا أقل من 24 ساعة.",
    simulateApproval: "محاكاة موافقة الإدارة (تجريبي)",
    applicationRejectedTitle: "لم تتم الموافقة على الطلب",
    applicationRejectedHint: "لم تتم الموافقة على طلب انضمامك كسائق. تواصل مع الدعم إذا كنت تعتقد أن هذا خطأ.",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    passwordsMismatch: "كلمتا المرور غير متطابقتين.",
    continueAs: "المتابعة كـ",
    createAccountAs: "إنشاء حساب كـ",
    customerWord: "عميل",
    driverWord: "سائق",
    alreadyHaveAccount: "هل لديك حساب؟ سجّل الدخول",
    newHere: "جديد هنا؟ أنشئ ملفًا شخصيًا",
    demoCreds: "أدخل بياناتك للمتابعة.",
    noAccountFound: "لم نتمكن من العثور على حساب بهذه البيانات. أنشئ ملفًا شخصيًا للبدء.",
    accountOnHold: "تم إيقاف حسابك مؤقتًا. تواصل مع الدعم للمساعدة.",
    accountDisabled: "تم تعطيل حسابك. تواصل مع الدعم للمساعدة.",
    accountOnHoldTitle: "حسابك موقوف مؤقتًا",
    accountOnHoldHint: "قام أحد المسؤولين بإيقاف حسابك مؤقتًا. تواصل مع الدعم إذا كنت تعتقد أن هذا خطأ.",
    accountDisabledTitle: "تم تعطيل حسابك",
    accountDisabledHint: "قام أحد المسؤولين بتعطيل حسابك. تواصل مع الدعم إذا كنت تعتقد أن هذا خطأ.",
    phoneAlreadyRegistered: "يوجد حساب بهذا الرقم مسبقًا. سجّل الدخول بدلاً من ذلك.",
    processing: "يرجى الانتظار…",
    forgotPasswordLink: "نسيت كلمة المرور؟",
    forgotPasswordTitle: "إعادة تعيين كلمة المرور",
    forgotPasswordHint: "أدخل رقم الهاتف المسجل في حسابك وسنساعدك على تعيين كلمة مرور جديدة.",
    findAccountBtn: "البحث عن الحساب",
    resetPasswordTitle: "تعيين كلمة مرور جديدة",
    resetPasswordHint: "اختر كلمة مرور جديدة لحسابك.",
    newPassword: "كلمة المرور الجديدة",
    resetPasswordBtn: "إعادة تعيين كلمة المرور",
    passwordResetDone: "تم تحديث كلمة المرور",
    passwordResetDoneHint: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
    backToLogin: "العودة لتسجيل الدخول",
    confirmEmailTitle: "تأكيد حسابك",
    confirmEmailHint: "أرسلنا رمز تأكيد مكوّنًا من 4 أرقام إلى",
    confirmationCode: "رمز التأكيد",
    demoCodeNote: "رمز تجريبي",
    resendCode: "إعادة إرسال الرمز",
    confirmBtn: "تأكيد",
    invalidCode: "هذا الرمز غير صحيح. حاول مرة أخرى.",

    findAddress: "ابحث عن العنوان",
    searching: "جارٍ البحث…",
    selectYourAddress: "اختر عنوانك",
    changeAddress: "تغيير",
    noAddressesFound: "لم يتم العثور على عناوين لهذا الرمز البريدي. تحقق منه وحاول مرة أخرى.",
    lookupUnavailable: "تعذّر الوصول إلى خدمة البحث عن العناوين. سنعرض تقديرًا بدلاً من ذلك.",
    offlineEstimateNote: "عناوين تقديرية — البحث المباشر لم يكن متاحًا.",
    enterPostcode: "أدخل رمزًا بريديًا بريطانيًا",
    invalidPostcode: "أدخل رمزًا بريديًا صحيحًا، مثل SE1 7PB",
    useMyLocation: "استخدام موقعي الحالي",
    locating: "جارٍ تحديد الموقع…",
    orEnterPostcode: "أو أدخل رمزًا بريديًا",
    locationUnavailable: "تعذّر الوصول إلى موقعك. تحقق من الأذونات وحاول مرة أخرى.",

    navOffers: "العروض",
    navWallet: "المحفظة",
    navProfile: "الملف الشخصي",
    navBook: "الحجز",
    navHistory: "السجل",

    walletBalance: "رصيد المحفظة",
    youOffline: "أنت غير متصل",
    goOnlineHint: "فعّل الاتصال لبدء استلام عروض التوصيل القريبة.",
    offersNearby: "عروض قريبة",
    accept: "قبول",
    viewOrder: "عرض الطلب",
    newOrder: "طلب جديد",
    slideToAccept: "اسحب للقبول",
    accepted: "تم القبول",
    decline: "رفض",
    cash: "نقدًا",
    card: "بطاقة",
    online: "متصل",
    offline: "غير متصل",

    pickingUpFrom: "الاستلام من",
    droppingOffAt: "التسليم في",
    pickupNote: "اسأل عند مكتب الاستقبال عن الطرد.",
    dropoffNote: "اتركه مع الاستقبال إذا لم يكن هناك رد.",
    job: "المهمة",
    completePickup: "إتمام الاستلام والتقاط صورة",
    confirmDropoff: "تأكيد التسليم",

    earnings: "الأرباح",
    walletTitle: "المحفظة",
    availableBalance: "الرصيد المتاح",
    recentActivity: "النشاط الأخير",
    noDeliveriesYet: "لا توجد عمليات توصيل مكتملة بعد.",

    profileTitle: "الملف الشخصي",
    logOut: "تسجيل الخروج",
    dvlaLicence: "رخصة القيادة (DVLA)",
    insurance: "تأمين الأجرة والمكافأة",
    shareCode: "رمز مشاركة DBS",
    verified: "موثّق",
    savedAddresses: "العناوين المحفوظة",
    paymentMethods: "طرق الدفع",
    notifications: "الإشعارات",
    helpAndSupport: "المساعدة والدعم",
    helpHint: "أخبرنا بما هو خاطئ أو ما تود تغييره. سيتواصل معك فريقنا.",
    helpPlaceholder: "اكتب سؤالك أو شكواك هنا…",
    sendMessage: "إرسال الرسالة",
    messageSentTitle: "تم إرسال الرسالة",
    messageSentHint: "شكرًا — سيقوم فريق الدعم بمراجعة رسالتك والتواصل معك إذا لزم الأمر.",
    walletAdjustmentTitle: "طلب تعديل الرصيد",
    walletAdjustmentHint: "يريد أحد المسؤولين تحديث رصيد محفظتك. لن يتغير شيء حتى توافق.",
    phoneLabel: "رقم الهاتف",
    emailLabel: "البريد الإلكتروني",
    vehicleLabel: "نوع المركبة",
    driverActive: "سائق · نشط",
    customerLondon: "عميل · لندن",

    newDelivery: "توصيلة جديدة",
    whereGoing: "إلى أين ستذهب؟",
    pickupPostcode: "الرمز البريدي للاستلام",
    dropoffPostcode: "الرمز البريدي للتسليم",
    parcelSize: "حجم الطرد",
    sizeEnvelope: "ظرف",
    sizeSmall: "صغير",
    sizeMedium: "متوسط",
    sizeLarge: "كبير",
    paymentLabel: "الدفع",
    getQuote: "احصل على عرض سعر",

    yourQuote: "عرض السعر الخاص بك",
    baseFare: "الأجرة الأساسية",
    calloutFee: "رسوم الاستدعاء",
    milesAt: "ميل بسعر",
    total: "الإجمالي",
    confirmOrder: "تأكيد الطلب",
    confirmPay: "تأكيد والدفع",

    findingDriver: "جارٍ البحث عن سائق قريب…",
    findingDriverHint: "نطابقك مع أقرب سائق متاح.",
    noDriversNearby: "لا يوجد سائقون متاحون الآن",
    noDriversNearbyHint: "لم نتمكن من العثور على سائق قريب في الوقت المناسب. يرجى المحاولة مرة أخرى قريبًا.",
    backToBooking: "العودة إلى الحجز",
    stageConfirmed: "تم تأكيد الطلب",
    stageAssigned: "تم تعيين السائق",
    stageHeadingToPickup: "السائق في طريقه إلى نقطة الاستلام",
    stagePickedUp: "تم الاستلام",
    stageOnWay: "في الطريق",
    stageDelivered: "تم التسليم",
    simulateNext: "محاكاة التحديث التالي",
    milesAwaySuffix: "ميلاً",
    liveTracking: "تتبّع مباشر...",
    bookAnother: "احجز توصيلة أخرى",

    yourDeliveries: "توصيلاتك",
    noPastDeliveries: "لا توجد توصيلات سابقة بعد.",
    toWord: "إلى",
  },
  pl: {
    tagline: "Paczki w drodze",
    welcomeBack: "Witaj ponownie.",
    createProfile: "Utwórz swój profil.",
    signInContinue: "Zaloguj się, aby kontynuować.",
    setupAccount: "Załóż konto, aby zacząć.",
    roleCustomer: "Wyślij paczkę",
    roleDriver: "Jeźdź i zarabiaj",
    fullName: "Imię i nazwisko",
    email: "Adres e-mail",
    emailNote: "Wyślemy tutaj potwierdzenia zamówień.",
    mobileNumber: "Numer telefonu",
    vehicleType: "Typ pojazdu",
    vehicleCar: "Samochód",
    vehicleSmallVan: "Mały van",
    vehicleLargeVan: "Duży van",
    vehicleRecovery: "Laweta",
    vehiclePlateLabel: "Numer rejestracyjny pojazdu",
    vehiclePlatePlaceholder: "AB12 CDE",
    verifyPlate: "Zweryfikuj",
    checkingPlate: "Sprawdzanie…",
    plateVerified: "Zweryfikowano w DVLA",
    plateNotFound: "Nie znaleziono pojazdu dla tej tablicy.",
    plateLookupFailed: "Nie udało się połączyć z usługą DVLA. Możesz kontynuować bez weryfikacji.",
    plateNoApiKey: "Weryfikacja tablicy nie jest jeszcze skonfigurowana. Możesz kontynuować bez niej.",
    dvlaMake: "Marka",
    dvlaColour: "Kolor",
    dvlaYear: "Rok",
    dvlaFuel: "Paliwo",
    dvlaTax: "Podatek",
    dvlaMot: "MOT",
    plateEmpty: "Proszę wpisać numer rejestracyjny pojazdu.",
    plateInvalid: "Nieprawidłowy numer rejestracyjny pojazdu.",
    plateAuthProblem: "Problem z uwierzytelnianiem/kluczem API DVLA.",
    plateRateLimited: "Zbyt wiele żądań. Spróbuj ponownie później.",
    plateServiceDown: "Usługa DVLA jest tymczasowo niedostępna.",
    dvlaModel: "Model",
    dvlaEngine: "Silnik",
    dvlaCo2: "CO2",
    dvlaEuroStatus: "Norma Euro",
    dvlaTypeApproval: "Homologacja typu",
    dvlaWheelplan: "Układ kół",
    dvlaTaxDue: "Termin podatku",
    dvlaExport: "Oznaczony do eksportu",
    yesWord: "Tak",
    noWord: "Nie",
    documentsTitle: "Zweryfikuj swoje dane",
    documentsHint: "Prześlij te dokumenty, aby nasz zespół mógł Cię zweryfikować przed rozpoczęciem jazdy.",
    vehiclePhoto: "Zdjęcie pojazdu",
    driverPhoto: "Zdjęcie kierowcy",
    tapToScanFace: "Dotknij, aby zeskanować twarz",
    faceScanComplete: "Skanowanie twarzy zakończone",
    idDocument: "Paszport lub prawo jazdy",
    uploadPhoto: "Prześlij zdjęcie",
    changePhoto: "Zmień zdjęcie",
    submitForReview: "Wyślij do weryfikacji",
    documentsSubmitError: "Nie udało się wysłać wniosku. Spróbuj ponownie.",
    pendingReviewTitle: "Twoje konto jest weryfikowane",
    pendingReviewHint: "Nasz zespół weryfikuje Twoje dokumenty. Powiadomimy Cię po zatwierdzeniu — zwykle zajmuje to mniej niż 24 godziny.",
    simulateApproval: "Symuluj zatwierdzenie przez administratora (demo)",
    applicationRejectedTitle: "Wniosek nie został zatwierdzony",
    applicationRejectedHint: "Twój wniosek kierowcy nie został zatwierdzony. Skontaktuj się z pomocą techniczną, jeśli uważasz, że to pomyłka.",
    password: "Hasło",
    confirmPassword: "Potwierdź hasło",
    passwordsMismatch: "Hasła się nie zgadzają.",
    continueAs: "Kontynuuj jako",
    createAccountAs: "Utwórz konto jako",
    customerWord: "klient",
    driverWord: "kierowca",
    alreadyHaveAccount: "Masz już konto? Zaloguj się",
    newHere: "Nowy tutaj? Utwórz profil",
    demoCreds: "Wprowadź swoje dane, aby kontynuować.",
    noAccountFound: "Nie znaleźliśmy konta z tymi danymi. Utwórz profil, aby zacząć.",
    accountOnHold: "Twoje konto zostało wstrzymane. Skontaktuj się z pomocą techniczną.",
    accountDisabled: "Twoje konto zostało wyłączone. Skontaktuj się z pomocą techniczną.",
    accountOnHoldTitle: "Twoje konto jest wstrzymane",
    accountOnHoldHint: "Administrator wstrzymał Twoje konto. Skontaktuj się z pomocą techniczną, jeśli uważasz, że to pomyłka.",
    accountDisabledTitle: "Twoje konto zostało wyłączone",
    accountDisabledHint: "Administrator wyłączył Twoje konto. Skontaktuj się z pomocą techniczną, jeśli uważasz, że to pomyłka.",
    phoneAlreadyRegistered: "Konto z tym numerem już istnieje. Zaloguj się zamiast tego.",
    processing: "Proszę czekać…",
    forgotPasswordLink: "Zapomniałeś hasła?",
    forgotPasswordTitle: "Zresetuj hasło",
    forgotPasswordHint: "Podaj numer telefonu przypisany do konta, a pomożemy ustawić nowe hasło.",
    findAccountBtn: "Znajdź konto",
    resetPasswordTitle: "Ustaw nowe hasło",
    resetPasswordHint: "Wybierz nowe hasło do swojego konta.",
    newPassword: "Nowe hasło",
    resetPasswordBtn: "Zresetuj hasło",
    passwordResetDone: "Hasło zaktualizowane",
    passwordResetDoneHint: "Możesz teraz zalogować się nowym hasłem.",
    backToLogin: "Powrót do logowania",
    confirmEmailTitle: "Potwierdź swoje konto",
    confirmEmailHint: "Wysłaliśmy 4-cyfrowy kod potwierdzający na",
    confirmationCode: "Kod potwierdzający",
    demoCodeNote: "Kod demonstracyjny",
    resendCode: "Wyślij kod ponownie",
    confirmBtn: "Potwierdź",
    invalidCode: "Ten kod jest nieprawidłowy. Spróbuj ponownie.",

    findAddress: "Znajdź adres",
    searching: "Szukanie…",
    selectYourAddress: "Wybierz swój adres",
    changeAddress: "Zmień",
    noAddressesFound: "Nie znaleziono adresów dla tego kodu pocztowego. Sprawdź go i spróbuj ponownie.",
    lookupUnavailable: "Nie udało się połączyć z usługą wyszukiwania adresów. Pokazujemy przybliżenie.",
    offlineEstimateNote: "Adresy szacunkowe — wyszukiwanie na żywo było niedostępne.",
    enterPostcode: "Wpisz brytyjski kod pocztowy",
    invalidPostcode: "Wpisz prawidłowy kod pocztowy, np. SE1 7PB",
    useMyLocation: "Użyj mojej obecnej lokalizacji",
    locating: "Ustalanie lokalizacji…",
    orEnterPostcode: "lub wpisz kod pocztowy",
    locationUnavailable: "Nie udało się uzyskać dostępu do lokalizacji. Sprawdź uprawnienia i spróbuj ponownie.",

    navOffers: "Oferty",
    navWallet: "Portfel",
    navProfile: "Profil",
    navBook: "Zamów",
    navHistory: "Historia",

    walletBalance: "Saldo portfela",
    youOffline: "Jesteś offline",
    goOnlineHint: "Przełącz się online, aby zacząć otrzymywać oferty dostaw w pobliżu.",
    offersNearby: "ofert w pobliżu",
    accept: "Akceptuj",
    viewOrder: "Zobacz zamówienie",
    newOrder: "Nowe zamówienie",
    slideToAccept: "Przesuń, aby zaakceptować",
    accepted: "Zaakceptowano",
    decline: "Odrzuć",
    cash: "Gotówka",
    card: "Karta",
    online: "Online",
    offline: "Offline",

    pickingUpFrom: "Odbiór z",
    droppingOffAt: "Dostawa do",
    pickupNote: "Zapytaj o paczkę w recepcji.",
    dropoffNote: "Zostaw na recepcji, jeśli nikt nie odpowie.",
    job: "Zlecenie",
    completePickup: "Zakończ odbiór i zrób zdjęcie",
    confirmDropoff: "Potwierdź dostawę",

    earnings: "Zarobki",
    walletTitle: "Portfel",
    availableBalance: "Dostępne saldo",
    recentActivity: "Ostatnia aktywność",
    noDeliveriesYet: "Brak ukończonych dostaw.",

    profileTitle: "Profil",
    logOut: "Wyloguj się",
    dvlaLicence: "Prawo jazdy (DVLA)",
    insurance: "Ubezpieczenie Hire & Reward",
    shareCode: "Kod udostępniania DBS",
    verified: "Zweryfikowano",
    savedAddresses: "Zapisane adresy",
    paymentMethods: "Metody płatności",
    notifications: "Powiadomienia",
    helpAndSupport: "Pomoc i wsparcie",
    helpHint: "Napisz, co jest nie tak lub co chciałbyś zmienić. Nasz zespół się z Tobą skontaktuje.",
    helpPlaceholder: "Wpisz swoje pytanie lub skargę tutaj…",
    sendMessage: "Wyślij wiadomość",
    messageSentTitle: "Wiadomość wysłana",
    messageSentHint: "Dziękujemy — nasz zespół wsparcia przejrzy Twoją wiadomość i skontaktuje się w razie potrzeby.",
    walletAdjustmentTitle: "Prośba o zmianę salda",
    walletAdjustmentHint: "Administrator chce zaktualizować saldo Twojego portfela. Nic się nie zmieni, dopóki nie zaakceptujesz.",
    phoneLabel: "Numer telefonu",
    emailLabel: "Adres e-mail",
    vehicleLabel: "Typ pojazdu",
    driverActive: "Kierowca · Aktywny",
    customerLondon: "Klient · Londyn",

    newDelivery: "Nowa dostawa",
    whereGoing: "Dokąd jedzie?",
    pickupPostcode: "Kod pocztowy odbioru",
    dropoffPostcode: "Kod pocztowy dostawy",
    parcelSize: "Rozmiar paczki",
    sizeEnvelope: "Koperta",
    sizeSmall: "Mała",
    sizeMedium: "Średnia",
    sizeLarge: "Duża",
    paymentLabel: "Płatność",
    getQuote: "Uzyskaj wycenę",

    yourQuote: "Twoja wycena",
    baseFare: "Opłata podstawowa",
    calloutFee: "Opłata za wezwanie",
    milesAt: "mil po",
    total: "Razem",
    confirmOrder: "Potwierdź zamówienie",
    confirmPay: "Potwierdź i zapłać",

    findingDriver: "Szukanie kierowcy w pobliżu…",
    findingDriverHint: "Dopasowujemy Cię do najbliższego dostępnego kierowcy.",
    noDriversNearby: "Brak dostępnych kierowców",
    noDriversNearbyHint: "Nie udało się znaleźć kierowcy w pobliżu na czas. Spróbuj ponownie za chwilę.",
    backToBooking: "Powrót do rezerwacji",
    stageConfirmed: "Zamówienie potwierdzone",
    stageAssigned: "Przypisano kierowcę",
    stageHeadingToPickup: "Kierowca jedzie po odbiór",
    stagePickedUp: "Odebrano",
    stageOnWay: "W drodze",
    stageDelivered: "Dostarczono",
    simulateNext: "Symuluj następną aktualizację",
    milesAwaySuffix: "mil dalej",
    liveTracking: "Śledzenie na żywo…",
    bookAnother: "Zamów kolejną dostawę",

    yourDeliveries: "Twoje dostawy",
    noPastDeliveries: "Brak wcześniejszych dostaw.",
    toWord: "do",
  },
};

/* ============================================================
   APP CONTEXT — theme + language, available to every screen
============================================================ */
const AppContext = createContext(null);

const LANGUAGES = ["en", "ku", "ar", "pl"];
const LANGUAGE_NAMES = { en: "English", ku: "کوردی", ar: "العربية", pl: "Polski" };

function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");

  const value = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    lang,
    setLang,
    C: theme === "dark" ? DARK : LIGHT,
    t: (key) => STRINGS[lang][key] ?? key,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  return useContext(AppContext);
}

/* ============================================================
   PHONE FRAME — carries the persistent theme/language switcher
============================================================ */
function PhoneFrame({ children }) {
  const { C, theme, toggleTheme, lang, setLang } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  return (
    <div className="relative" style={{ width: 412, height: 890 }}>
      {/* side buttons — decorative, read as a real device */}
      <div className="absolute -left-[3px] top-[118px] h-8 w-[3px] rounded-l-sm" style={{ backgroundColor: "#050708" }} />
      <div className="absolute -left-[3px] top-[168px] h-14 w-[3px] rounded-l-sm" style={{ backgroundColor: "#050708" }} />
      <div className="absolute -left-[3px] top-[228px] h-14 w-[3px] rounded-l-sm" style={{ backgroundColor: "#050708" }} />
      <div className="absolute -right-[3px] top-[190px] h-20 w-[3px] rounded-r-sm" style={{ backgroundColor: "#050708" }} />

      <div
        className="relative flex h-full w-full flex-col overflow-hidden shadow-2xl"
        style={{ backgroundColor: C.ink, borderRadius: 54, border: "13px solid #030405" }}
      >
        {/* notch / dynamic island */}
        <div
          className="absolute left-1/2 top-3 z-40 h-7 w-32 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "#000000" }}
        />

        <div className="absolute right-4 top-4 z-40 flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center"
              style={{ backgroundColor: C.chromeBg, color: C.text, borderRadius: 999, backdropFilter: "blur(6px)" }}
            >
              <Globe size={16} />
            </button>
            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                <div
                  className="absolute right-0 top-11 z-50 overflow-hidden py-1.5"
                  style={{ backgroundColor: C.surface, borderRadius: RADIUS.card, border: `1px solid ${C.hairline}`, minWidth: 140 }}
                >
                  {LANGUAGES.map((code) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangMenuOpen(false); }}
                      className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-[13px]"
                      style={{ color: code === lang ? C.accent : C.text, fontWeight: code === lang ? 700 : 500 }}
                    >
                      {LANGUAGE_NAMES[code]}
                      {code === lang && <CheckCircle2 size={13} color={C.accent} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center"
            style={{ backgroundColor: C.chromeBg, color: C.text, borderRadius: 999, backdropFilter: "blur(6px)" }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {children}

        {/* home indicator */}
        <div
          className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-1.5 w-32 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.3)" }}
        />
      </div>
    </div>
  );
}

const VEHICLE_HERO_URL = "https://images.unsplash.com/photo-1727101981835-50bade3c4eaf?fm=jpg&q=60&w=1200&auto=format&fit=crop";

function ScreenHero() {
  const { C } = useApp();
  return (
    <div className="relative h-28 shrink-0">
      <img src={VEHICLE_HERO_URL} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1), ${C.ink})` }} />
    </div>
  );
}

function ScreenHeader({ eyebrow, title, right, onBack }) {
  const { C } = useApp();
  return (
    <>
      <ScreenHero />
      <div className="flex items-start justify-between px-5 pb-4 pt-3">
      <div className="flex items-start gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
            style={{ backgroundColor: C.surface, borderRadius: 10 }}
          >
            <ArrowLeft size={16} color={C.text} />
          </button>
        )}
        <div>
          {eyebrow && (
            <p className="mb-0.5 text-[13px] font-medium" style={{ color: C.textDim }}>
              {eyebrow}
            </p>
          )}
          <p className="text-[22px] font-bold leading-tight" style={{ color: C.text }}>{title}</p>
        </div>
      </div>
      {right}
      </div>
    </>
  );
}

/* ============================================================
   ACCOUNT STORAGE — persists across sessions (survives reloads),
   so a profile created once can be recognised on a later login.
============================================================ */
function sanitizeKeyPart(value) {
  // Storage keys can't contain whitespace/slashes/quotes — phone numbers
  // are often typed with spaces, so normalise before using them in a key.
  return String(value).replace(/[\s/\\'"]+/g, "");
}

async function getStoredAccount(phone) {
  try {
    const result = await window.storage.get(`account:${sanitizeKeyPart(phone)}`, false);
    return result ? JSON.parse(result.value) : null;
  } catch {
    return null; // no account saved under this number yet
  }
}

async function saveAccount(profile) {
  try {
    await window.storage.set(`account:${sanitizeKeyPart(profile.phone)}`, JSON.stringify(profile), false);
    return true;
  } catch (err) {
    console.error("saveAccount failed:", err);
    return false;
  }
}

/* ============================================================
   LIVE ORDER MATCHING — uses shared persistent storage so a
   real driver session (a different device/tab using this same
   app) can see and accept orders from a real customer session.
   Matching by proximity uses the driver's live GPS position
   against the pickup coordinates, within a 1.5 mile radius.
============================================================ */
const MATCH_RADIUS_MILES = 1.5;

// Real map imagery (OpenStreetMap tiles via a free static-map renderer,
// no API key required) instead of drawn placeholder art.
function staticMapUrl({ pickup, dropoff, driver, single, width = 700, height = 320, zoom = 13 }) {
  const points = [pickup, dropoff, driver].filter(Boolean);
  if (points.length === 0) return null;
  const centerLat = points.reduce((a, p) => a + p.lat, 0) / points.length;
  const centerLon = points.reduce((a, p) => a + p.lon, 0) / points.length;
  const markers = [];
  if (pickup) markers.push(`markers=${pickup.lat},${pickup.lon},lightblue1`);
  if (dropoff && !single) markers.push(`markers=${dropoff.lat},${dropoff.lon},orange1`);
  if (driver) markers.push(`markers=${driver.lat},${driver.lon},red-pushpin`);
  const params = [
    `center=${centerLat},${centerLon}`,
    `zoom=${zoom}`,
    `size=${width}x${height}`,
    "maptype=mapnik",
    ...markers,
  ];
  return `https://staticmap.openstreetmap.de/staticmap.php?${params.join("&")}`;
}

function milesBetween(a, b) {
  if (!a || !b) return Infinity;
  const R = 3958.8; // Earth radius in miles
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

async function broadcastOrder(order) {
  try {
    await window.storage.set(`order:${order.id}`, JSON.stringify({ ...order, status: "searching" }), true);
    return true;
  } catch {
    return false;
  }
}

async function fetchOpenOrders() {
  try {
    const list = await window.storage.list("order:", true);
    const keys = list?.keys ?? [];
    const orders = await Promise.all(
      keys.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          return res ? JSON.parse(res.value) : null;
        } catch {
          return null;
        }
      })
    );
    return orders.filter((o) => o && o.status === "searching");
  } catch {
    return [];
  }
}

async function getOrderStatus(orderId) {
  try {
    const res = await window.storage.get(`order:${orderId}`, true);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}

async function acceptOrder(orderId, driver) {
  try {
    const current = await getOrderStatus(orderId);
    if (!current || current.status !== "searching") return false; // someone else already took it
    await window.storage.set(`order:${orderId}`, JSON.stringify({ ...current, status: "accepted", driver, deliveryStage: "assigned" }), true);
    return true;
  } catch {
    return false;
  }
}

async function updateOrderFields(orderId, fields) {
  try {
    const current = await getOrderStatus(orderId);
    if (!current) return false;
    await window.storage.set(`order:${orderId}`, JSON.stringify({ ...current, ...fields }), true);
    return true;
  } catch {
    return false;
  }
}

/* ============================================================
   ADMIN PANEL — driver applications, order visibility, and a
   roles/permissions matrix, all stored in SHARED storage so the
   admin session (a different login) can see and act on them.
   Login credentials themselves stay in personal storage; only
   non-sensitive application details are shared here.
============================================================ */
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "hama92";

async function registerCustomerAccount(profile) {
  try {
    await window.storage.set(
      `customerAccount:${sanitizeKeyPart(profile.phone)}`,
      JSON.stringify({ name: profile.name, phone: profile.phone, email: profile.email, status: "active", joinedAt: Date.now() }),
      true
    );
    return true;
  } catch (err) {
    console.error("registerCustomerAccount failed:", err);
    return false;
  }
}

async function getCustomerAccount(phone) {
  try {
    const res = await window.storage.get(`customerAccount:${sanitizeKeyPart(phone)}`, true);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}

async function updateCustomerAccount(phone, fields) {
  try {
    const current = await getCustomerAccount(phone);
    if (!current) return false;
    await window.storage.set(`customerAccount:${sanitizeKeyPart(phone)}`, JSON.stringify({ ...current, ...fields }), true);
    return true;
  } catch {
    return false;
  }
}

async function fetchCustomerAccounts() {
  try {
    const list = await window.storage.list("customerAccount:", true);
    const keys = list?.keys ?? [];
    const accounts = await Promise.all(
      keys.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          return res ? JSON.parse(res.value) : null;
        } catch {
          return null;
        }
      })
    );
    return accounts.filter(Boolean);
  } catch {
    return [];
  }
}

async function submitSupportMessage(msg) {
  const id = `SUP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  try {
    await window.storage.set(`supportMessage:${id}`, JSON.stringify({ ...msg, id, status: "open", createdAt: Date.now() }), true);
    return true;
  } catch (err) {
    console.error("submitSupportMessage failed:", err);
    return false;
  }
}

async function fetchSupportMessages() {
  try {
    const list = await window.storage.list("supportMessage:", true);
    const keys = list?.keys ?? [];
    const messages = await Promise.all(
      keys.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          return res ? JSON.parse(res.value) : null;
        } catch {
          return null;
        }
      })
    );
    return messages.filter(Boolean);
  } catch {
    return [];
  }
}

async function updateSupportMessage(id, fields) {
  try {
    const res = await window.storage.get(`supportMessage:${id}`, true);
    if (!res) return false;
    const current = JSON.parse(res.value);
    await window.storage.set(`supportMessage:${id}`, JSON.stringify({ ...current, ...fields }), true);
    return true;
  } catch {
    return false;
  }
}

async function saveDriverPhotos(phone, photos) {
  try {
    await window.storage.set(`driverPhotos:${sanitizeKeyPart(phone)}`, JSON.stringify(photos), true);
    return true;
  } catch (err) {
    console.error("saveDriverPhotos failed:", err);
    return false;
  }
}

async function getDriverPhotos(phone) {
  try {
    const res = await window.storage.get(`driverPhotos:${sanitizeKeyPart(phone)}`, true);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}

async function submitDriverApplication(app) {
  try {
    await window.storage.set(`driverApp:${sanitizeKeyPart(app.phone)}`, JSON.stringify({ ...app, status: "pending", submittedAt: Date.now() }), true);
    return true;
  } catch (err) {
    console.error("submitDriverApplication failed:", err);
    return false;
  }
}

async function getDriverApplication(phone) {
  try {
    const res = await window.storage.get(`driverApp:${sanitizeKeyPart(phone)}`, true);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}

async function updateDriverApplication(phone, fields) {
  try {
    const current = await getDriverApplication(phone);
    if (!current) return false;
    await window.storage.set(`driverApp:${sanitizeKeyPart(phone)}`, JSON.stringify({ ...current, ...fields }), true);
    return true;
  } catch {
    return false;
  }
}

/* ============================================================
   WALLET ADJUSTMENTS — admin can propose adding/deducting money
   from a driver's balance, but it only takes effect once the
   driver accepts an automatic in-app notice.
============================================================ */
async function submitWalletAdjustment({ driverPhone, driverName, amount, reason }) {
  const id = `ADJ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  try {
    await window.storage.set(
      `walletAdjustment:${id}`,
      JSON.stringify({ id, driverPhone, driverName, amount, reason, status: "pending", createdAt: Date.now() }),
      true
    );
    return true;
  } catch (err) {
    console.error("submitWalletAdjustment failed:", err);
    return false;
  }
}

async function fetchWalletAdjustments() {
  try {
    const list = await window.storage.list("walletAdjustment:", true);
    const keys = list?.keys ?? [];
    const items = await Promise.all(
      keys.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          return res ? JSON.parse(res.value) : null;
        } catch {
          return null;
        }
      })
    );
    return items.filter(Boolean);
  } catch {
    return [];
  }
}

async function updateWalletAdjustment(id, fields) {
  try {
    const res = await window.storage.get(`walletAdjustment:${id}`, true);
    if (!res) return false;
    const current = JSON.parse(res.value);
    await window.storage.set(`walletAdjustment:${id}`, JSON.stringify({ ...current, ...fields }), true);
    return true;
  } catch {
    return false;
  }
}

async function fetchDriverApplications() {
  try {
    const list = await window.storage.list("driverApp:", true);
    const keys = list?.keys ?? [];
    const apps = await Promise.all(
      keys.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          return res ? JSON.parse(res.value) : null;
        } catch {
          return null;
        }
      })
    );
    return apps.filter(Boolean);
  } catch {
    return [];
  }
}

async function fetchAllOrders() {
  try {
    const list = await window.storage.list("order:", true);
    const keys = list?.keys ?? [];
    const orders = await Promise.all(
      keys.map(async (key) => {
        try {
          const res = await window.storage.get(key, true);
          return res ? JSON.parse(res.value) : null;
        } catch {
          return null;
        }
      })
    );
    return orders.filter(Boolean);
  } catch {
    return [];
  }
}

const PERMISSIONS = [
  { key: "manage_drivers", label: "Manage Drivers" },
  { key: "manage_orders", label: "Manage Orders" },
  { key: "manage_payments", label: "Manage Payments" },
  { key: "view_reports", label: "View Reports" },
  { key: "manage_roles", label: "Manage Roles & Permissions" },
];

const DEFAULT_ROLES_CONFIG = {
  Admin: { manage_drivers: true, manage_orders: true, manage_payments: true, view_reports: true, manage_roles: true },
  "Support Staff": { manage_drivers: true, manage_orders: true, manage_payments: false, view_reports: true, manage_roles: false },
  Finance: { manage_drivers: false, manage_orders: false, manage_payments: true, view_reports: true, manage_roles: false },
};

async function getRolesConfig() {
  try {
    const res = await window.storage.get("roles-config", true);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}

async function saveRolesConfig(config) {
  try {
    await window.storage.set("roles-config", JSON.stringify(config), true);
    return true;
  } catch {
    return false;
  }
}

const VEHICLE_TYPES = [
  { key: "car", icon: Car },
  { key: "small_van", icon: Truck },
  { key: "large_van", icon: Container },
  { key: "recovery", icon: Truck },
];

function vehicleTypeLabel(t, key) {
  const camel = key.split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  return t(`vehicle${camel}`);
}

/* ============================================================
   AUTH — login and sign-up, role chosen here
============================================================ */
function RoleTab({ active, label, onClick }) {
  const { C } = useApp();
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-[11px] py-2.5 text-[13px] font-semibold transition-colors"
      style={{ backgroundColor: active ? C.accent : "transparent", color: active ? C.onAccent : C.textDim }}
    >
      {label}
    </button>
  );
}

function ForgotPasswordScreen({ onBack, onResetDone }) {
  const { C, t } = useApp();
  const [step, setStep] = useState("phone"); // "phone" | "reset" | "done"
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const canFind = phone.trim().length >= 6;
  const canReset = newPassword.trim().length >= 4 && newPassword === confirmNewPassword;

  const handleFindAccount = async () => {
    if (!canFind || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const found = await getStoredAccount(phone.trim());
      if (!found) {
        setError(t("noAccountFound"));
        return;
      }
      setAccount(found);
      setStep("reset");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (!canReset || submitting) return;
    setSubmitting(true);
    try {
      await saveAccount({ ...account, password: newPassword });
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <ScreenHero />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-3">
      <div>
        {step !== "done" && (
          <button onClick={onBack} className="mb-6 flex h-8 w-8 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 10 }}>
            <ArrowLeft size={16} color={C.text} />
          </button>
        )}

        {step === "phone" && (
          <>
            <p className="text-[22px] font-bold leading-snug" style={{ color: C.text }}>{t("forgotPasswordTitle")}</p>
            <p className="mt-1 text-[14px] leading-relaxed" style={{ color: C.textDim }}>{t("forgotPasswordHint")}</p>
            <div className="mt-6 flex items-center gap-2.5 px-3.5 py-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control, border: `1px solid ${C.hairline}` }}>
              <Phone size={17} color={C.textFaint} />
              <input value={phone} onChange={(e) => { setPhone(e.target.value); setError(null); }} placeholder={t("mobileNumber")} className="flex-1 bg-transparent text-[15px] outline-none" style={{ color: C.text }} />
            </div>
            {error && <p className="mt-2 text-[12px]" style={{ color: C.danger }}>{error}</p>}
          </>
        )}

        {step === "reset" && (
          <>
            <p className="text-[22px] font-bold leading-snug" style={{ color: C.text }}>{t("resetPasswordTitle")}</p>
            <p className="mt-1 text-[14px] leading-relaxed" style={{ color: C.textDim }}>{t("resetPasswordHint")}</p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2.5 px-3.5 py-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control, border: `1px solid ${C.hairline}` }}>
                <Lock size={17} color={C.textFaint} />
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder={t("newPassword")} className="flex-1 bg-transparent text-[15px] outline-none" style={{ color: C.text }} />
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control, border: `1px solid ${C.hairline}` }}>
                <Lock size={17} color={C.textFaint} />
                <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" placeholder={t("confirmPassword")} className="flex-1 bg-transparent text-[15px] outline-none" style={{ color: C.text }} />
              </div>
              {confirmNewPassword.length > 0 && confirmNewPassword !== newPassword && (
                <p className="text-[12px]" style={{ color: C.danger }}>{t("passwordsMismatch")}</p>
              )}
            </div>
          </>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 16 }}>
              <CheckCircle2 size={26} color={C.signal} />
            </div>
            <p className="text-[18px] font-bold" style={{ color: C.text }}>{t("passwordResetDone")}</p>
            <p className="mt-1.5 text-[13px]" style={{ color: C.textDim }}>{t("passwordResetDoneHint")}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        {step === "phone" && (
          <button
            disabled={!canFind || submitting}
            onClick={handleFindAccount}
            className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
            style={{ backgroundColor: canFind && !submitting ? C.accent : C.surface, color: canFind && !submitting ? C.onAccent : C.textFaint, borderRadius: RADIUS.control }}
          >
            {submitting ? t("processing") : t("findAccountBtn")}
          </button>
        )}
        {step === "reset" && (
          <button
            disabled={!canReset || submitting}
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
            style={{ backgroundColor: canReset && !submitting ? C.accent : C.surface, color: canReset && !submitting ? C.onAccent : C.textFaint, borderRadius: RADIUS.control }}
          >
            {submitting ? t("processing") : t("resetPasswordBtn")}
          </button>
        )}
        {step === "done" && (
          <button onClick={() => onResetDone(phone.trim())} className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold" style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: RADIUS.control }}>
            {t("backToLogin")}
          </button>
        )}
      </div>
    </div>
    </div>
  );
}

function compressImage(file, maxDim = 1000, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function UploadRow({ label, value, onChange }) {
  const { C, t } = useApp();
  return (
    <label
      className="mb-3 flex cursor-pointer items-center gap-3 px-4 py-3.5"
      style={{ backgroundColor: C.surface, borderRadius: RADIUS.control, border: `1px solid ${value ? C.signal : C.hairline}` }}
    >
      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onChange} />
      {value ? (
        <img src={value} alt="" className="h-10 w-10 object-cover" style={{ borderRadius: 10 }} />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center" style={{ backgroundColor: C.raised, borderRadius: 10 }}>
          <Camera size={18} color={C.textFaint} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold" style={{ color: C.text }}>{label}</p>
        <p className="text-[12px]" style={{ color: value ? C.signal : C.textFaint }}>{value ? t("changePhoto") : t("uploadPhoto")}</p>
      </div>
      {value && <CheckCircle2 size={16} color={C.signal} />}
    </label>
  );
}

function FaceIdScanRow({ value, onChange }) {
  const { C, t } = useApp();
  return (
    <label className="mb-3 flex cursor-pointer flex-col items-center gap-3 py-5" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control, border: `1px solid ${value ? C.signal : C.hairline}` }}>
      <input type="file" accept="image/*" capture="user" className="hidden" onChange={onChange} />
      <div className="relative flex h-28 w-28 items-center justify-center">
        {!value && (
          <div
            className="absolute inset-0 animate-spin rounded-full"
            style={{ borderTop: `3px solid ${C.accent}`, borderRight: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "3px solid transparent", animationDuration: "1.6s" }}
          />
        )}
        {!value && (
          <div className="absolute inset-0 animate-pulse rounded-full" style={{ border: `1px solid ${C.hairline}` }} />
        )}
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: C.raised }}>
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ScanFace size={44} color={C.textFaint} strokeWidth={1.5} />
          )}
        </div>
        {value && (
          <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: C.signal, border: `3px solid ${C.surface}` }}>
            <CheckCircle2 size={15} color={C.onSignal} />
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-[14px] font-semibold" style={{ color: C.text }}>{t("driverPhoto")}</p>
        <p className="text-[12px]" style={{ color: value ? C.signal : C.textFaint }}>{value ? t("faceScanComplete") : t("tapToScanFace")}</p>
      </div>
    </label>
  );
}

function DriverDocumentsScreen({ onSubmit, submitting, error }) {
  const { C, t } = useApp();
  const [vehiclePhoto, setVehiclePhoto] = useState(null);
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [idDocument, setIdDocument] = useState(null);

  const canSubmit = vehiclePhoto && driverPhoto && idDocument && !submitting;

  const handleFile = (setter) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setter(compressed);
    } catch {
      // fall back to the raw file if compression fails for any reason
      const reader = new FileReader();
      reader.onload = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <ScreenHero />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-3">
      <div>
        <p className="text-[22px] font-bold leading-snug" style={{ color: C.text }}>{t("documentsTitle")}</p>
        <p className="mt-1 text-[14px] leading-relaxed" style={{ color: C.textDim }}>{t("documentsHint")}</p>

        <div className="mt-6">
          <UploadRow label={t("vehiclePhoto")} value={vehiclePhoto} onChange={handleFile(setVehiclePhoto)} />
          <FaceIdScanRow value={driverPhoto} onChange={handleFile(setDriverPhoto)} />
          <UploadRow label={t("idDocument")} value={idDocument} onChange={handleFile(setIdDocument)} />
        </div>
        {error && <p className="mt-2 text-[12px]" style={{ color: C.danger }}>{error}</p>}
      </div>

      <div className="mt-8">
        <button
          disabled={!canSubmit}
          onClick={() => onSubmit({ vehiclePhoto, driverPhoto, idDocument })}
          className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
          style={{ backgroundColor: canSubmit ? C.accent : C.surface, color: canSubmit ? C.onAccent : C.textFaint, borderRadius: RADIUS.control }}
        >
          {submitting ? t("processing") : t("submitForReview")}
        </button>
      </div>
    </div>
    </div>
  );
}

function DriverWalletAdjustmentScreen({ adjustment, onAccept, onDecline }) {
  const { C, t } = useApp();
  const isCredit = adjustment.amount >= 0;
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 20 }}>
        <Wallet size={28} color={isCredit ? C.signal : C.danger} />
      </div>
      <p className="text-[17px] font-bold" style={{ color: C.text }}>{t("walletAdjustmentTitle")}</p>
      <p className="mt-3 text-[28px] font-bold" style={{ color: isCredit ? C.signal : C.danger }}>
        {isCredit ? "+" : "−"}{money(Math.abs(adjustment.amount))}
      </p>
      {adjustment.reason && (
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{adjustment.reason}</p>
      )}
      <p className="mt-4 text-[12px]" style={{ color: C.textFaint }}>{t("walletAdjustmentHint")}</p>

      <div className="mt-8 flex w-full gap-3">
        <button onClick={() => onDecline(adjustment)} className="flex-1 rounded-lg py-3 text-[14px] font-bold" style={{ backgroundColor: "rgba(255,107,107,0.12)", color: C.danger }}>
          {t("decline")}
        </button>
        <button onClick={() => onAccept(adjustment)} className="flex-1 rounded-lg py-3 text-[14px] font-bold" style={{ backgroundColor: C.accent, color: C.onAccent }}>
          {t("accept")}
        </button>
      </div>
    </div>
  );
}

function DriverPendingScreen({ onLogout }) {
  const { C, t } = useApp();
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 20 }}>
        <Clock size={28} color={C.caution} />
      </div>
      <p className="text-[17px] font-bold" style={{ color: C.text }}>{t("pendingReviewTitle")}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{t("pendingReviewHint")}</p>

      <button onClick={onLogout} className="mt-8 text-[13px] font-semibold" style={{ color: C.danger }}>
        {t("logOut")}
      </button>
    </div>
  );
}

function AuthScreen({ onAuth }) {
  const { C, t } = useApp();
  const [role, setRole] = useState("customer");
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [plateChecking, setPlateChecking] = useState(false);
  const [plateResult, setPlateResult] = useState(null);
  const [plateError, setPlateError] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [verifyStep, setVerifyStep] = useState(false);
  const [documentsStep, setDocumentsStep] = useState(false);
  const [documentsError, setDocumentsError] = useState(null);
  const [pendingProfile, setPendingProfile] = useState(null);
  const [sentCode, setSentCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(null);

  const isSignup = mode === "signup";
  const canContinue = isSignup
    ? name.trim().length >= 2 &&
      email.trim().includes("@") &&
      phone.trim().length >= 6 &&
      password.trim().length >= 4 &&
      confirmPassword === password
    : phone.trim().length >= 6 && password.trim().length >= 4;
  const passwordsMismatch = isSignup && confirmPassword.length > 0 && confirmPassword !== password;

  const roleWord = role === "driver" ? t("driverWord") : t("customerWord");

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError(null);
  };

  const generateCode = () => String(Math.floor(1000 + Math.random() * 9000));

  const handleVerifyPlate = async () => {
    if (plateChecking) return; // prevent duplicate requests from repeated taps
    if (!vehiclePlate.trim()) {
      setPlateError(t("plateEmpty"));
      return;
    }
    setPlateChecking(true);
    setPlateError(null);
    setPlateResult(null);
    try {
      const data = await lookupVehicleByPlate(vehiclePlate);
      setPlateResult(data);
    } catch (err) {
      switch (err?.code) {
        case "empty_plate":
          setPlateError(t("plateEmpty"));
          break;
        case "no_backend":
          setPlateError(t("plateNoApiKey"));
          break;
        case "invalid_plate":
          setPlateError(t("plateInvalid"));
          break;
        case "auth_problem":
          setPlateError(t("plateAuthProblem"));
          break;
        case "not_found":
          setPlateError(t("plateNotFound"));
          break;
        case "rate_limited":
          setPlateError(t("plateRateLimited"));
          break;
        case "service_unavailable":
        case "network_error":
          setPlateError(t("plateServiceDown"));
          break;
        default:
          setPlateError(t("plateLookupFailed"));
      }
    } finally {
      setPlateChecking(false);
    }
  };

  // Automatically look the plate up with DVLA as soon as it matches a
  // valid UK registration format — no button press needed.
  useEffect(() => {
    const cleaned = vehiclePlate.trim().toUpperCase().replace(/\s+/g, "");
    if (!UK_PLATE_RE.test(cleaned)) return;
    const timer = setTimeout(() => {
      handleVerifyPlate();
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiclePlate]);

  const handleSubmit = async () => {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const cleanPhone = phone.trim();
      if (isSignup) {
        const existing = await getStoredAccount(cleanPhone);
        if (existing) {
          setError(t("phoneAlreadyRegistered"));
          return;
        }
        const profile = {
          role,
          name: name.trim(),
          email: email.trim(),
          phone: cleanPhone,
          password,
          ...(role === "driver"
            ? {
                vehicleType,
                vehiclePlate: vehiclePlate.trim(),
                status: "pending",
                ...(plateResult
                  ? {
                      dvlaMake: plateResult.make,
                      dvlaColour: plateResult.colour,
                      dvlaYear: plateResult.yearOfManufacture,
                      dvlaTaxStatus: plateResult.taxStatus,
                      dvlaMotStatus: plateResult.motStatus,
                    }
                  : {}),
              }
            : {}),
        };
        setPendingProfile(profile);
        setSentCode(generateCode());
        setCodeInput("");
        setCodeError(null);
        setVerifyStep(true);
      } else {
        if (cleanPhone.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          onAuth("admin", { role: "admin", name: "Admin", email: ADMIN_EMAIL, phone: ADMIN_EMAIL });
          return;
        }
        const account = await getStoredAccount(cleanPhone);
        if (!account || account.password !== password || account.role !== role) {
          setError(t("noAccountFound"));
          return;
        }
        if (account.role === "customer") {
          const registry = await getCustomerAccount(cleanPhone);
          if (registry?.status === "hold") {
            setError(t("accountOnHold"));
            return;
          }
          if (registry?.status === "disabled") {
            setError(t("accountDisabled"));
            return;
          }
        }
        onAuth(role, account);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmCode = async () => {
    if (submitting) return;
    setCodeError(null);
    if (codeInput.trim() !== sentCode) {
      setCodeError(t("invalidCode"));
      return;
    }
    setSubmitting(true);
    try {
      if (pendingProfile.role === "driver") {
        setVerifyStep(false);
        setDocumentsStep(true);
      } else {
        await saveAccount(pendingProfile);
        if (pendingProfile.role === "customer") registerCustomerAccount(pendingProfile);
        onAuth(pendingProfile.role, pendingProfile);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitDocuments = async (photos) => {
    if (submitting) return;
    setSubmitting(true);
    setDocumentsError(null);
    try {
      const finalProfile = { ...pendingProfile, hasVehiclePhoto: true, hasDriverPhoto: true, hasIdDocument: true };
      // Send every field the driver filled in — except the password — to the
      // admin panel so the reviewer has the complete application on file.
      const { password: _omit, ...appData } = finalProfile;

      let submittedOk = await submitDriverApplication(appData);
      if (!submittedOk) submittedOk = await submitDriverApplication(appData); // one retry

      // Photos are stored separately (their own key) so the frequently-polled
      // application record stays small; the admin fetches them on demand.
      saveDriverPhotos(finalProfile.phone, photos);

      // Personal account persistence (for later login) is best-effort — it
      // shouldn't block getting the application in front of the admin.
      saveAccount(finalProfile);

      if (!submittedOk) {
        setDocumentsError(t("documentsSubmitError"));
        return;
      }
      onAuth(finalProfile.role, finalProfile);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = () => {
    setSentCode(generateCode());
    setCodeInput("");
    setCodeError(null);
  };

  if (showForgot) {
    return (
      <ForgotPasswordScreen
        onBack={() => setShowForgot(false)}
        onResetDone={(resetPhone) => {
          setShowForgot(false);
          setMode("login");
          setPhone(resetPhone);
          setPassword("");
        }}
      />
    );
  }

  if (verifyStep) {
    return (
      <div className="flex flex-1 flex-col overflow-y-auto">
      <ScreenHero />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-3">
        <div>
          <button
            onClick={() => setVerifyStep(false)}
            className="mb-6 flex h-8 w-8 items-center justify-center"
            style={{ backgroundColor: C.surface, borderRadius: 10 }}
          >
            <ArrowLeft size={16} color={C.text} />
          </button>
          <p className="text-[22px] font-bold leading-snug" style={{ color: C.text }}>{t("confirmEmailTitle")}</p>
          <p className="mt-1 text-[14px] leading-relaxed" style={{ color: C.textDim }}>
            {t("confirmEmailHint")} <span style={{ color: C.text, fontWeight: 700 }}>{pendingProfile?.email}</span>
          </p>

          <div className="mt-6 flex items-center gap-3 px-3.5 py-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control, border: `1px solid ${codeError ? C.danger : C.hairline}` }}>
            <Lock size={17} color={C.textFaint} />
            <input
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 4)); setCodeError(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleConfirmCode(); }}
              placeholder={t("confirmationCode")}
              inputMode="numeric"
              className="flex-1 bg-transparent text-[18px] tracking-[0.3em] outline-none"
              style={{ color: C.text }}
            />
          </div>
          {codeError && <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>{codeError}</p>}

          <div className="mt-3 flex items-center gap-2 rounded-lg p-3" style={{ backgroundColor: "rgba(0,168,232,0.1)" }}>
            <ShieldCheck size={15} color={C.signal} />
            <p className="text-[12px]" style={{ color: C.signal }}>{t("demoCodeNote")}: {sentCode}</p>
          </div>

          <button onClick={handleResendCode} className="mt-4 text-[13px] font-semibold" style={{ color: C.accent }}>
            {t("resendCode")}
          </button>
        </div>

        <div className="mt-8">
          <button
            disabled={codeInput.trim().length !== 4 || submitting}
            onClick={handleConfirmCode}
            className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
            style={{
              backgroundColor: codeInput.trim().length === 4 && !submitting ? C.accent : C.surface,
              color: codeInput.trim().length === 4 && !submitting ? C.onAccent : C.textFaint,
              borderRadius: RADIUS.control,
            }}
          >
            {submitting ? t("processing") : t("confirmBtn")}
          </button>
        </div>
      </div>
      </div>
    );
  }

  if (documentsStep) {
    return <DriverDocumentsScreen onSubmit={handleSubmitDocuments} submitting={submitting} error={documentsError} />;
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-16">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center text-sm font-bold" style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: 10 }}>
            UK
          </div>
          <div>
            <p className="text-[15px] font-bold" style={{ color: C.text }}>Parcel Flex</p>
            <p className="text-[12px]" style={{ color: C.textDim }}>{t("tagline")}</p>
          </div>
        </div>

        <p className="mt-10 text-[26px] font-bold leading-snug" style={{ color: C.text }}>
          {isSignup ? t("createProfile") : t("welcomeBack")}
        </p>
        <p className="mt-1 text-[14px]" style={{ color: C.textDim }}>
          {isSignup ? t("setupAccount") : t("signInContinue")}
        </p>

        <div className="mt-8 flex gap-1 p-1" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control + 2 }}>
          <RoleTab active={role === "customer"} label={t("roleCustomer")} onClick={() => { setRole("customer"); setError(null); }} />
          <RoleTab active={role === "driver"} label={t("roleDriver")} onClick={() => { setRole("driver"); setError(null); }} />
        </div>

        <div className="mt-5 space-y-2">
          {isSignup && (
            <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: C.surface, borderRadius: RADIUS.chip, border: `1px solid ${C.hairline}` }}>
              <User size={15} color={C.textFaint} />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("fullName")} className="flex-1 bg-transparent text-[13px] outline-none" style={{ color: C.text }} />
            </div>
          )}
          {isSignup && (
            <div>
              <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: C.surface, borderRadius: RADIUS.chip, border: `1px solid ${C.hairline}` }}>
                <Mail size={15} color={C.textFaint} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t("email")} className="flex-1 bg-transparent text-[13px] outline-none" style={{ color: C.text }} />
              </div>
              <p className="mt-1 text-[11px]" style={{ color: C.textFaint }}>{t("emailNote")}</p>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: C.surface, borderRadius: RADIUS.chip, border: `1px solid ${C.hairline}` }}>
            <Phone size={15} color={C.textFaint} />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("mobileNumber")} className="flex-1 bg-transparent text-[13px] outline-none" style={{ color: C.text }} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: C.surface, borderRadius: RADIUS.chip, border: `1px solid ${C.hairline}` }}>
            <Lock size={15} color={C.textFaint} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={t("password")} className="flex-1 bg-transparent text-[13px] outline-none" style={{ color: C.text }} />
          </div>
          {!isSignup && (
            <button onClick={() => setShowForgot(true)} className="text-[12px] font-semibold" style={{ color: C.accent }}>
              {t("forgotPasswordLink")}
            </button>
          )}
          {isSignup && (
            <div>
              <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: C.surface, borderRadius: RADIUS.chip, border: `1px solid ${passwordsMismatch ? C.danger : C.hairline}` }}>
                <Lock size={15} color={C.textFaint} />
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder={t("confirmPassword")} className="flex-1 bg-transparent text-[13px] outline-none" style={{ color: C.text }} />
              </div>
              {passwordsMismatch && <p className="mt-1 text-[11px]" style={{ color: C.danger }}>{t("passwordsMismatch")}</p>}
            </div>
          )}
          {isSignup && role === "driver" && (
            <div>
              <p className="mb-2 mt-1 text-[13px] font-medium" style={{ color: C.textDim }}>{t("vehicleType")}</p>
              <div className="grid grid-cols-4 gap-2">
                {VEHICLE_TYPES.map((v) => {
                  const active = vehicleType === v.key;
                  const label = vehicleTypeLabel(t, v.key);
                  return (
                    <button
                      key={v.key}
                      onClick={() => setVehicleType(v.key)}
                      className="flex flex-col items-center gap-1.5 py-3"
                      style={{
                        backgroundColor: active ? "rgba(255,153,0,0.15)" : C.surface,
                        border: active ? `1px solid ${C.accent}` : `1px solid ${C.hairline}`,
                        borderRadius: RADIUS.chip,
                      }}
                    >
                      <v.icon size={18} color={active ? C.accent : C.textDim} />
                      <span className="text-center text-[10px] font-semibold leading-tight" style={{ color: active ? C.accent : C.textDim }}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mb-1.5 mt-3 text-[13px] font-medium" style={{ color: C.textDim }}>{t("vehiclePlateLabel")}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md p-1" style={{ backgroundColor: "#FFC800", border: "2px solid #1A1A1A", width: "fit-content" }}>
                  <div className="flex h-full items-center justify-center px-1.5" style={{ backgroundColor: "#0052CC", borderRadius: 2 }}>
                    <span className="text-[10px] font-black leading-none text-white">UK</span>
                  </div>
                  <input
                    value={vehiclePlate}
                    onChange={(e) => { setVehiclePlate(e.target.value.toUpperCase()); setPlateResult(null); setPlateError(null); }}
                    placeholder={t("vehiclePlatePlaceholder")}
                    className="bg-transparent text-center text-[18px] font-black tracking-[0.12em] outline-none"
                    style={{ color: "#1A1A1A", width: 148, fontFamily: "Arial, sans-serif" }}
                  />
                </div>
                <button
                  onClick={handleVerifyPlate}
                  disabled={plateChecking}
                  className="shrink-0 rounded-md px-3 py-2.5 text-[12px] font-bold"
                  style={{ backgroundColor: C.surface, color: C.signal, border: `1px solid ${C.signal}`, opacity: plateChecking ? 0.6 : 1 }}
                >
                  {plateChecking ? t("checkingPlate") : t("verifyPlate")}
                </button>
              </div>

              {plateError && <p className="mt-2 text-[12px]" style={{ color: C.danger }}>{plateError}</p>}

              {plateResult && (
                <div className="mt-2 space-y-2 rounded-lg p-3" style={{ backgroundColor: C.surface, border: `1px solid ${C.hairline}` }}>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} color={C.signal} />
                    <span className="text-[12px] font-semibold" style={{ color: C.signal }}>{t("plateVerified")}</span>
                    {plateResult.registrationNumber != null && (
                      <span className="ml-auto text-[11px] font-bold tracking-wide" style={{ color: C.textDim }}>{plateResult.registrationNumber}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]" style={{ color: C.textDim }}>
                    {[
                      ["dvlaMake", plateResult.make],
                      ["dvlaModel", plateResult.model],
                      ["dvlaColour", plateResult.colour],
                      ["dvlaFuel", plateResult.fuelType],
                      ["dvlaYear", plateResult.yearOfManufacture],
                      ["dvlaEngine", plateResult.engineCapacity != null ? `${plateResult.engineCapacity} cc` : null],
                      ["dvlaCo2", plateResult.co2Emissions != null ? `${plateResult.co2Emissions} g/km` : null],
                      ["dvlaEuroStatus", plateResult.euroStatus],
                      ["dvlaTypeApproval", plateResult.typeApproval],
                      ["dvlaWheelplan", plateResult.wheelplan],
                      ["dvlaTaxDue", plateResult.taxDueDate],
                      ["dvlaExport", typeof plateResult.markedForExport === "boolean" ? (plateResult.markedForExport ? t("yesWord") : t("noWord")) : null],
                    ]
                      .filter(([, value]) => value != null && value !== "")
                      .map(([labelKey, value]) => (
                        <span key={labelKey}>
                          {t(labelKey)}: <span style={{ color: C.text }}>{value}</span>
                        </span>
                      ))}
                    {plateResult.taxStatus != null && (
                      <span>
                        {t("dvlaTax")}: <span style={{ color: plateResult.taxStatus === "Taxed" ? C.signal : C.caution }}>{plateResult.taxStatus}</span>
                      </span>
                    )}
                    {plateResult.motStatus != null && (
                      <span>
                        {t("dvlaMot")}: <span style={{ color: plateResult.motStatus === "Valid" ? C.signal : C.caution }}>{plateResult.motStatus}</span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          disabled={!canContinue || submitting}
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
          style={{ backgroundColor: canContinue && !submitting ? C.accent : C.surface, color: canContinue && !submitting ? C.onAccent : C.textFaint, borderRadius: RADIUS.control }}
        >
          {submitting ? t("processing") : `${isSignup ? t("createAccountAs") : t("continueAs")} ${roleWord}`}
          {!submitting && <ArrowRight size={16} />}
        </button>

        <button onClick={() => switchMode(isSignup ? "login" : "signup")} className="mt-4 w-full text-center text-[13px] font-semibold" style={{ color: C.accent }}>
          {isSignup ? t("alreadyHaveAccount") : t("newHere")}
        </button>

        {error && (
          <p className="mt-3 text-center text-[12px] leading-relaxed" style={{ color: C.danger }}>{error}</p>
        )}
        {!isSignup && !error && <p className="mt-3 text-center text-[12px]" style={{ color: C.textFaint }}>{t("demoCreds")}</p>}
      </div>
    </div>
  );
}

/* ============================================================
   SHARED — bottom nav
============================================================ */
function BottomNav({ tab, setTab, items }) {
  const { C } = useApp();
  return (
    <div className="flex items-center justify-around px-2 pb-3 pt-2" style={{ borderTop: `1px solid ${C.hairline}` }}>
      {items.map(({ key, icon: Icon, label }) => {
        const active = tab === key;
        return (
          <button key={key} onClick={() => setTab(key)} className="flex flex-1 flex-col items-center gap-1 py-1">
            <Icon size={20} color={active ? C.accent : C.textFaint} strokeWidth={active ? 2.4 : 2} />
            <span className="text-[11px] font-semibold" style={{ color: active ? C.accent : C.textFaint }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   DRIVER EXPERIENCE
============================================================ */
const DRIVER_JOBS = [
  { id: "J-1042", distance: 4.2, pay: 9.85, pickup: "SE1 7PB", dropoff: "E1 6AN", parcel: "Small parcel", payment: "card", photo: "https://picsum.photos/seed/J-1042/700/500" },
  { id: "J-1043", distance: 2.6, pay: 6.91, pickup: "N1 9GU", dropoff: "EC2A 3AY", parcel: "Envelope", payment: "cash", photo: "https://picsum.photos/seed/J-1043/700/500" },
  { id: "J-1044", distance: 6.8, pay: 13.85, pickup: "SW1A 1AA", dropoff: "W1D 3QU", parcel: "Medium box", payment: "card", photo: "https://picsum.photos/seed/J-1044/700/500" },
];

function OnlineToggle({ online, setOnline }) {
  const { C, t } = useApp();
  return (
    <button onClick={() => setOnline(!online)} className="relative flex h-9 w-[92px] items-center px-1" style={{ backgroundColor: online ? C.accent : C.raised, borderRadius: 999 }}>
      <span className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-bold transition-all" style={{ left: online ? "calc(100% - 30px)" : "3px", color: online ? C.accent : C.textFaint }}>
        {online ? "on" : "off"}
      </span>
      <span className="w-full text-center text-[11px] font-bold" style={{ color: online ? C.onAccent : C.textDim, paddingLeft: online ? 0 : 26 }}>
        {online ? t("online") : t("offline")}
      </span>
    </button>
  );
}

function DriverHomeScreen({ online, setOnline, walletBalance, jobs, onView }) {
  const { C, t } = useApp();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScreenHero />
      <div className="flex items-center justify-between px-5 pb-4 pt-3">
        <div>
          <p className="text-[13px] font-medium" style={{ color: C.textDim }}>{t("walletBalance")}</p>
          <p className="text-[24px] font-bold" style={{ color: C.text }}>{money(walletBalance)}</p>
        </div>
        <OnlineToggle online={online} setOnline={setOnline} />
      </div>

      {!online ? (
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 16 }}>
            <Package size={24} color={C.textFaint} />
          </div>
          <p className="text-[16px] font-bold" style={{ color: C.text }}>{t("youOffline")}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{t("goOnlineHint")}</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5">
          <p className="mb-3 text-[13px] font-medium" style={{ color: C.textDim }}>{jobs.length} {t("offersNearby")}</p>
          {jobs.map((job) => (
            <button key={job.id} onClick={() => onView(job)} className="mb-3 flex w-full gap-3 p-3 text-left" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
              {job.photo ? (
                <img src={job.photo} alt="" className="h-16 w-16 shrink-0 object-cover" style={{ borderRadius: RADIUS.chip }} />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center" style={{ backgroundColor: C.raised, borderRadius: RADIUS.chip }}>
                  <Package size={22} color={C.textFaint} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="truncate text-[13px]" style={{ color: C.textDim }}>{job.parcel} · {job.distance} mi</span>
                  <span className="flex shrink-0 items-center gap-1 text-[12px] font-semibold" style={{ color: job.payment === "cash" ? C.caution : C.signal }}>
                    {job.payment === "cash" ? <Banknote size={13} /> : <CreditCard size={13} />}
                    {job.payment === "cash" ? t("cash") : t("card")}
                  </span>
                </div>
                <p className="truncate text-[14px] font-semibold" style={{ color: C.text }}>{job.pickup} → {job.dropoff}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[18px] font-bold" style={{ color: C.signal }}>{money(job.pay)}</p>
                  <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: C.accent }}>
                    {t("viewOrder")} <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SlideToAccept({ label, completeLabel, onComplete }) {
  const { C } = useApp();
  const trackRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const THUMB = 56;

  const maxX = () => {
    const track = trackRef.current;
    return track ? track.getBoundingClientRect().width - THUMB : 0;
  };

  const handlePointerDown = (e) => {
    if (completed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const handlePointerMove = (e) => {
    if (!dragging || completed) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - THUMB / 2, rect.width - THUMB));
    setDragX(x);
  };
  const handlePointerUp = () => {
    if (completed) return;
    setDragging(false);
    const max = maxX();
    if (dragX > max * 0.75) {
      setCompleted(true);
      setDragX(max);
      onComplete();
    } else {
      setDragX(0);
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative flex h-14 items-center overflow-hidden px-1"
      style={{ backgroundColor: completed ? C.signal : C.raised, borderRadius: 999 }}
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[13px] font-bold"
        style={{ color: completed ? C.onSignal : C.textDim }}
      >
        {completed ? completeLabel : label}
      </span>
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative z-10 flex h-12 w-12 cursor-grab items-center justify-center rounded-full active:cursor-grabbing"
        style={{
          backgroundColor: C.accent,
          transform: `translateX(${dragX}px)`,
          transition: dragging ? "none" : "transform 0.25s ease",
          touchAction: "none",
        }}
      >
        <ArrowRight size={20} color={C.onAccent} />
      </div>
    </div>
  );
}

function FloatingBackButton({ onBack }) {
  const { C } = useApp();
  return (
    <button
      onClick={onBack}
      className="absolute left-4 top-4 z-30 flex h-9 w-9 items-center justify-center"
      style={{ backgroundColor: C.chromeBg, color: C.text, borderRadius: 999, backdropFilter: "blur(6px)" }}
    >
      <ArrowLeft size={16} />
    </button>
  );
}

function IncomingOrderScreen({ job, onAccept, onDecline, onBack }) {
  const { C, t } = useApp();
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-56 shrink-0" style={{ backgroundColor: C.raised }}>
        {job.photo ? (
          <img src={job.photo} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={40} color={C.textFaint} />
          </div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 65%)" }} />
        <FloatingBackButton onBack={onBack} />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-[12px] font-semibold text-white/80">{t("newOrder")}</p>
            <p className="text-[20px] font-bold text-white">{job.parcel}</p>
          </div>
          <p className="text-[28px] font-bold text-white">{money(job.pay)}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5">
        <div className="flex gap-2.5 p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
          <div className="mt-1.5 flex flex-col items-center">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: C.signal }} />
            <div className="my-1 h-9 w-px" style={{ backgroundColor: C.hairline }} />
            <MapPin size={13} color={C.accent} />
          </div>
          <div className="flex-1">
            <p className="text-[12px]" style={{ color: C.textDim }}>{t("pickingUpFrom")}</p>
            <p className="text-[15px] font-semibold" style={{ color: C.text }}>{job.pickup}</p>
            <p className="mt-3 text-[12px]" style={{ color: C.textDim }}>{t("droppingOffAt")}</p>
            <p className="text-[15px] font-semibold" style={{ color: C.text }}>{job.dropoff}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
          <span className="text-[13px]" style={{ color: C.textDim }}>{job.distance} mi</span>
          <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: job.payment === "cash" ? C.caution : C.signal }}>
            {job.payment === "cash" ? <Banknote size={13} /> : <CreditCard size={13} />}
            {job.payment === "cash" ? t("cash") : t("card")}
          </span>
        </div>
      </div>

      <div className="space-y-2 px-5 pb-5 pt-2">
        <SlideToAccept label={t("slideToAccept")} completeLabel={t("accepted")} onComplete={() => onAccept(job)} />
        <button onClick={() => onDecline(job)} className="w-full py-1 text-center text-[13px] font-semibold" style={{ color: C.textFaint }}>
          {t("decline")}
        </button>
      </div>
    </div>
  );
}

function DriverActiveJobScreen({ job, onComplete, onBack }) {
  const { C, t } = useApp();
  const [loaded, setLoaded] = useState(false);
  const [driverLocation, setDriverLocation] = useState(null);

  // Track this driver's own live GPS position — used to draw "you are here"
  // on the map, and (for real matched orders) pushed to shared storage so
  // the customer's tracking screen can follow along continuously too.
  useEffect(() => {
    let cancelled = false;
    const pushLocation = async () => {
      try {
        const pos = await getCurrentPosition();
        if (cancelled) return;
        setDriverLocation(pos);
        if (job.isLive) await updateOrderFields(job.id, { driverLocation: pos });
      } catch {
        // location unavailable — skip this tick, try again next interval
      }
    };
    pushLocation();
    const interval = setInterval(pushLocation, 6000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [job.id, job.isLive]);

  const handleCompletePickup = () => {
    setLoaded(true);
    if (job.isLive) updateOrderFields(job.id, { deliveryStage: "picked_up" });
  };
  const handleConfirmDropoff = () => {
    if (job.isLive) updateOrderFields(job.id, { deliveryStage: "delivered" });
    onComplete(job);
  };

  // Before pickup: route is "you are here" → pickup. After pickup: route is
  // pickup → drop-off, with your live position still shown on the map.
  const routeTarget = loaded ? job.dropoffCoords : job.pickupCoords;
  const mapUrl = job.pickupCoords
    ? loaded
      ? staticMapUrl({ pickup: job.pickupCoords, dropoff: job.dropoffCoords, driver: driverLocation })
      : staticMapUrl({ pickup: driverLocation || job.pickupCoords, dropoff: job.pickupCoords, single: !driverLocation })
    : null;
  const liveDistance = driverLocation && routeTarget ? milesBetween(driverLocation, routeTarget) : null;
  const displayDistance = liveDistance !== null && isFinite(liveDistance) ? liveDistance.toFixed(1) : job.distance;

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-72 shrink-0" style={{ backgroundColor: C.raised }}>
        <FloatingBackButton onBack={onBack} />
        {mapUrl ? (
          <>
            <img src={mapUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0) 40%)" }} />
          </>
        ) : (
          <svg width="100%" height="100%" viewBox="0 0 400 290" className="absolute inset-0">
            <path d="M30 250 L150 100 L300 100 L365 35" fill="none" stroke={C.hairline} strokeWidth="16" strokeLinecap="round" />
            <path d="M30 250 L150 100 L300 100 L365 35" fill="none" stroke={C.accent} strokeWidth="3" strokeDasharray="1 14" strokeLinecap="round" />
            <circle cx="30" cy="250" r="6" fill={C.signal} />
            <circle cx="365" cy="35" r="6" fill={C.accent} />
          </svg>
        )}
        <div className="absolute left-4 top-16 flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-semibold" style={{ backgroundColor: C.chromeBg, color: C.text, borderRadius: 10 }}>
          <Navigation size={13} color={C.accent} />
          {displayDistance} mi · {Math.round((typeof displayDistance === "number" ? displayDistance : parseFloat(displayDistance)) * 3.3)} min
        </div>
        <div className="absolute right-4 top-16 flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-semibold" style={{ backgroundColor: loaded ? "rgba(0,168,232,0.9)" : "rgba(255,153,0,0.9)", color: "#04222E", borderRadius: 10 }}>
          {loaded ? t("droppingOffAt") : t("pickingUpFrom")}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5">
        <div className="p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
          <p className="text-[12px] font-medium" style={{ color: C.textDim }}>{loaded ? t("droppingOffAt") : t("pickingUpFrom")}</p>
          <p className="mt-1 text-[16px] font-bold" style={{ color: C.text }}>{loaded ? job.dropoff : job.pickup}</p>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{loaded ? t("dropoffNote") : t("pickupNote")}</p>
        </div>

        <div className="mt-3 flex items-center justify-between p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
          <div className="flex items-center gap-2">
            <Clock size={15} color={C.textDim} />
            <span className="text-[13px]" style={{ color: C.textDim }}>{t("job")} {job.id}</span>
          </div>
          <span className="text-[16px] font-bold" style={{ color: C.signal }}>{money(job.pay)}</span>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3">
        {!loaded ? (
          <button onClick={handleCompletePickup} className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold" style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: RADIUS.control }}>
            <Camera size={17} /> {t("completePickup")}
          </button>
        ) : (
          <button onClick={handleConfirmDropoff} className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold" style={{ backgroundColor: C.signal, color: C.onSignal, borderRadius: RADIUS.control }}>
            <CheckCircle2 size={17} /> {t("confirmDropoff")}
          </button>
        )}
      </div>
    </div>
  );
}

function DriverWalletScreen({ walletBalance, history, onBack }) {
  const { C, t } = useApp();
  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader eyebrow={t("earnings")} title={t("walletTitle")} onBack={onBack} />
      <div className="px-5">
        <div className="p-6 text-center" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
          <p className="text-[13px] font-medium" style={{ color: C.textDim }}>{t("availableBalance")}</p>
          <p className="mt-1 text-[32px] font-bold" style={{ color: C.text }}>{money(walletBalance)}</p>
        </div>
        <p className="mb-3 mt-6 text-[13px] font-medium" style={{ color: C.textDim }}>{t("recentActivity")}</p>
        {history.length === 0 && <p className="mt-8 text-center text-[13px]" style={{ color: C.textFaint }}>{t("noDeliveriesYet")}</p>}
        {history.map((h, i) => (
          <div key={i} className="mb-2 flex items-center justify-between p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} color={C.signal} />
              <span className="text-[14px]" style={{ color: C.text }}>{h.id}</span>
            </div>
            <span className="text-[14px] font-semibold" style={{ color: C.signal }}>+{money(h.driverPayout)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ name, initials, subtitle, avatarSeed, verified, contactRows, rows, onLogout, onBack, onOpenHelp }) {
  const { C, t } = useApp();
  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader title={t("profileTitle")} onBack={onBack} />
      <div className="px-5">
        <div className="flex items-center gap-3 p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
          <div className="relative h-14 w-14 shrink-0">
            <img src={avatarUrl(avatarSeed || name)} alt="" className="h-14 w-14 object-cover" style={{ borderRadius: 14 }} />
            {verified && (
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: C.signal, border: `2px solid ${C.surface}` }}>
                <CheckCircle2 size={11} color={C.onSignal} />
              </div>
            )}
          </div>
          <div>
            <p className="text-[16px] font-bold" style={{ color: C.text }}>{name}</p>
            <p className="text-[13px]" style={{ color: C.textDim }}>{subtitle}</p>
          </div>
        </div>

        {contactRows && contactRows.length > 0 && (
          <div className="mt-3 space-y-2">
            {contactRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
                <span className="text-[13px]" style={{ color: C.textDim }}>{label}</span>
                <span className="text-[14px] font-medium" style={{ color: C.text }}>{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 space-y-2">
          {rows.map(([label, value, ok]) => (
            <div key={label} className="flex items-center justify-between p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
              <span className="text-[14px]" style={{ color: C.text }}>{label}</span>
              {ok !== undefined ? (
                <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: C.signal }}>
                  <CheckCircle2 size={13} /> {value}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[13px]" style={{ color: C.textDim }}>
                  {value} <ChevronRight size={14} />
                </span>
              )}
            </div>
          ))}
        </div>

        {onOpenHelp && (
          <button onClick={onOpenHelp} className="mt-3 flex w-full items-center justify-between p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
            <span className="flex items-center gap-2 text-[14px] font-semibold" style={{ color: C.text }}>
              <LifeBuoy size={16} color={C.textDim} /> {t("helpAndSupport")}
            </span>
            <ChevronRight size={14} color={C.textDim} />
          </button>
        )}

        <button onClick={onLogout} className="mt-3 flex w-full items-center justify-center gap-2 py-3 text-[14px] font-semibold" style={{ backgroundColor: "rgba(255,107,107,0.12)", color: C.danger, borderRadius: RADIUS.control }}>
          <LogOut size={16} /> {t("logOut")}
        </button>
      </div>
    </div>
  );
}

function HelpScreen({ user, role, onBack }) {
  const { C, t } = useApp();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const canSend = message.trim().length >= 5 && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    try {
      await submitSupportMessage({
        role,
        fromName: user?.name || "Guest",
        fromPhone: user?.phone || null,
        fromEmail: user?.email || null,
        message: message.trim(),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-1 flex-col">
        <ScreenHeader title={t("helpAndSupport")} onBack={onBack} />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 16 }}>
            <CheckCircle2 size={26} color={C.signal} />
          </div>
          <p className="text-[16px] font-bold" style={{ color: C.text }}>{t("messageSentTitle")}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{t("messageSentHint")}</p>
          <button onClick={onBack} className="mt-6 w-full py-3 text-[14px] font-bold" style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: RADIUS.control }}>
            {t("backToBooking")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader title={t("helpAndSupport")} onBack={onBack} />
      <div className="flex-1 px-5">
        <p className="text-[13px] leading-relaxed" style={{ color: C.textDim }}>{t("helpHint")}</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("helpPlaceholder")}
          rows={6}
          className="mt-4 w-full resize-none px-3.5 py-3 text-[14px] outline-none"
          style={{ backgroundColor: C.surface, color: C.text, borderRadius: RADIUS.control, border: `1px solid ${C.hairline}` }}
        />
      </div>
      <div className="px-5 pb-6 pt-2">
        <button
          disabled={!canSend}
          onClick={handleSend}
          className="flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold"
          style={{ backgroundColor: canSend ? C.accent : C.raised, color: canSend ? C.onAccent : C.textFaint, borderRadius: RADIUS.control }}
        >
          {sending ? t("processing") : t("sendMessage")}
        </button>
      </div>
    </div>
  );
}

function initialsFrom(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function avatarUrl(seed) {
  const hash = String(seed).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const imgId = (hash % 70) + 1; // pravatar serves real portrait photos numbered 1–70
  return `https://i.pravatar.cc/150?img=${imgId}`;
}

function DriverExperience({ user, onLogout, onUserUpdate }) {
  const { t } = useApp();
  const [online, setOnline] = useState(false);
  const [jobs, setJobs] = useState(DRIVER_JOBS);
  const [liveOrders, setLiveOrders] = useState([]);
  const [declinedIds, setDeclinedIds] = useState(() => new Set());
  const [incomingJob, setIncomingJob] = useState(null);
  const [activeJob, setActiveJob] = useState(null);
  const [tab, setTab] = useState("home");
  const [walletBalance, setWalletBalance] = useState(42.5);
  const [history, setHistory] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [pendingAdjustment, setPendingAdjustment] = useState(null);
  const [resolvedAdjustmentIds] = useState(() => new Set());

  const displayName = user?.name || "James Mitchell";

  // Load this driver's persisted wallet balance once, so it survives reloads.
  useEffect(() => {
    if (!user?.phone) return;
    let cancelled = false;
    (async () => {
      const app = await getDriverApplication(user.phone);
      if (!cancelled && typeof app?.walletBalance === "number") setWalletBalance(app.walletBalance);
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.phone]);

  // Poll for an admin-proposed balance adjustment addressed to this driver.
  useEffect(() => {
    if (!user?.phone) return;
    let cancelled = false;
    const poll = async () => {
      const all = await fetchWalletAdjustments();
      if (cancelled) return;
      const mine = all.find((a) => a.driverPhone === user.phone && a.status === "pending" && !resolvedAdjustmentIds.has(a.id));
      if (mine) setPendingAdjustment(mine);
    };
    poll();
    const interval = setInterval(poll, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user?.phone]);

  const handleAdjustmentDecision = async (accepted) => {
    if (!pendingAdjustment) return;
    const adj = pendingAdjustment;
    resolvedAdjustmentIds.add(adj.id);
    await updateWalletAdjustment(adj.id, { status: accepted ? "accepted" : "declined" });
    if (accepted) {
      setWalletBalance((prev) => {
        const next = prev + adj.amount;
        if (user?.phone) updateDriverApplication(user.phone, { walletBalance: next });
        return next;
      });
    }
    setPendingAdjustment(null);
  };

  // Poll the shared driver-application record so a real approval decision
  // made from the Admin Panel (a different login/session) is picked up here.
  useEffect(() => {
    if (!user || user.status !== "pending" || !user.phone) return;
    let cancelled = false;
    const poll = async () => {
      const app = await getDriverApplication(user.phone);
      if (cancelled || !app) return;
      if (app.status === "approved") {
        const updated = { ...user, status: "approved" };
        await saveAccount(updated);
        onUserUpdate?.(updated);
      }
    };
    poll();
    const interval = setInterval(poll, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user?.phone, user?.status]);

  // While online, poll shared storage for real nearby orders within 1.5 miles
  // of the driver's live GPS position.
  useEffect(() => {
    if (!online || user?.status === "pending") {
      setLiveOrders([]);
      return;
    }
    let cancelled = false;
    let driverLocation = null;

    const poll = async () => {
      if (!driverLocation) {
        try {
          driverLocation = await getCurrentPosition();
        } catch {
          driverLocation = null;
        }
      }
      if (!driverLocation || cancelled) return;
      const open = await fetchOpenOrders();
      if (cancelled) return;
      const sizeLabelMap = { envelope: t("sizeEnvelope"), small: t("sizeSmall"), medium: t("sizeMedium"), large: t("sizeLarge") };
      const nearby = open
        .filter((o) => o.pickupCoords && !declinedIds.has(o.id))
        .filter((o) => milesBetween(driverLocation, o.pickupCoords) <= MATCH_RADIUS_MILES)
        .map((o) => ({
          id: o.id,
          distance: o.distance,
          pay: o.total,
          pickup: o.pickup,
          dropoff: o.dropoff,
          pickupCoords: o.pickupCoords,
          dropoffCoords: o.dropoffCoords,
          parcel: sizeLabelMap[o.parcel] ?? o.parcel,
          payment: o.payment,
          vehicle: o.vehicle,
          photo: null,
          isLive: true,
        }));
      setLiveOrders(nearby);
    };

    poll();
    const interval = setInterval(poll, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [online, declinedIds, user?.status]);

  if (user?.status === "pending") {
    return (
      <PhoneFrame>
        <DriverPendingScreen onLogout={onLogout} />
      </PhoneFrame>
    );
  }

  if (pendingAdjustment) {
    return (
      <PhoneFrame>
        <DriverWalletAdjustmentScreen
          adjustment={pendingAdjustment}
          onAccept={() => handleAdjustmentDecision(true)}
          onDecline={() => handleAdjustmentDecision(false)}
        />
      </PhoneFrame>
    );
  }

  const combinedJobs = [...liveOrders, ...jobs];

  const handleView = (job) => setIncomingJob(job);
  const handleDecline = (job) => {
    if (job.isLive) {
      setDeclinedIds((prev) => new Set(prev).add(job.id));
      setLiveOrders((prev) => prev.filter((j) => j.id !== job.id));
    } else {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    }
    setIncomingJob(null);
  };
  const handleAccept = async (job) => {
    if (job.isLive) {
      const driverInfo = { name: displayName, vehicle: user?.vehicleType || "car", initials: initialsFrom(displayName) };
      const ok = await acceptOrder(job.id, driverInfo);
      setLiveOrders((prev) => prev.filter((j) => j.id !== job.id));
      if (!ok) {
        setIncomingJob(null);
        return; // another driver already took this order
      }
    } else {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    }
    setTimeout(() => {
      setIncomingJob(null);
      setActiveJob(job);
    }, 350);
  };
  const handleComplete = (job) => {
    const payout = job.pay * 0.85;
    setWalletBalance((prev) => {
      const next = prev + payout;
      if (user?.phone) updateDriverApplication(user.phone, { walletBalance: next });
      return next;
    });
    setHistory((prev) => [{ ...job, driverPayout: payout }, ...prev]);
    setActiveJob(null);
  };

  const contactRows = user
    ? [
        [t("phoneLabel"), user.phone || "—"],
        [t("emailLabel"), user.email || "—"],
        ...(user.vehicleType ? [[t("vehicleLabel"), vehicleTypeLabel(t, user.vehicleType)]] : []),
      ]
    : undefined;

  if (activeJob) {
    return (
      <PhoneFrame>
        <DriverActiveJobScreen job={activeJob} onComplete={handleComplete} onBack={() => setActiveJob(null)} />
      </PhoneFrame>
    );
  }

  if (incomingJob) {
    return (
      <PhoneFrame>
        <IncomingOrderScreen job={incomingJob} onAccept={handleAccept} onDecline={handleDecline} onBack={() => setIncomingJob(null)} />
      </PhoneFrame>
    );
  }

  if (showHelp) {
    return (
      <PhoneFrame>
        <HelpScreen user={user} role="driver" onBack={() => setShowHelp(false)} />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      {tab === "home" && <DriverHomeScreen online={online} setOnline={setOnline} walletBalance={walletBalance} jobs={combinedJobs} onView={handleView} />}
      {tab === "wallet" && <DriverWalletScreen walletBalance={walletBalance} history={history} onBack={() => setTab("home")} />}
      {tab === "profile" && (
        <ProfileScreen
          name={displayName}
          initials={initialsFrom(displayName)}
          avatarSeed={user?.phone || displayName}
          verified={user?.status === "approved"}
          subtitle={t("driverActive")}
          contactRows={contactRows}
          rows={[
            [t("dvlaLicence"), t("verified"), true],
            [t("insurance"), t("verified"), true],
            [t("shareCode"), t("verified"), true],
          ]}
          onLogout={onLogout}
          onBack={() => setTab("home")}
          onOpenHelp={() => setShowHelp(true)}
        />
      )}
      <BottomNav
        tab={tab}
        setTab={setTab}
        items={[
          { key: "home", icon: Home, label: t("navOffers") },
          { key: "wallet", icon: Wallet, label: t("navWallet") },
          { key: "profile", icon: User, label: t("navProfile") },
        ]}
      />
    </PhoneFrame>
  );
}

/* ============================================================
   CUSTOMER EXPERIENCE
============================================================ */
function estimateDistance(pickup, dropoff) {
  const seed = (pickup + dropoff).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return Math.round((2 + (seed % 60) / 10) * 10) / 10;
}

/* Real UK postcode lookup:
   1) postcodes.io — free, no API key, validates the postcode and returns
      its real district/ward/region and coordinates.
   2) OpenStreetMap Nominatim — reverse-geocodes those coordinates to the
      nearest real street name.
   Note: exact building-by-building address lists (Royal Mail PAF) are a
   paid dataset (Google Places, getAddress.io, Loqate...). Without an API
   key for one of those, house numbers below are illustrative — but the
   postcode, district and street name are real, live-looked-up data.

   If the live services can't be reached at all (offline, blocked, or
   timed out), we fall back to an offline estimate rather than showing
   nothing — clearly labelled as such in the UI. */
const UK_POSTCODE_RE = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;

const OFFLINE_AREA_TOWNS = {
  SE: "London", SW: "London", NW: "London", EC: "London", WC: "London",
  N: "London", E: "London", W: "London",
  M: "Manchester", B: "Birmingham", LS: "Leeds", G: "Glasgow", EH: "Edinburgh",
  NG: "Nottingham", CF: "Cardiff", BS: "Bristol", L: "Liverpool", S: "Sheffield",
  LE: "Leicester", CB: "Cambridge", OX: "Oxford",
};
const OFFLINE_STREET_NAMES = ["High Street", "Kings Road", "Church Lane", "Victoria Road", "Mill Lane", "Station Road", "Park Avenue", "Queens Gate"];

function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

/* ============================================================
   VEHICLE LOOKUP BY NUMBER PLATE — real DVLA data, via YOUR OWN
   BACKEND (not called directly from the browser).

   Architecture:
     Existing frontend
           ↓
     POST /api/vehicle/verify
           ↓
     Your backend/server
           ↓
     DVLA VES API (https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles)
           ↓
     Vehicle information
           ↓
     Frontend

   Why a backend is required (non-negotiable, not a style choice):
     - DVLA's Vehicle Enquiry Service needs an x-api-key. Calling it
       straight from client-side JS would ship that key to every user's
       browser, where anyone can read and reuse it.
     - DVLA's API is built for server-to-server calls; browsers calling
       it directly are blocked by CORS in practice.

   This file only ever talks to YOUR backend at VEHICLE_VERIFY_ENDPOINT.
   It never sees, stores, or sends the DVLA_API_KEY — that lives only in
   your backend's environment/secrets configuration (see /server folder
   shipped alongside this file: server/api/vehicle-verify.js for Vercel,
   server/express-server.js for a standalone Node host — pick one, deploy
   it, set DVLA_API_KEY there, then paste the deployed URL below).
============================================================ */
const VEHICLE_VERIFY_ENDPOINT = ""; // ← e.g. "https://yourapp.vercel.app/api/vehicle/verify"

// Matches current-style UK plates (e.g. AB12CDE) — used to trigger an
// automatic lookup as soon as the typed plate looks complete/valid.
const UK_PLATE_RE = /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/;

function normalizeRegistrationNumber(raw) {
  return String(raw || "")
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

async function lookupVehicleByPlate(plate) {
  const registrationNumber = normalizeRegistrationNumber(plate);

  if (!registrationNumber) {
    const err = new Error("empty_plate");
    err.code = "empty_plate";
    throw err;
  }

  if (!VEHICLE_VERIFY_ENDPOINT) {
    const err = new Error("no_backend");
    err.code = "no_backend";
    throw err;
  }

  let res;
  try {
    res = await fetchWithTimeout(VEHICLE_VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ registrationNumber }),
    });
  } catch (err) {
    const wrapped = new Error("network_error");
    wrapped.code = "network_error";
    throw wrapped;
  }

  if (res.ok) {
    return res.json(); // real DVLA JSON, forwarded as-is by your backend
  }

  const err = new Error("dvla_error");
  switch (res.status) {
    case 400:
      err.code = "invalid_plate";
      break;
    case 401:
    case 403:
      err.code = "auth_problem";
      break;
    case 404:
      err.code = "not_found";
      break;
    case 429:
      err.code = "rate_limited";
      break;
    case 500:
    case 503:
      err.code = "service_unavailable";
      break;
    default:
      err.code = "dvla_error";
  }
  throw err;
}

/* ============================================================
   DVLA AUTHENTICATION API — matches the schema at
   https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/authentication-api/authentication-api.json

   This is DVLA's separate "third-party access" credential service:
   it exchanges a DVLA-issued username/password for a JWT ("id-token"),
   and lets you rotate your API key or reset your password. It is NOT
   needed for the Vehicle Enquiry Service used above — VES explicitly
   says "This operation does not require authentication" beyond the
   x-api-key header. These helpers are provided ready-to-use in case
   your specific DVLA product/contract requires this login flow for a
   different DVLA endpoint; nothing in the app's UI calls them yet.
============================================================ */
const DVLA_AUTH_BASE = "https://driver-vehicle-licensing.api.gov.uk/thirdparty-access";

// POST /v1/authenticate — { userName, password } → { "id-token": "<jwt>" }
async function dvlaAuthenticate(userName, password) {
  const res = await fetchWithTimeout(`${DVLA_AUTH_BASE}/v1/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  if (!res.ok) {
    const err = new Error("dvla_auth_failed");
    err.code = res.status === 401 ? "auth_failed" : "bad_request";
    throw err;
  }
  const data = await res.json();
  return data["id-token"];
}

// POST /v1/password — { userName, password, newPassword, verifyCode }
async function dvlaChangePassword({ userName, password, newPassword, verifyCode }) {
  const res = await fetchWithTimeout(`${DVLA_AUTH_BASE}/v1/password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ userName, password, newPassword, verifyCode }),
  });
  if (!res.ok) throw new Error("dvla_change_password_failed");
  return true;
}

// POST /v1/new-password — { userName, email } → sends a recovery code
async function dvlaRequestPasswordReset({ userName, email }) {
  const res = await fetchWithTimeout(`${DVLA_AUTH_BASE}/v1/new-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ userName, email }),
  });
  if (!res.ok) throw new Error("dvla_reset_failed");
  return true;
}

// POST /v1/new-api-key — requires x-api-key + Authorization: Bearer <id-token>
// Rotates the caller's API key; the old key stops working immediately.
async function dvlaRotateApiKey(apiKey, idToken) {
  const res = await fetchWithTimeout(`${DVLA_AUTH_BASE}/v1/new-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": apiKey,
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!res.ok) throw new Error("dvla_rotate_key_failed");
  const data = await res.json();
  return data.newApiKey;
}

async function fetchPostcodeInfo(postcode) {
  let res;
  try {
    res = await fetchWithTimeout(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
  } catch {
    throw new Error("network_error");
  }
  if (res.status === 404) throw new Error("not_found");
  if (!res.ok) throw new Error("network_error");
  const data = await res.json();
  return data.result;
}

async function fetchNearestStreet(lat, lon) {
  try {
    const res = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=17&addressdetails=1`,
      { headers: { Accept: "application/json" } },
      4000
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.address || null;
  } catch {
    return null;
  }
}

function offlineEstimate(postcode) {
  const letters = (postcode.match(/^[A-Za-z]+/) || [""])[0].toUpperCase();
  const town = OFFLINE_AREA_TOWNS[letters.slice(0, 2)] || OFFLINE_AREA_TOWNS[letters.slice(0, 1)] || "United Kingdom";
  const seed = postcode.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: 4 }, (_, i) => {
    const houseNumber = 1 + ((seed + i * 7) % 60);
    const street = OFFLINE_STREET_NAMES[(seed + i * 3) % OFFLINE_STREET_NAMES.length];
    return `${houseNumber} ${street}, ${town}, ${postcode}`;
  });
}

async function fetchNearestPostcode(lat, lon) {
  const res = await fetchWithTimeout(`https://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}&limit=1`);
  if (!res.ok) throw new Error("network_error");
  const data = await res.json();
  return data.result && data.result.length > 0 ? data.result[0] : null;
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  });
}

async function lookupAddresses(postcode) {
  let info;
  try {
    info = await fetchPostcodeInfo(postcode);
  } catch (err) {
    if (err.message === "not_found") {
      const notFoundError = new Error("not_found");
      notFoundError.code = "not_found";
      throw notFoundError;
    }
    // Live service unreachable — fall back to an offline estimate rather than failing outright.
    return { addresses: offlineEstimate(postcode), offline: true };
  }

  const osmAddress = await fetchNearestStreet(info.latitude, info.longitude);
  const street = osmAddress?.road || osmAddress?.pedestrian || osmAddress?.suburb || null;
  const town = info.admin_district || info.parish || info.region || info.country || "United Kingdom";

  const seed = postcode.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const addresses = Array.from({ length: 4 }, (_, i) => {
    const houseNumber = 1 + ((seed + i * 7) % 60);
    return street
      ? `${houseNumber} ${street}, ${town}, ${info.postcode}`
      : `${town}, ${info.postcode}`;
  });
  return { addresses, offline: false, coords: { lat: info.latitude, lon: info.longitude } };
}

function AddressPicker({ iconColor, value, onSelect }) {
  const { C, t } = useApp();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [resultCoords, setResultCoords] = useState(null);
  const [offlineNotice, setOfflineNotice] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  const handleSearch = async () => {
    const cleaned = query.trim();
    if (!UK_POSTCODE_RE.test(cleaned)) {
      setError(t("invalidPostcode"));
      setResults(null);
      return;
    }
    setError(null);
    setResults(null);
    setOfflineNotice(false);
    setLoading(true);
    try {
      const { addresses, offline, coords } = await lookupAddresses(cleaned);
      setResults(addresses);
      setResultCoords(coords ?? null);
      setOfflineNotice(offline);
    } catch (err) {
      setError(err?.code === "not_found" ? t("noAddressesFound") : t("lookupUnavailable"));
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = async () => {
    setError(null);
    setResults(null);
    setOfflineNotice(false);
    setLocating(true);
    try {
      const { lat, lon } = await getCurrentPosition();
      const nearest = await fetchNearestPostcode(lat, lon);
      if (!nearest) {
        setError(t("locationUnavailable"));
        return;
      }
      const osmAddress = await fetchNearestStreet(lat, lon);
      const street = osmAddress?.road || osmAddress?.pedestrian || osmAddress?.suburb || null;
      const town = nearest.admin_district || nearest.parish || nearest.region || "United Kingdom";
      const address = street ? `${street}, ${town}, ${nearest.postcode}` : `${town}, ${nearest.postcode}`;
      onSelect(address, { lat, lon });
    } catch {
      setError(t("locationUnavailable"));
    } finally {
      setLocating(false);
    }
  };

  if (value) {
    return (
      <div className="flex items-center justify-between gap-2.5 px-3.5 py-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control }}>
        <div className="flex min-w-0 items-center gap-3">
          <MapPin size={16} color={iconColor} />
          <span className="truncate text-[14px]" style={{ color: C.text }}>{value}</span>
        </div>
        <button onClick={() => onSelect("", null)} className="shrink-0 text-[12px] font-semibold" style={{ color: C.accent }}>
          {t("changeAddress")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleUseLocation}
        disabled={locating}
        className="mb-1.5 flex w-full items-center justify-center gap-1.5 py-2"
        style={{ backgroundColor: "rgba(0,168,232,0.12)", border: `1px solid ${C.signal}`, borderRadius: RADIUS.chip, opacity: locating ? 0.7 : 1 }}
      >
        <LocateFixed size={13} color={C.signal} />
        <span className="text-[12px] font-semibold" style={{ color: C.signal }}>
          {locating ? t("locating") : t("useMyLocation")}
        </span>
      </button>
      <p className="mb-1.5 text-center text-[10px]" style={{ color: C.textFaint }}>{t("orEnterPostcode")}</p>

      <div className="flex items-center gap-1.5">
        <div className="flex flex-1 items-center gap-2 px-3 py-2.5" style={{ backgroundColor: C.surface, borderRadius: RADIUS.chip, border: `1px solid ${C.hairline}` }}>
          <MapPin size={14} color={iconColor} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value.toUpperCase()); setResults(null); setError(null); }}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            placeholder={t("enterPostcode")}
            className="flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: C.text }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="shrink-0 px-3 py-2.5 text-[12px] font-bold"
          style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: RADIUS.chip, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? t("searching") : t("findAddress")}
        </button>
      </div>
      {error && <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>{error}</p>}
      {results && results.length > 0 && (
        <div className="mt-2 space-y-1.5">
          <p className="text-[12px] font-medium" style={{ color: C.textDim }}>{t("selectYourAddress")}</p>
          {offlineNotice && (
            <p className="text-[11px]" style={{ color: C.textFaint }}>{t("offlineEstimateNote")}</p>
          )}
          {results.map((addr) => (
            <button key={addr} onClick={() => onSelect(addr, resultCoords)} className="block w-full px-3.5 py-2.5 text-left text-[13px]" style={{ backgroundColor: C.raised, borderRadius: RADIUS.chip, color: C.text }}>
              {addr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FieldInput({ icon: Icon, iconColor, value, onChange, placeholder }) {
  const { C } = useApp();
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.control }}>
      <Icon size={16} color={iconColor} />
      <input value={value} onChange={onChange} placeholder={placeholder} className="flex-1 bg-transparent text-[15px] outline-none" style={{ color: C.text }} />
    </div>
  );
}

function CustomerBookScreen({ form, setForm, onGetQuote }) {
  const { C, t } = useApp();
  const canQuote = form.pickup.trim().length > 2 && form.dropoff.trim().length > 2;
  const sizes = [
    { key: "envelope", label: t("sizeEnvelope") },
    { key: "small", label: t("sizeSmall") },
    { key: "medium", label: t("sizeMedium") },
    { key: "large", label: t("sizeLarge") },
  ];
  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader eyebrow={t("newDelivery")} title={t("whereGoing")} />
      <div className="space-y-2 px-5">
        <div>
          <p className="mb-2 text-[13px] font-medium" style={{ color: C.textDim }}>{t("pickupPostcode")}</p>
          <AddressPicker iconColor={C.signal} value={form.pickup} onSelect={(addr, coords) => setForm({ ...form, pickup: addr, pickupCoords: coords })} />
        </div>
        <div>
          <p className="mb-2 text-[13px] font-medium" style={{ color: C.textDim }}>{t("dropoffPostcode")}</p>
          <AddressPicker iconColor={C.accent} value={form.dropoff} onSelect={(addr, coords) => setForm({ ...form, dropoff: addr, dropoffCoords: coords })} />
        </div>

        <div>
          <p className="mb-2 mt-4 text-[13px] font-medium" style={{ color: C.textDim }}>{t("vehicleType")}</p>
          <div className="grid grid-cols-4 gap-2">
            {VEHICLE_TYPES.map((v) => {
              const active = form.vehicle === v.key;
              const label = vehicleTypeLabel(t, v.key);
              return (
                <button
                  key={v.key}
                  onClick={() => setForm({ ...form, vehicle: v.key })}
                  className="flex flex-col items-center gap-1.5 py-3"
                  style={{
                    backgroundColor: active ? "rgba(255,153,0,0.15)" : C.surface,
                    border: active ? `1px solid ${C.accent}` : `1px solid ${C.hairline}`,
                    borderRadius: RADIUS.chip,
                  }}
                >
                  <v.icon size={18} color={active ? C.accent : C.textDim} />
                  <span className="text-center text-[10px] font-semibold leading-tight" style={{ color: active ? C.accent : C.textDim }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 mt-4 text-[13px] font-medium" style={{ color: C.textDim }}>{t("parcelSize")}</p>
          <div className="flex gap-2">
            {sizes.map((p) => {
              const active = form.parcel === p.key;
              return (
                <button key={p.key} onClick={() => setForm({ ...form, parcel: p.key })} className="flex-1 py-2.5 text-[13px] font-semibold" style={{ backgroundColor: active ? C.accent : C.surface, color: active ? C.onAccent : C.textDim, borderRadius: RADIUS.chip }}>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 mt-4 text-[13px] font-medium" style={{ color: C.textDim }}>{t("paymentLabel")}</p>
          <div className="flex gap-2">
            <button onClick={() => setForm({ ...form, payment: "card" })} className="flex flex-1 items-center justify-center gap-2 py-3" style={{ backgroundColor: form.payment === "card" ? C.surface : "transparent", border: `1px solid ${form.payment === "card" ? C.signal : C.hairline}`, borderRadius: RADIUS.chip }}>
              <CreditCard size={15} color={form.payment === "card" ? C.signal : C.textDim} />
              <span className="text-[13px] font-semibold" style={{ color: form.payment === "card" ? C.signal : C.textDim }}>{t("card")}</span>
            </button>
            <button onClick={() => setForm({ ...form, payment: "cash" })} className="flex flex-1 items-center justify-center gap-2 py-3" style={{ backgroundColor: form.payment === "cash" ? C.surface : "transparent", border: `1px solid ${form.payment === "cash" ? C.caution : C.hairline}`, borderRadius: RADIUS.chip }}>
              <Banknote size={15} color={form.payment === "cash" ? C.caution : C.textDim} />
              <span className="text-[13px] font-semibold" style={{ color: form.payment === "cash" ? C.caution : C.textDim }}>{t("cash")}</span>
            </button>
          </div>
        </div>

        <button disabled={!canQuote} onClick={onGetQuote} className="mt-6 flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold" style={{ backgroundColor: canQuote ? C.accent : C.surface, color: canQuote ? C.onAccent : C.textFaint, borderRadius: RADIUS.control }}>
          {t("getQuote")}
        </button>
      </div>
    </div>
  );
}

function FareSheet({ form, distance, onClose, onConfirm }) {
  const { C, t } = useApp();
  const pricing = VEHICLE_PRICING[form.vehicle] ?? VEHICLE_PRICING.car;
  const mileage = distance * pricing.perMile;
  const total = pricing.base + mileage;
  const sizeLabelMap = { envelope: t("sizeEnvelope"), small: t("sizeSmall"), medium: t("sizeMedium"), large: t("sizeLarge") };
  const parcelLabel = sizeLabelMap[form.parcel] ?? form.parcel;
  const vehicleLabel = vehicleTypeLabel(t, form.vehicle);
  const baseFareLabel = form.vehicle === "recovery" ? t("calloutFee") : t("baseFare");
  return (
    <div className="absolute inset-0 z-20 flex items-end" style={{ backgroundColor: C.overlay }}>
      <div className="w-full p-6" style={{ backgroundColor: C.surface, borderTopLeftRadius: RADIUS.sheet, borderTopRightRadius: RADIUS.sheet }}>
        <div className="mx-auto mb-5 h-1 w-10 rounded-full" style={{ backgroundColor: C.hairline }} />
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[17px] font-bold" style={{ color: C.text }}>{t("yourQuote")}</p>
          <button onClick={onClose}><X size={18} color={C.textDim} /></button>
        </div>
        <p className="mb-4 text-[13px]" style={{ color: C.textDim }}>
          {vehicleLabel} · {parcelLabel} — {form.pickup} {t("toWord")} {form.dropoff}
        </p>
        <div className="space-y-2 p-3" style={{ backgroundColor: C.raised, borderRadius: RADIUS.card }}>
          <div className="flex justify-between text-[14px]">
            <span style={{ color: C.textDim }}>{baseFareLabel}</span>
            <span style={{ color: C.text }}>{money(pricing.base)}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span style={{ color: C.textDim }}>{distance} {t("milesAt")} £{pricing.perMile.toFixed(2)}</span>
            <span style={{ color: C.text }}>£{mileage.toFixed(2)}</span>
          </div>
          <div className="h-px" style={{ backgroundColor: C.hairline }} />
          <div className="flex justify-between text-[17px] font-bold">
            <span style={{ color: C.text }}>{t("total")}</span>
            <span style={{ color: C.signal }}>{money(total)}</span>
          </div>
        </div>
        <button onClick={() => onConfirm(total)} className="mt-5 flex w-full items-center justify-center gap-2 py-3.5 text-[15px] font-bold" style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: RADIUS.control }}>
          {form.payment === "cash" ? t("confirmOrder") : t("confirmPay")}
        </button>
      </div>
    </div>
  );
}

const NEARBY_DRIVERS = [
  { name: "James Mitchell", vehicle: "car", initials: "JM" },
  { name: "Sophie Clarke", vehicle: "small_van", initials: "SC" },
  { name: "Ahmed Hassan", vehicle: "large_van", initials: "AH" },
];

// Generic helper: given progress 0..1, returns {x, y} along a polyline path.
function pointAlongPath(points, progress) {
  const segLengths = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segLengths.push(len);
    total += len;
  }
  let dist = Math.max(0, Math.min(progress, 1)) * total;
  for (let i = 0; i < segLengths.length; i++) {
    if (dist <= segLengths[i] || i === segLengths.length - 1) {
      const t = segLengths[i] === 0 ? 0 : dist / segLengths[i];
      return {
        x: points[i][0] + (points[i + 1][0] - points[i][0]) * t,
        y: points[i][1] + (points[i + 1][1] - points[i][1]) * t,
      };
    }
    dist -= segLengths[i];
  }
  return { x: points[points.length - 1][0], y: points[points.length - 1][1] };
}

function MatchingScreen({ order, onMatched, onCancel }) {
  const { C, t } = useApp();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const poll = setInterval(async () => {
      const status = await getOrderStatus(order.id);
      if (cancelled) return;
      if (status?.status === "accepted" && status.driver) {
        clearInterval(poll);
        onMatched(status.driver);
      }
    }, 2500);
    const timeout = setTimeout(() => {
      if (!cancelled) setTimedOut(true);
    }, 60000);
    return () => {
      cancelled = true;
      clearInterval(poll);
      clearTimeout(timeout);
    };
  }, [order.id, onMatched]);

  if (timedOut) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 20 }}>
          <Package size={26} color={C.textFaint} />
        </div>
        <p className="text-[16px] font-bold" style={{ color: C.text }}>{t("noDriversNearby")}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{t("noDriversNearbyHint")}</p>
        <button onClick={onCancel} className="mt-6 w-full py-3.5 text-[15px] font-bold" style={{ backgroundColor: C.accent, color: C.onAccent, borderRadius: RADIUS.control }}>
          {t("backToBooking")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="mb-5 flex h-16 w-16 animate-pulse items-center justify-center" style={{ backgroundColor: C.surface, borderRadius: 20 }}>
        <Truck size={28} color={C.accent} />
      </div>
      <p className="text-[17px] font-bold" style={{ color: C.text }}>{t("findingDriver")}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: C.textDim }}>{t("findingDriverHint")}</p>
    </div>
  );
}

const TRACK_PATH_POINTS = [[30, 210], [150, 90], [300, 90], [370, 30]];

function CustomerTrackScreen({ order, onDone, onBack }) {
  const { C, t } = useApp();
  const [deliveryStage, setDeliveryStage] = useState("assigned"); // assigned | picked_up | delivered
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      const status = await getOrderStatus(order.id);
      if (cancelled || !status) return;
      if (status.deliveryStage) setDeliveryStage(status.deliveryStage);
      if (status.driverLocation) setDriverLocation(status.driverLocation);
    };
    poll();
    const interval = setInterval(poll, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [order.id]);

  const stages = [
    t("stageConfirmed"),
    t("stageAssigned"),
    t("stageHeadingToPickup"),
    t("stagePickedUp"),
    t("stageOnWay"),
    t("stageDelivered"),
  ];
  const stageIndexMap = { assigned: 2, picked_up: 4, delivered: 5 };
  const stage = stageIndexMap[deliveryStage] ?? 2;
  const progress = stage / (stages.length - 1);
  const dot = pointAlongPath(TRACK_PATH_POINTS, progress);

  const targetCoords = deliveryStage === "delivered" ? null : deliveryStage === "picked_up" ? order.dropoffCoords : order.pickupCoords;
  const liveDistance = driverLocation && targetCoords ? milesBetween(driverLocation, targetCoords) : null;
  const mapUrl = order.pickupCoords
    ? staticMapUrl({ pickup: order.pickupCoords, dropoff: order.dropoffCoords, driver: driverLocation })
    : null;

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-64 shrink-0" style={{ backgroundColor: C.raised }}>
        <FloatingBackButton onBack={onBack} />
        {mapUrl ? (
          <>
            <img src={mapUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0) 40%)" }} />
          </>
        ) : (
          <svg width="100%" height="100%" viewBox="0 0 400 250" className="absolute inset-0">
            <path d="M30 210 L150 90 L300 90 L370 30" fill="none" stroke={C.hairline} strokeWidth="16" strokeLinecap="round" />
            <circle cx="30" cy="210" r="6" fill={C.signal} />
            <circle cx={dot.x} cy={dot.y} r="7" fill={C.accent} />
          </svg>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center px-5">
        <p className="text-[13px]" style={{ color: C.textDim }}>{t("job")} {order.id}</p>
        <p className="mt-0.5 text-[19px] font-bold" style={{ color: C.text }}>{stages[stage]}</p>
        {liveDistance !== null && isFinite(liveDistance) && (
          <p className="mt-0.5 text-[13px]" style={{ color: C.signal }}>{liveDistance.toFixed(1)} {t("milesAwaySuffix")}</p>
        )}

        {order.driver && (
          <div className="mt-3 flex items-center gap-3 p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
            <img src={avatarUrl(order.driver.name)} alt="" className="h-11 w-11 shrink-0 object-cover" style={{ borderRadius: 12 }} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold" style={{ color: C.text }}>{order.driver.name}</p>
              <p className="text-[12px]" style={{ color: C.textDim }}>{vehicleTypeLabel(t, order.driver.vehicle)}</p>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          {stages.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <CheckCircle2 size={16} color={i <= stage ? C.signal : C.hairline} />
              <span className="text-[14px]" style={{ color: i <= stage ? C.text : C.textFaint }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5">
        {deliveryStage === "delivered" ? (
          <button onClick={onDone} className="w-full py-3.5 text-[15px] font-bold" style={{ backgroundColor: C.signal, color: C.onSignal, borderRadius: RADIUS.control }}>
            {t("bookAnother")}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3.5">
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: C.signal }} />
            <span className="text-[13px] font-medium" style={{ color: C.textDim }}>{t("liveTracking")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomerHistoryScreen({ orders, onBack }) {
  const { C, t } = useApp();
  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader title={t("yourDeliveries")} onBack={onBack} />
      <div className="px-5">
        {orders.length === 0 && <p className="mt-8 text-center text-[13px]" style={{ color: C.textFaint }}>{t("noPastDeliveries")}</p>}
        {orders.map((o) => (
          <div key={o.id} className="mb-2 p-3" style={{ backgroundColor: C.surface, borderRadius: RADIUS.card }}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold" style={{ color: C.text }}>{o.id}</span>
              <span className="text-[14px] font-bold" style={{ color: C.signal }}>{money(o.total)}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[13px]" style={{ color: C.textDim }}>
              <MapPin size={12} /> {o.form.pickup} {t("toWord")} {o.form.dropoff}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerExperience({ user, onLogout }) {
  const { t } = useApp();
  const [tab, setTab] = useState("book");
  const [form, setForm] = useState({ pickup: "", dropoff: "", vehicle: "car", parcel: "small", payment: "card" });
  const [showFare, setShowFare] = useState(false);
  const [matching, setMatching] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(2201);
  const [suspended, setSuspended] = useState(null); // "hold" | "disabled" | null
  const [showHelp, setShowHelp] = useState(false);

  const distance = form.pickup && form.dropoff ? estimateDistance(form.pickup, form.dropoff) : 0;

  // Catch a hold/disable applied by admin while the customer is mid-session.
  useEffect(() => {
    if (!user?.phone) return;
    let cancelled = false;
    const poll = async () => {
      const registry = await getCustomerAccount(user.phone);
      if (cancelled || !registry) return;
      if (registry.status === "hold" || registry.status === "disabled") setSuspended(registry.status);
    };
    poll();
    const interval = setInterval(poll, 8000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user?.phone]);

  const handleConfirm = async (total) => {
    const id = `ORD-${counter}`;
    setCounter((c) => c + 1);
    const orderDraft = {
      id,
      pickup: form.pickup,
      dropoff: form.dropoff,
      pickupCoords: form.pickupCoords || null,
      dropoffCoords: form.dropoffCoords || null,
      vehicle: form.vehicle,
      parcel: form.parcel,
      payment: form.payment,
      total,
      distance,
      customerName: user?.name || "Guest",
      customerPhone: user?.phone || null,
      customerEmail: user?.email || null,
      createdAt: Date.now(),
    };
    setPendingOrder(orderDraft);
    setMatching(true);
    setShowFare(false);
    await broadcastOrder(orderDraft);
  };
  const handleMatched = (driver) => {
    const order = { ...pendingOrder, form: { ...form }, driver };
    setOrders((prev) => [order, ...prev]);
    setActiveOrder(order);
    setMatching(false);
    setPendingOrder(null);
  };
  const handleCancelMatching = () => {
    setMatching(false);
    setPendingOrder(null);
  };
  const handleDone = () => {
    setActiveOrder(null);
    setForm({ pickup: "", dropoff: "", vehicle: "car", parcel: "small", payment: "card" });
    setTab("book");
  };

  const displayName = user?.name || "Rebecca Hughes";
  const contactRows = user
    ? [
        [t("phoneLabel"), user.phone || "—"],
        [t("emailLabel"), user.email || "—"],
      ]
    : undefined;

  if (suspended) {
    return (
      <PhoneFrame>
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center" style={{ backgroundColor: "rgba(255,107,107,0.12)", borderRadius: 20 }}>
            <ShieldOff size={28} color="#FF6B6B" />
          </div>
          <p className="text-[17px] font-bold" style={{ color: "#F4F6F8" }}>
            {suspended === "hold" ? t("accountOnHoldTitle") : t("accountDisabledTitle")}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "#8C99A8" }}>
            {suspended === "hold" ? t("accountOnHoldHint") : t("accountDisabledHint")}
          </p>
          <button onClick={onLogout} className="mt-8 text-[13px] font-semibold" style={{ color: "#FF6B6B" }}>
            {t("logOut")}
          </button>
        </div>
      </PhoneFrame>
    );
  }

  if (matching) {
    return (
      <PhoneFrame>
        <MatchingScreen order={pendingOrder} onMatched={handleMatched} onCancel={handleCancelMatching} />
      </PhoneFrame>
    );
  }

  if (activeOrder) {
    return (
      <PhoneFrame>
        <CustomerTrackScreen order={activeOrder} onDone={handleDone} onBack={handleDone} />
      </PhoneFrame>
    );
  }

  if (showHelp) {
    return (
      <PhoneFrame>
        <HelpScreen user={user} role="customer" onBack={() => setShowHelp(false)} />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      {tab === "book" && <CustomerBookScreen form={form} setForm={setForm} onGetQuote={() => setShowFare(true)} />}
      {tab === "history" && <CustomerHistoryScreen orders={orders} onBack={() => setTab("book")} />}
      {tab === "profile" && (
        <ProfileScreen
          name={displayName}
          initials={initialsFrom(displayName)}
          avatarSeed={user?.phone || displayName}
          subtitle={t("customerLondon")}
          contactRows={contactRows}
          rows={[
            [t("savedAddresses"), ""],
            [t("paymentMethods"), ""],
            [t("notifications"), ""],
          ]}
          onLogout={onLogout}
          onBack={() => setTab("book")}
          onOpenHelp={() => setShowHelp(true)}
        />
      )}
      <BottomNav
        tab={tab}
        setTab={setTab}
        items={[
          { key: "book", icon: Home, label: t("navBook") },
          { key: "history", icon: Receipt, label: t("navHistory") },
          { key: "profile", icon: User, label: t("navProfile") },
        ]}
      />
      {showFare && <FareSheet form={form} distance={distance} onClose={() => setShowFare(false)} onConfirm={handleConfirm} />}
    </PhoneFrame>
  );
}

/* ============================================================
   ROOT
============================================================ */
/* ============================================================
   ADMIN PANEL — desktop-style layout (not phone-frame), since
   this is an internal staff tool rather than a rider/driver app.
============================================================ */
const ADMIN_BG = "#0B0F14";
const ADMIN_SURFACE = "#151B23";
const ADMIN_RAISED = "#1C242E";
const ADMIN_BORDER = "#26303B";
const ADMIN_TEXT = "#F4F6F8";
const ADMIN_DIM = "#8C99A8";
const ADMIN_ACCENT = "#FF9900";
const ADMIN_SIGNAL = "#00A8E8";
const ADMIN_DANGER = "#FF6B6B";
const ADMIN_WARNING = "#FFC107";
const ADMIN_VEHICLE_LABELS = { car: "Car", small_van: "Small van", large_van: "Large van", recovery: "Recovery" };

function AdminStatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold" style={{ color: ADMIN_DIM }}>{label}</span>
        <Icon size={16} color={color} />
      </div>
      <p className="mt-2 text-2xl font-bold" style={{ color: ADMIN_TEXT }}>{value}</p>
      {sub && <p className="mt-1 text-[12px]" style={{ color: ADMIN_DIM }}>{sub}</p>}
    </div>
  );
}

function AdminSidebar({ view, setView, pendingCount, openMessagesCount, onLogout }) {
  const items = [
    { key: "overview", icon: LayoutDashboard, label: "Overview" },
    { key: "approvals", icon: FileCheck2, label: "Driver Approvals", badge: pendingCount },
    { key: "customers", icon: Users, label: "Customers" },
    { key: "orders", icon: Package, label: "Orders" },
    { key: "messages", icon: LifeBuoy, label: "Support Messages", badge: openMessagesCount },
    { key: "roles", icon: Shield, label: "Roles & Permissions" },
  ];
  return (
    <div className="flex w-60 flex-shrink-0 flex-col py-5" style={{ backgroundColor: ADMIN_BG, borderRight: `1px solid ${ADMIN_BORDER}` }}>
      <div className="flex items-center gap-2 px-5 pb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold" style={{ backgroundColor: ADMIN_ACCENT, color: "#1A1200" }}>UK</div>
        <span className="text-sm font-bold" style={{ color: ADMIN_TEXT }}>Parcel Flex Admin</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3">
        {items.map(({ key, icon: Icon, label, badge }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold"
            style={{ backgroundColor: view === key ? "rgba(255,153,0,0.12)" : "transparent", color: view === key ? ADMIN_ACCENT : ADMIN_DIM }}
          >
            <Icon size={17} />
            {label}
            {!!badge && (
              <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold" style={{ backgroundColor: ADMIN_ACCENT, color: "#1A1200" }}>
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="px-3 pt-4">
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold" style={{ color: ADMIN_DANGER }}>
          <LogOut size={17} /> Log out
        </button>
      </div>
    </div>
  );
}

function AdminOverview({ applications, orders, customers }) {
  const pending = applications.filter((a) => a.status === "pending");
  const approved = applications.filter((a) => a.status === "approved");
  const revenue = orders.filter((o) => o.status === "accepted").reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-5 gap-4">
        <AdminStatCard icon={Package} label="Total orders" value={orders.length} sub="tracked in this session" color={ADMIN_SIGNAL} />
        <AdminStatCard icon={Users} label="Registered customers" value={customers.length} color={ADMIN_ACCENT} />
        <AdminStatCard icon={FileCheck2} label="Pending approvals" value={pending.length} sub="driver applications" color={ADMIN_WARNING} />
        <AdminStatCard icon={Car} label="Approved drivers" value={approved.length} color={ADMIN_ACCENT} />
        <AdminStatCard icon={Wallet} label="Order value" value={money(revenue)} sub="matched orders" color={ADMIN_SIGNAL} />
      </div>

      <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}>
        <p className="mb-3 text-sm font-bold" style={{ color: ADMIN_TEXT }}>Recent orders</p>
        {orders.slice(0, 6).map((o) => (
          <div key={o.id} className="flex items-center justify-between border-b py-2.5 last:border-0" style={{ borderColor: ADMIN_BORDER }}>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{o.id}</p>
              <p className="text-[12px]" style={{ color: ADMIN_DIM }}>{o.pickup} → {o.dropoff}</p>
            </div>
            <span className="text-[12px] font-semibold" style={{ color: o.status === "accepted" ? ADMIN_SIGNAL : ADMIN_WARNING }}>{o.status}</span>
          </div>
        ))}
        {orders.length === 0 && <p className="text-[13px]" style={{ color: ADMIN_DIM }}>No orders yet.</p>}
      </div>
    </div>
  );
}

function AdminApprovalToggle({ approved, onChange }) {
  return (
    <button
      onClick={onChange}
      className="relative flex h-7 w-12 items-center rounded-full px-0.5"
      style={{ backgroundColor: approved ? ADMIN_SIGNAL : ADMIN_RAISED }}
    >
      <span
        className="h-6 w-6 rounded-full bg-white transition-all"
        style={{ transform: approved ? "translateX(20px)" : "translateX(0px)" }}
      />
    </button>
  );
}

function AdminPhotoModal({ label, photo, loading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl"
        style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${ADMIN_BORDER}` }}>
          <p className="text-sm font-bold" style={{ color: ADMIN_TEXT }}>{label}</p>
          <button onClick={onClose}><XCircle size={18} color={ADMIN_DIM} /></button>
        </div>
        <div className="flex items-center justify-center p-4" style={{ backgroundColor: "#000", minHeight: 240 }}>
          {loading ? (
            <p className="text-[13px]" style={{ color: ADMIN_DIM }}>Loading…</p>
          ) : photo ? (
            <img src={photo} alt={label} className="max-h-[60vh] w-full object-contain" />
          ) : (
            <p className="text-[13px]" style={{ color: ADMIN_DIM }}>No image available.</p>
          )}
        </div>
        {photo && !loading && (
          <div className="p-4">
            <a
              href={photo}
              download={`${label.replace(/\s+/g, "-").toLowerCase()}.jpg`}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold"
              style={{ backgroundColor: ADMIN_ACCENT, color: "#1A1200" }}
            >
              <Download size={15} /> Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminAdjustBalanceModal({ driver, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState("add"); // "add" | "deduct"
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);

  const parsed = parseFloat(amount);
  const canSend = !isNaN(parsed) && parsed > 0 && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    const signedAmount = direction === "add" ? Math.abs(parsed) : -Math.abs(parsed);
    await onSubmit(signedAmount, reason.trim());
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-xl p-5" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: ADMIN_TEXT }}>Adjust balance</p>
            <p className="text-[12px]" style={{ color: ADMIN_DIM }}>{driver.name} · current: {money(driver.walletBalance || 0)}</p>
          </div>
          <button onClick={onClose}><XCircle size={18} color={ADMIN_DIM} /></button>
        </div>

        <div className="mb-3 flex gap-1.5 rounded-lg p-1" style={{ backgroundColor: ADMIN_RAISED }}>
          <button
            onClick={() => setDirection("add")}
            className="flex-1 rounded-md py-2 text-[12px] font-bold"
            style={{ backgroundColor: direction === "add" ? ADMIN_SIGNAL : "transparent", color: direction === "add" ? "#04222E" : ADMIN_DIM }}
          >
            + Add
          </button>
          <button
            onClick={() => setDirection("deduct")}
            className="flex-1 rounded-md py-2 text-[12px] font-bold"
            style={{ backgroundColor: direction === "deduct" ? ADMIN_DANGER : "transparent", color: direction === "deduct" ? "#2A0000" : ADMIN_DIM }}
          >
            − Deduct
          </button>
        </div>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (£)"
          inputMode="decimal"
          className="mb-3 w-full rounded-lg px-3 py-2.5 text-[13px] outline-none"
          style={{ backgroundColor: ADMIN_RAISED, color: ADMIN_TEXT, border: `1px solid ${ADMIN_BORDER}` }}
        />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (shown to the driver)"
          rows={3}
          className="mb-4 w-full resize-none rounded-lg px-3 py-2.5 text-[13px] outline-none"
          style={{ backgroundColor: ADMIN_RAISED, color: ADMIN_TEXT, border: `1px solid ${ADMIN_BORDER}` }}
        />

        <p className="mb-3 text-[11px]" style={{ color: ADMIN_DIM }}>
          This won't apply immediately — the driver gets an automatic notice and must accept it first.
        </p>

        <button
          disabled={!canSend}
          onClick={handleSend}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[13px] font-bold"
          style={{ backgroundColor: canSend ? ADMIN_ACCENT : ADMIN_RAISED, color: canSend ? "#1A1200" : ADMIN_DIM }}
        >
          {sending ? "Sending…" : "Send request to driver"}
        </button>
      </div>
    </div>
  );
}

function AdminApprovals({ applications, searchQuery, onToggleApproval, onSendAdjustment }) {
  const query = (searchQuery || "").trim().toLowerCase();
  const matches = (a) =>
    !query ||
    [a.name, a.phone, a.email, a.vehiclePlate, ADMIN_VEHICLE_LABELS[a.vehicleType] || a.vehicleType]
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(query));

  const sorted = [...applications].sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
  // When searching, matching drivers are surfaced to the top of the list.
  const ordered = query ? [...sorted].sort((a, b) => Number(matches(b)) - Number(matches(a))) : sorted;
  const visibleMatchCount = query ? sorted.filter(matches).length : null;
  const pendingCount = applications.filter((a) => a.status !== "approved").length;
  const [viewing, setViewing] = useState(null); // { phone, field, label } | null
  const [photos, setPhotos] = useState({}); // phone -> { vehiclePhoto, driverPhoto, idDocument }
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [adjusting, setAdjusting] = useState(null); // driver record | null

  const handleViewDocument = async (app, field, label) => {
    setViewing({ phone: app.phone, field, label });
    if (!photos[app.phone]) {
      setLoadingPhotos(true);
      const result = await getDriverPhotos(app.phone);
      setPhotos((prev) => ({ ...prev, [app.phone]: result || {} }));
      setLoadingPhotos(false);
    }
  };

  const activePhoto = viewing ? photos[viewing.phone]?.[viewing.field] : null;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <p className="mb-4 text-[13px] font-semibold" style={{ color: ADMIN_DIM }}>
        {query ? `${visibleMatchCount} match${visibleMatchCount === 1 ? "" : "es"} for "${searchQuery}"` : `${pendingCount} awaiting approval`}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {ordered.map((a) => {
          const approved = a.status === "approved";
          const isMatch = query && matches(a);
          return (
            <div
              key={a.phone}
              className="rounded-xl p-4"
              style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${isMatch ? ADMIN_ACCENT : ADMIN_BORDER}`, opacity: query && !isMatch ? 0.4 : 1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold" style={{ color: ADMIN_TEXT }}>{a.name}</p>
                  <p className="text-[12px]" style={{ color: ADMIN_DIM }}>{a.phone} · {a.email}</p>
                </div>
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-semibold"
                  style={{ backgroundColor: approved ? "rgba(0,168,232,0.15)" : "rgba(255,193,7,0.15)", color: approved ? ADMIN_SIGNAL : ADMIN_WARNING }}
                >
                  {approved ? "APPROVED" : "PENDING"}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[12px]" style={{ color: ADMIN_DIM }}>
                <Car size={13} /> {ADMIN_VEHICLE_LABELS[a.vehicleType] || a.vehicleType}
                {a.vehiclePlate && <span>· {a.vehiclePlate}</span>}
              </div>
              <div className="mt-2 flex gap-2">
                {[
                  ["vehiclePhoto", "Vehicle photo", a.hasVehiclePhoto],
                  ["driverPhoto", "Driver photo", a.hasDriverPhoto],
                  ["idDocument", "ID document", a.hasIdDocument],
                ].map(([field, label, ok]) => (
                  <button
                    key={field}
                    onClick={() => ok && handleViewDocument(a, field, label)}
                    disabled={!ok}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px]"
                    style={{ backgroundColor: ADMIN_RAISED, color: ok ? ADMIN_SIGNAL : ADMIN_DIM, cursor: ok ? "pointer" : "default" }}
                  >
                    {ok ? <Eye size={11} /> : <Clock size={11} />}
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
                <div className="flex items-center gap-1.5">
                  <Wallet size={13} color={ADMIN_SIGNAL} />
                  <span className="text-[12px]" style={{ color: ADMIN_DIM }}>Earnings</span>
                </div>
                <span className="text-[14px] font-bold" style={{ color: ADMIN_SIGNAL }}>{money(a.walletBalance || 0)}</span>
              </div>

              <button
                onClick={() => setAdjusting(a)}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-bold"
                style={{ backgroundColor: ADMIN_RAISED, color: ADMIN_ACCENT }}
              >
                <Wallet size={13} /> Adjust balance
              </button>

              <div className="mt-2 flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
                <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>Approved</span>
                <AdminApprovalToggle approved={approved} onChange={() => onToggleApproval(a)} />
              </div>
            </div>
          );
        })}
        {ordered.length === 0 && (
          <p className="col-span-2 mt-6 text-center text-[13px]" style={{ color: ADMIN_DIM }}>No driver applications yet.</p>
        )}
      </div>

      {viewing && (
        <AdminPhotoModal label={viewing.label} photo={activePhoto} loading={loadingPhotos} onClose={() => setViewing(null)} />
      )}
      {adjusting && (
        <AdminAdjustBalanceModal
          driver={adjusting}
          onClose={() => setAdjusting(null)}
          onSubmit={async (amount, reason) => {
            await onSendAdjustment(adjusting, amount, reason);
            setAdjusting(null);
          }}
        />
      )}
    </div>
  );
}

function AdminCustomerStatusControl({ status, onChange }) {
  const options = [
    { key: "active", label: "Active", color: ADMIN_SIGNAL },
    { key: "hold", label: "Hold", color: ADMIN_WARNING },
    { key: "disabled", label: "Disabled", color: ADMIN_DANGER },
  ];
  return (
    <div className="flex gap-1.5">
      {options.map((o) => {
        const active = (status || "active") === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className="rounded-md px-2.5 py-1.5 text-[11px] font-bold"
            style={{ backgroundColor: active ? `${o.color}22` : ADMIN_RAISED, color: active ? o.color : ADMIN_DIM, border: `1px solid ${active ? o.color : "transparent"}` }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function AdminCustomerDetailModal({ customer, onClose, onChangeStatus }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-xl p-5" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: ADMIN_TEXT }}>{customer.name}</p>
            <p className="text-[12px]" style={{ color: ADMIN_DIM }}>Joined {new Date(customer.joinedAt || Date.now()).toLocaleDateString()}</p>
          </div>
          <button onClick={onClose}><XCircle size={18} color={ADMIN_DIM} /></button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
            <span className="text-[12px]" style={{ color: ADMIN_DIM }}>Phone</span>
            <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{customer.phone}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
            <span className="text-[12px]" style={{ color: ADMIN_DIM }}>Email</span>
            <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{customer.email}</span>
          </div>
        </div>
        <p className="mb-2 mt-4 text-[12px] font-semibold" style={{ color: ADMIN_DIM }}>Account status</p>
        <AdminCustomerStatusControl status={customer.status} onChange={(status) => onChangeStatus(customer, status)} />
      </div>
    </div>
  );
}

function AdminCustomers({ customers, onChangeStatus }) {
  const [viewing, setViewing] = useState(null);
  const sorted = [...customers].sort((a, b) => (b.joinedAt || 0) - (a.joinedAt || 0));

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <p className="mb-4 text-[13px] font-semibold" style={{ color: ADMIN_DIM }}>{customers.length} registered customers</p>
      <div className="rounded-xl" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}>
        <div className="grid grid-cols-5 gap-2 px-4 py-3 text-[11px] font-semibold" style={{ color: ADMIN_DIM, borderBottom: `1px solid ${ADMIN_BORDER}` }}>
          <span className="col-span-2">CUSTOMER</span>
          <span>PHONE</span>
          <span>STATUS</span>
          <span></span>
        </div>
        {sorted.map((c) => (
          <div key={c.phone} className="grid grid-cols-5 items-center gap-2 px-4 py-3 text-[13px]" style={{ borderBottom: `1px solid ${ADMIN_BORDER}` }}>
            <span className="col-span-2 truncate" style={{ color: ADMIN_TEXT }}>{c.name}</span>
            <span style={{ color: ADMIN_DIM }}>{c.phone}</span>
            <span
              className="w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold"
              style={{
                backgroundColor: c.status === "disabled" ? "rgba(255,107,107,0.15)" : c.status === "hold" ? "rgba(255,193,7,0.15)" : "rgba(0,168,232,0.15)",
                color: c.status === "disabled" ? ADMIN_DANGER : c.status === "hold" ? ADMIN_WARNING : ADMIN_SIGNAL,
              }}
            >
              {(c.status || "active").toUpperCase()}
            </span>
            <button onClick={() => setViewing(c)} className="flex w-fit items-center gap-1 text-[12px] font-semibold" style={{ color: ADMIN_ACCENT }}>
              <Eye size={13} /> Review
            </button>
          </div>
        ))}
        {sorted.length === 0 && <p className="p-4 text-[13px]" style={{ color: ADMIN_DIM }}>No customers have registered yet.</p>}
      </div>

      {viewing && (
        <AdminCustomerDetailModal
          customer={viewing}
          onClose={() => setViewing(null)}
          onChangeStatus={(customer, status) => {
            onChangeStatus(customer, status);
            setViewing((v) => (v ? { ...v, status } : v));
          }}
        />
      )}
    </div>
  );
}

function AdminMessageDetailModal({ msg, onClose, onResolve }) {
  const resolved = msg.status === "resolved";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-xl p-5" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: ADMIN_TEXT }}>{msg.fromName}</p>
            <p className="text-[12px]" style={{ color: ADMIN_DIM }}>
              {msg.role === "driver" ? "Driver" : "Customer"} · {new Date(msg.createdAt || Date.now()).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose}><XCircle size={18} color={ADMIN_DIM} /></button>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
            <span className="text-[12px]" style={{ color: ADMIN_DIM }}>Phone</span>
            <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{msg.fromPhone || "—"}</span>
          </div>
          {msg.fromEmail && (
            <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
              <span className="text-[12px]" style={{ color: ADMIN_DIM }}>Email</span>
              <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{msg.fromEmail}</span>
            </div>
          )}
        </div>

        <p className="mb-2 text-[12px] font-semibold" style={{ color: ADMIN_DIM }}>MESSAGE</p>
        <div className="mb-4 rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
          <p className="whitespace-pre-wrap text-[13px]" style={{ color: ADMIN_TEXT }}>{msg.message}</p>
        </div>

        <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
          <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>Resolved</span>
          <AdminApprovalToggle approved={resolved} onChange={() => onResolve(msg)} />
        </div>
      </div>
    </div>
  );
}

function AdminMessages({ messages, onResolve }) {
  const [viewing, setViewing] = useState(null);
  const [roleFilter, setRoleFilter] = useState("driver"); // "driver" | "customer"
  const filtered = messages.filter((m) => m.role === roleFilter);
  const sorted = [...filtered].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const driverOpenCount = messages.filter((m) => m.role === "driver" && m.status !== "resolved").length;
  const customerOpenCount = messages.filter((m) => m.role === "customer" && m.status !== "resolved").length;
  const openCount = roleFilter === "driver" ? driverOpenCount : customerOpenCount;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-4 flex gap-1 rounded-lg p-1" style={{ backgroundColor: ADMIN_SURFACE, width: "fit-content" }}>
        <button
          onClick={() => setRoleFilter("driver")}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-semibold"
          style={{ backgroundColor: roleFilter === "driver" ? ADMIN_ACCENT : "transparent", color: roleFilter === "driver" ? "#1A1200" : ADMIN_DIM }}
        >
          Drivers
          {driverOpenCount > 0 && (
            <span
              className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
              style={{ backgroundColor: roleFilter === "driver" ? "#1A1200" : ADMIN_RAISED, color: roleFilter === "driver" ? ADMIN_ACCENT : ADMIN_WARNING }}
            >
              {driverOpenCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setRoleFilter("customer")}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-semibold"
          style={{ backgroundColor: roleFilter === "customer" ? ADMIN_ACCENT : "transparent", color: roleFilter === "customer" ? "#1A1200" : ADMIN_DIM }}
        >
          Customers
          {customerOpenCount > 0 && (
            <span
              className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
              style={{ backgroundColor: roleFilter === "customer" ? "#1A1200" : ADMIN_RAISED, color: roleFilter === "customer" ? ADMIN_ACCENT : ADMIN_WARNING }}
            >
              {customerOpenCount}
            </span>
          )}
        </button>
      </div>

      <p className="mb-4 text-[13px] font-semibold" style={{ color: ADMIN_DIM }}>{openCount} open</p>
      <div className="rounded-xl" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}>
        {sorted.map((m) => {
          const resolved = m.status === "resolved";
          return (
            <button
              key={m.id}
              onClick={() => setViewing(m)}
              className="flex w-full items-start justify-between gap-3 border-b p-4 text-left last:border-0"
              style={{ borderColor: ADMIN_BORDER }}
            >
              <div className="flex min-w-0 items-start gap-3">
                <img src={avatarUrl(m.fromPhone || m.fromName)} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{m.fromName}</p>
                    <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: ADMIN_RAISED, color: ADMIN_DIM }}>
                      {m.role === "driver" ? "DRIVER" : "CUSTOMER"}
                    </span>
                  </div>
                  <p className="mt-0.5 max-w-md truncate text-[12px]" style={{ color: ADMIN_DIM }}>{m.message}</p>
                </div>
              </div>
              <span
                className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold"
                style={{ backgroundColor: resolved ? "rgba(0,168,232,0.15)" : "rgba(255,193,7,0.15)", color: resolved ? ADMIN_SIGNAL : ADMIN_WARNING }}
              >
                {resolved ? "RESOLVED" : "OPEN"}
              </span>
            </button>
          );
        })}
        {sorted.length === 0 && <p className="p-4 text-[13px]" style={{ color: ADMIN_DIM }}>No support messages yet.</p>}
      </div>

      {viewing && (
        <AdminMessageDetailModal
          msg={viewing}
          onClose={() => setViewing(null)}
          onResolve={(msg) => {
            onResolve(msg);
            setViewing((v) => (v ? { ...v, status: v.status === "resolved" ? "open" : "resolved" } : v));
          }}
        />
      )}
    </div>
  );
}

function AdminOrderDetailModal({ order, onClose, onApprove }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-xl p-5" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: ADMIN_TEXT }}>{order.id}</p>
            <p className="text-[12px]" style={{ color: ADMIN_DIM }}>{new Date(order.createdAt || Date.now()).toLocaleString()}</p>
          </div>
          <button onClick={onClose}><XCircle size={18} color={ADMIN_DIM} /></button>
        </div>

        <p className="mb-2 text-[12px] font-semibold" style={{ color: ADMIN_DIM }}>ROUTE</p>
        <div className="mb-4 rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
          <p className="text-[13px]" style={{ color: ADMIN_TEXT }}>{order.pickup}</p>
          <p className="mt-1 text-[13px]" style={{ color: ADMIN_TEXT }}>→ {order.dropoff}</p>
          <p className="mt-2 text-[12px]" style={{ color: ADMIN_DIM }}>
            {ADMIN_VEHICLE_LABELS[order.vehicle] || order.vehicle} · {order.distance} mi · {money(order.total || 0)} · {order.payment === "cash" ? "Cash" : "Card"}
          </p>
        </div>

        <p className="mb-2 text-[12px] font-semibold" style={{ color: ADMIN_DIM }}>CUSTOMER</p>
        <div className="mb-4 flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
          <img src={avatarUrl(order.customerPhone || order.customerName)} alt="" className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <p className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{order.customerName || "Guest"}</p>
            <p className="text-[12px]" style={{ color: ADMIN_DIM }}>{order.customerPhone || "—"} {order.customerEmail ? `· ${order.customerEmail}` : ""}</p>
          </div>
        </div>

        <p className="mb-2 text-[12px] font-semibold" style={{ color: ADMIN_DIM }}>DRIVER</p>
        {order.driver ? (
          <div className="mb-4 flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
            <img src={avatarUrl(order.driver.name)} alt="" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>{order.driver.name}</p>
              <p className="text-[12px]" style={{ color: ADMIN_DIM }}>{ADMIN_VEHICLE_LABELS[order.driver.vehicle] || order.driver.vehicle}</p>
            </div>
          </div>
        ) : (
          <div className="mb-4 rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
            <p className="text-[13px]" style={{ color: ADMIN_WARNING }}>No driver matched yet — order is {order.status}.</p>
          </div>
        )}

        <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: ADMIN_RAISED }}>
          <span className="text-[13px] font-semibold" style={{ color: ADMIN_TEXT }}>Approved by admin</span>
          <AdminApprovalToggle approved={order.adminApproved === true} onChange={() => onApprove(order)} />
        </div>
      </div>
    </div>
  );
}

function AdminOrders({ orders, onApproveOrder }) {
  const [viewing, setViewing] = useState(null);
  const sorted = [...orders].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="rounded-xl" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}>
        <div className="grid grid-cols-6 gap-2 px-4 py-3 text-[11px] font-semibold" style={{ color: ADMIN_DIM, borderBottom: `1px solid ${ADMIN_BORDER}` }}>
          <span>ORDER</span>
          <span>CUSTOMER</span>
          <span>DRIVER</span>
          <span>TOTAL</span>
          <span>STATUS</span>
          <span></span>
        </div>
        {sorted.map((o) => (
          <button
            key={o.id}
            onClick={() => setViewing(o)}
            className="grid w-full grid-cols-6 items-center gap-2 px-4 py-3 text-left text-[13px]"
            style={{ borderBottom: `1px solid ${ADMIN_BORDER}` }}
          >
            <span style={{ color: ADMIN_TEXT }}>{o.id}</span>
            <span className="truncate" style={{ color: ADMIN_TEXT }}>{o.customerName || "Guest"}</span>
            <span className="truncate" style={{ color: o.driver ? ADMIN_TEXT : ADMIN_DIM }}>{o.driver?.name || "Unassigned"}</span>
            <span style={{ color: ADMIN_TEXT }}>{money(o.total || 0)}</span>
            <span className="font-semibold" style={{ color: o.status === "accepted" ? ADMIN_SIGNAL : ADMIN_WARNING }}>{o.status}</span>
            <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: ADMIN_ACCENT }}>
              <Eye size={13} /> Review
            </span>
          </button>
        ))}
        {sorted.length === 0 && <p className="p-4 text-[13px]" style={{ color: ADMIN_DIM }}>No orders yet.</p>}
      </div>

      {viewing && (
        <AdminOrderDetailModal
          order={viewing}
          onClose={() => setViewing(null)}
          onApprove={(order) => {
            onApproveOrder(order);
            setViewing((v) => (v ? { ...v, adminApproved: !v.adminApproved } : v));
          }}
        />
      )}
    </div>
  );
}

function AdminRoles({ rolesConfig, onToggle, onAddRole }) {
  const [newRole, setNewRole] = useState("");
  const roleNames = Object.keys(rolesConfig);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="overflow-x-auto rounded-xl" style={{ backgroundColor: ADMIN_SURFACE, border: `1px solid ${ADMIN_BORDER}` }}>
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr style={{ borderBottom: `1px solid ${ADMIN_BORDER}` }}>
              <th className="p-3 font-semibold" style={{ color: ADMIN_DIM }}>Permission</th>
              {roleNames.map((r) => (
                <th key={r} className="p-3 text-center font-semibold" style={{ color: ADMIN_TEXT }}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((p) => (
              <tr key={p.key} style={{ borderBottom: `1px solid ${ADMIN_BORDER}` }}>
                <td className="p-3" style={{ color: ADMIN_TEXT }}>{p.label}</td>
                {roleNames.map((r) => (
                  <td key={r} className="p-3 text-center">
                    <button
                      onClick={() => onToggle(r, p.key)}
                      className="mx-auto flex h-6 w-6 items-center justify-center rounded-md"
                      style={{ backgroundColor: rolesConfig[r]?.[p.key] ? ADMIN_ACCENT : ADMIN_RAISED }}
                    >
                      {rolesConfig[r]?.[p.key] && <CheckCircle2 size={14} color="#1A1200" />}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="New role name (e.g. Dispatcher)"
          className="flex-1 rounded-lg px-3 py-2.5 text-[13px] outline-none"
          style={{ backgroundColor: ADMIN_SURFACE, color: ADMIN_TEXT, border: `1px solid ${ADMIN_BORDER}` }}
        />
        <button
          onClick={() => { if (newRole.trim()) { onAddRole(newRole.trim()); setNewRole(""); } }}
          className="rounded-lg px-4 py-2.5 text-[13px] font-bold"
          style={{ backgroundColor: ADMIN_ACCENT, color: "#1A1200" }}
        >
          Add role
        </button>
      </div>
    </div>
  );
}

function AdminExperience({ onLogout }) {
  const [view, setView] = useState("overview");
  const [applications, setApplications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [rolesConfig, setRolesConfig] = useState(DEFAULT_ROLES_CONFIG);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [apps, ords, roles, custs, msgs] = await Promise.all([fetchDriverApplications(), fetchAllOrders(), getRolesConfig(), fetchCustomerAccounts(), fetchSupportMessages()]);
      if (cancelled) return;
      setApplications(apps);
      setOrders(ords);
      setCustomers(custs);
      setMessages(msgs);
      if (roles) setRolesConfig(roles);
    };
    load();
    const interval = setInterval(load, 6000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const handleToggleApproval = async (app) => {
    const nextStatus = app.status === "approved" ? "pending" : "approved";
    await updateDriverApplication(app.phone, { status: nextStatus });
    setApplications((prev) => prev.map((a) => (a.phone === app.phone ? { ...a, status: nextStatus } : a)));
  };
  const handleSendAdjustment = async (driver, amount, reason) => {
    await submitWalletAdjustment({ driverPhone: driver.phone, driverName: driver.name, amount, reason });
  };
  const handleChangeCustomerStatus = async (customer, status) => {
    await updateCustomerAccount(customer.phone, { status });
    setCustomers((prev) => prev.map((c) => (c.phone === customer.phone ? { ...c, status } : c)));
  };
  const handleApproveOrder = async (order) => {
    const nextApproved = !order.adminApproved;
    await updateOrderFields(order.id, { adminApproved: nextApproved });
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, adminApproved: nextApproved } : o)));
  };
  const handleResolveMessage = async (msg) => {
    const nextStatus = msg.status === "resolved" ? "open" : "resolved";
    await updateSupportMessage(msg.id, { status: nextStatus });
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, status: nextStatus } : m)));
  };
  const handleTogglePermission = async (role, permKey) => {
    const updated = { ...rolesConfig, [role]: { ...rolesConfig[role], [permKey]: !rolesConfig[role]?.[permKey] } };
    setRolesConfig(updated);
    await saveRolesConfig(updated);
  };
  const handleAddRole = async (roleName) => {
    if (rolesConfig[roleName]) return;
    const blank = Object.fromEntries(PERMISSIONS.map((p) => [p.key, false]));
    const updated = { ...rolesConfig, [roleName]: blank };
    setRolesConfig(updated);
    await saveRolesConfig(updated);
  };

  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const openMessagesCount = messages.filter((m) => m.status !== "resolved").length;
  const titles = { overview: "Overview", approvals: "Driver Approvals", customers: "Customers", orders: "Orders", messages: "Support Messages", roles: "Roles & Permissions" };
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen w-full" style={{ backgroundColor: ADMIN_BG }}>
      <AdminSidebar view={view} setView={setView} pendingCount={pendingCount} openMessagesCount={openMessagesCount} onLogout={onLogout} />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${ADMIN_BORDER}` }}>
          <p className="text-lg font-bold" style={{ color: ADMIN_TEXT }}>{titles[view]}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: ADMIN_SURFACE }}>
              <Search size={14} color={ADMIN_DIM} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="w-40 bg-transparent text-[13px] outline-none"
                style={{ color: ADMIN_TEXT }}
              />
            </div>
            <Bell size={18} color={ADMIN_DIM} />
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold" style={{ backgroundColor: ADMIN_SURFACE, color: ADMIN_ACCENT }}>AD</div>
          </div>
        </div>
        {view === "overview" && <AdminOverview applications={applications} orders={orders} customers={customers} />}
        {view === "approvals" && (
          <AdminApprovals
            applications={applications}
            searchQuery={searchQuery}
            onToggleApproval={handleToggleApproval}
            onSendAdjustment={handleSendAdjustment}
          />
        )}
        {view === "orders" && <AdminOrders orders={orders} onApproveOrder={handleApproveOrder} />}
        {view === "customers" && <AdminCustomers customers={customers} onChangeStatus={handleChangeCustomerStatus} />}
        {view === "messages" && <AdminMessages messages={messages} onResolve={handleResolveMessage} />}
        {view === "roles" && <AdminRoles rolesConfig={rolesConfig} onToggle={handleTogglePermission} onAddRole={handleAddRole} />}
      </div>
    </div>
  );
}

function Root() {
  const [session, setSession] = useState(null); // { role, user } | null
  const { C } = useApp();

  const handleAuth = (role, profile) => {
    setSession({ role, user: profile });
  };

  if (session?.role === "admin") {
    return <AdminExperience onLogout={() => setSession(null)} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: C.ink }}>
      {!session ? (
        <PhoneFrame>
          <AuthScreen onAuth={handleAuth} />
        </PhoneFrame>
      ) : session.role === "driver" ? (
        <DriverExperience
          user={session.user}
          onLogout={() => setSession(null)}
          onUserUpdate={(updatedUser) => setSession((s) => ({ ...s, user: updatedUser }))}
        />
      ) : (
        <CustomerExperience user={session.user} onLogout={() => setSession(null)} />
      )}
    </div>
  );
}

export default function ParcelFlexApp() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
