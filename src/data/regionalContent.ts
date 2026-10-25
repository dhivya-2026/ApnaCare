// Regional language dictionary and localization infrastructure for ApnaCare
// South India-first support: English, Tamil, Telugu, Kannada, Malayalam

export type SupportedLanguage = "en" | "ta" | "te" | "kn" | "ml";

export interface LanguageInfo {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: "en", label: "English", nativeLabel: "English", region: "Pan-India" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", region: "Tamil Nadu" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", region: "Telangana & Andhra Pradesh" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", region: "Karnataka" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", region: "Kerala" },
];

export interface RegionalStrings {
  careCloserToHome: string;
  tagline: string;
  heroSupporting: string;
  requestConsultation: string;
  callCoordinator: string;
  policeVerified: string;
  nurseClarity: string;
  clusterBackup: string;
  dailyWhatsAppLogs: string;
  activeCitiesTitle: string;
  activeCities: string;
  transparentPricingNotice: string;
}

export const REGIONAL_STRINGS: Record<SupportedLanguage, RegionalStrings> = {
  en: {
    careCloserToHome: "Care that feels closer to home.",
    tagline: "Trusted Women Attendants & Nurses for South Indian Families",
    heroSupporting:
      "Support for your parents, children, and recovering loved ones — arranged with police-verified women attendants and licensed nurses across South India.",
    requestConsultation: "Request Care Consultation",
    callCoordinator: "Speak with Care Coordinator",
    policeVerified: "100% Police Verified & ID Cleared",
    nurseClarity: "Attendant vs. Licensed Nurse Clarity",
    clusterBackup: "Priority Cluster Standby Backup",
    dailyWhatsAppLogs: "Scheduled Daily WhatsApp Wellness Logs",
    activeCitiesTitle: "Active Regional Coordination Desks",
    activeCities: "Bengaluru • Chennai • Hyderabad • Coimbatore",
    transparentPricingNotice:
      "Transparent daily rates with statutory 18% GST invoices. No hidden broker markups.",
  },
  ta: {
    careCloserToHome: "வீட்டருகே உணரும் கனிவான பராமரிப்பு.",
    tagline: "தென்னிந்திய குடும்பங்களுக்கான நம்பிக்கையான உதவியாளர்கள்",
    heroSupporting:
      "உங்கள் பெற்றோர், குழந்தைகள் மற்றும் நலம் பெறுபவர்களுக்கான பாதுகாப்பான மகளிர் உதவியாளர்கள் மற்றும் செவிலியர்கள்.",
    requestConsultation: "ஆலோசனை பதிவு செய்க",
    callCoordinator: "ஒருங்கிணைப்பாளரிடம் பேசவும்",
    policeVerified: "100% காவல் துறை சரிபார்க்கப்பட்டவர்கள்",
    nurseClarity: "உதவியாளர் மற்றும் செவிலியர் பணி தெளிவு",
    clusterBackup: "அவசர மாற்று உதவியாளர் பாதுகாப்பு",
    dailyWhatsAppLogs: "தினசரி வாட்ஸ்அப் நல விவரக் குறிப்புகள்",
    activeCitiesTitle: "செயலில் உள்ள பிராந்திய சேவை மையங்கள்",
    activeCities: "பெங்களூரு • சென்னை • ஹைதராபாத் • கோயம்புத்தூர்",
    transparentPricingNotice: "வெளிப்படையான தினசரி கட்டணங்கள் மற்றும் அதிகாரப்பூர்வ ஜிஎஸ்டி பில்.",
  },
  te: {
    careCloserToHome: "ఇంటిలాంటి ఆప్యాయతతో కూడిన సంరక్షణ.",
    tagline: "దక్షిణ భారత కుటుంబాలకు నమ్మకమైన మహిళా సహాయకులు",
    heroSupporting:
      "తల్లిదండ్రులు మరియు కోలుకుంటున్న ఆత్మీయుల కోసం పోలీసు ధృవీకరణ పొందిన కేర్ అటెండెంట్లు మరియు నర్సులు.",
    requestConsultation: "సంరక్షణ సంప్రదింపులను పొందండి",
    callCoordinator: "కోఆర్డినేటర్‌తో మాట్లాడండి",
    policeVerified: "100% పోలీస్ వెరిఫైడ్ & గుర్తింపు ధృవీకరణ",
    nurseClarity: "అటెండెంట్ మరియు నర్సు బాధ్యతల స్పష్టత",
    clusterBackup: "అత్యవసర బ్యాకప్ సహాయక ప్రోటోకాల్",
    dailyWhatsAppLogs: "రోజూ వాట్సాప్ ద్వారా హెల్త్ అప్‌డేట్స్",
    activeCitiesTitle: "ప్రధాన ప్రాంతీయ కేంద్రాలు",
    activeCities: "బెంగళూరు • చెన్నై • హైదరాబాద్ • కోయంబత్తూరు",
    transparentPricingNotice: "పారదర్శక రోజువారీ ధరలు మరియు 18% అధికారిక జీఎస్టీ రసీదులు.",
  },
  kn: {
    careCloserToHome: "ಮನೆಯಂತೆಯೇ ಆಪ್ತವಾದ ಕಾಳಜಿ.",
    tagline: "ದಕ್ಷಿಣ ಭಾರತದ ಕುಟುಂಬಗಳಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಮಹಿಳಾ ಅಟೆಂಡೆಂಟ್‌ಗಳು",
    heroSupporting:
      "ನಿಮ್ಮ ಪೋಷಕರು ಮತ್ತು ಚೇತರಿಸಿಕೊಳ್ಳುತ್ತಿರುವ ಆತ್ಮೀಯರಿಗೆ ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ ಪಡೆದ ಮಹಿಳಾ ಸಿಬ್ಬಂದಿ ಮತ್ತು ನರ್ಸ್‌ಗಳು.",
    requestConsultation: "ಕಾಳಜಿ ಸಮಾಲೋಚನೆ ಪಡೆಯಿರಿ",
    callCoordinator: "ಸಂಯೋಜಕರೊಂದಿಗೆ ಮಾತನಾಡಿ",
    policeVerified: "100% ಪೊಲೀಸ್ ವೆರಿಫೈಡ್ ಸಿಬ್ಬಂದಿ",
    nurseClarity: "ಅಟೆಂಡೆಂಟ್ ಮತ್ತು ನರ್ಸ್ ಕರ್ತವ್ಯದ ಸ್ಪಷ್ಟತೆ",
    clusterBackup: "ತುರ್ತು ಬ್ಯಾಕಪ್ ವ್ಯವಸ್ಥೆ",
    dailyWhatsAppLogs: "ದೈನಂದಿನ ವಾಟ್ಸಾಪ್ ಆರೋಗ್ಯ ವಿವರಗಳು",
    activeCitiesTitle: "ಕಾರ್ಯಾಚರಣೆ ಕೇಂದ್ರಗಳು",
    activeCities: "ಬೆಂಗಳೂರು • ಚೆನ್ನೈ • ಹೈದರಾಬಾದ್ • ಕೊಯಮತ್ತೂರು",
    transparentPricingNotice: "ಸ್ಪಷ್ಟ ದೈನಂದಿನ ದರಗಳು ಮತ್ತು ಅಧಿಕೃತ ಜಿಎಸ್ಟಿ ಇನ್‌ವಾಯ್ಸ್.",
  },
  ml: {
    careCloserToHome: "സ്വന്തം വീട്ടിലെന്നപോലെ സ്നേഹപരിചരണം.",
    tagline: "ദക്ഷിണേന്ത്യൻ കുടുംബങ്ങൾക്കായി വിശ്വസ്തരായ പരിചാരകർ",
    heroSupporting:
      "മാതാപിതാക്കൾക്കും രോഗമുക്തി നേടുന്നവർക്കും പോലീസ് വെരിഫിക്കേഷൻ പൂർത്തിയാക്കിയ വനിതാ സഹായികളും നഴ്സുമാരും.",
    requestConsultation: "സൗജന്യ കൺസൾട്ടേഷൻ",
    callCoordinator: "കോർഡിനേറ്ററുമായി സംസാരിക്കുക",
    policeVerified: "100% പോലീസ് വെരിഫൈഡ് രേഖകൾ",
    nurseClarity: "പരിചാരകരുടെയും നഴ്സുമാരുടെയും ഉത്തരവാദിത്ത വ്യക്തത",
    clusterBackup: "അടിയന്തര ബാക്കപ്പ് സംവിധാനം",
    dailyWhatsAppLogs: "ദിവസേനയുള്ള വാട്സാപ്പ് വിവരങ്ങൾ",
    activeCitiesTitle: "പ്രധാന പ്രവർത്തന കേന്ദ്രങ്ങൾ",
    activeCities: "ബെംഗളൂരു • ചെന്നൈ • ഹൈദരാബാദ് • കോയമ്പത്തൂർ",
    transparentPricingNotice: "സുതാര്യമായ നിരക്കുകളും ഔദ്യോഗിക ജിഎസ്ടി രസീതുകളും.",
  },
};
