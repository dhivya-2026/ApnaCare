// Regional language dictionary and localization infrastructure for ApnaCare
// South India-first support: English, Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം)

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
  nav: {
    home: string;
    services: string;
    buildPlan: string;
    situations: string;
    attendants: string;
    safety: string;
    about: string;
    contact: string;
    requestAssistance: string;
    chatWhatsApp: string;
    language: string;
  };
  situations: {
    badge: string;
    title: string;
    subtitle: string;
  };
  configurator: {
    badge: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    proceedCta: string;
    whatsappCta: string;
  };
  trustStrip: {
    commandDesks: string;
    verifiedCount: string;
    rating: string;
  };
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
    nav: {
      home: "Home",
      services: "Services",
      buildPlan: "Build Plan",
      situations: "Family Situations",
      attendants: "Attendants",
      safety: "Safety & Trust",
      about: "About",
      contact: "Contact",
      requestAssistance: "Request Assistance",
      chatWhatsApp: "WhatsApp Coordinator",
      language: "Language",
    },
    situations: {
      badge: "Real Family Situations",
      title: "Care Designed for Real South Indian Life",
      subtitle:
        "Every family situation is unique. Choose your immediate need and discover pre-screened care tailored to your home.",
    },
    configurator: {
      badge: "Build Your Care Plan",
      title: "Who are you looking to care for?",
      subtitle:
        "Choose from 10 specialized care profiles across South India with complete flexibility on hours, shift timings, and duration.",
      step1: "Who needs care",
      step2: "Age & Profile",
      step3: "Build your plan",
      proceedCta: "Proceed with this Plan",
      whatsappCta: "Share Plan via WhatsApp",
    },
    trustStrip: {
      commandDesks: "Regional Care Desks Active in 4 South Indian Metros",
      verifiedCount: "100% Background Screened Attendants",
      rating: "4.9/5 Rating from 1,200+ South Indian Families",
    },
  },
  ta: {
    careCloserToHome: "வீட்டருகே உணரும் கனிவான பராமரிப்பு.",
    tagline: "தென்னிந்திய குடும்பங்களுக்கான நம்பிக்கையான மகளிர் உதவியாளர்கள் & செவிலியர்கள்",
    heroSupporting:
      "உங்கள் பெற்றோர், குழந்தைகள் மற்றும் நலம் பெறுபவர்களுக்கான பாதுகாப்பான காவல் துறை சரிபார்க்கப்பட்ட மகளிர் உதவியாளர்கள் மற்றும் செவிலியர்கள்.",
    requestConsultation: "ஆலோசனை பதிவு செய்க",
    callCoordinator: "ஒருங்கிணைப்பாளரிடம் பேசவும்",
    policeVerified: "100% காவல் துறை சரிபார்க்கப்பட்டவர்கள்",
    nurseClarity: "உதவியாளர் மற்றும் செவிலியர் பணி தெளிவு",
    clusterBackup: "அவசர மாற்று உதவியாளர் பாதுகாப்பு",
    dailyWhatsAppLogs: "தினசரி வாட்ஸ்அப் நல விவரக் குறிப்புகள்",
    activeCitiesTitle: "செயலில் உள்ள பிராந்திய சேவை மையங்கள்",
    activeCities: "பெங்களூரு • சென்னை • ஹைதராபாத் • கோயம்புத்தூர்",
    transparentPricingNotice: "வெளிப்படையான தினசரி கட்டணங்கள் மற்றும் அதிகாரப்பூர்வ ஜிஎஸ்டி பில். தரகர் கட்டணம் இல்லை.",
    nav: {
      home: "முகப்பு",
      services: "சேவைகள்",
      buildPlan: "திட்டம் அமைக்க",
      situations: "குடும்ப சூழல்கள்",
      attendants: "உதவியாளர்கள்",
      safety: "பாதுகாப்பு & உறுதி",
      about: "எங்களை பற்றி",
      contact: "தொடர்பு",
      requestAssistance: "உதவி கோருக",
      chatWhatsApp: "வாட்ஸ்அப் உதவி",
      language: "மொழி",
    },
    situations: {
      badge: "உண்மையான குடும்ப சூழல்கள்",
      title: "தென்னிந்திய குடும்பங்களின் தேவைகளுக்கான பராமரிப்பு",
      subtitle:
        "ஒவ்வொரு குடும்ப சூழலும் தனித்துவமானது. உங்கள் தேவையைத் தேர்ந்தெடுத்து, உங்கள் இல்லத்திற்கான நம்பகமான உதவியாளரைப் பெறுங்கள்.",
    },
    configurator: {
      badge: "பராமரிப்புத் திட்டம் அமைக்க",
      title: "யாருக்கு பராமரிப்பு தேவைப்படுகிறது?",
      subtitle:
        "10 தனித்துவமான பராமரிப்புப் பிரிவுகளில் உங்கள் விருப்பப்படி நேரமும் நாட்களும் தேர்ந்தெடுத்துக் கொள்ளலாம்.",
      step1: "யாருக்கு உதவி",
      step2: "வயது மற்றும் சுயவிவரம்",
      step3: "திட்டம் அமைக்க",
      proceedCta: "இந்த திட்டத்துடன் தொடர்க",
      whatsappCta: "வாட்ஸ்அப்பில் பகிரவும்",
    },
    trustStrip: {
      commandDesks: "தென்னிந்தியாவின் 4 முக்கிய நகரங்களில் நேரடி மையங்கள்",
      verifiedCount: "100% காவல் துறை சரிபார்க்கப்பட்ட மகளிர் உதவியாளர்கள்",
      rating: "1,200+ குடும்பங்களின் 4.9/5 நன்மதிப்பு",
    },
  },
  te: {
    careCloserToHome: "ఇంటిలాంటి ఆప్యాయతతో కూడిన సంరక్షణ.",
    tagline: "దక్షిణ భారత కుటుంబాలకు నమ్మకమైన మహిళా సహాయకులు & నర్సులు",
    heroSupporting:
      "తల్లిదండ్రులు మరియు కోలుకుంటున్న ఆత్మీయుల కోసం పోలీసు ధృవీకరణ పొందిన కేర్ అటెండెంట్లు మరియు రిజిస్టర్డ్ నర్సులు.",
    requestConsultation: "సంరక్షణ సంప్రదింపులను పొందండి",
    callCoordinator: "కోఆర్డినేటర్‌తో మాట్లాడండి",
    policeVerified: "100% పోలీస్ వెరిఫైడ్ & గుర్తింపు ధృవీకరణ",
    nurseClarity: "అటెండెంట్ మరియు నర్సు బాధ్యతల స్పష్టత",
    clusterBackup: "అత్యవసర బ్యాకప్ సహాయక ప్రోటోకాల్",
    dailyWhatsAppLogs: "రోజూ వాట్సాప్ ద్వారా హెల్త్ అప్‌డేట్స్",
    activeCitiesTitle: "ప్రధాన ప్రాంతీయ కేంద్రాలు",
    activeCities: "బెంగళూరు • చెన్నై • హైదరాబాద్ • కోయంబత్తూరు",
    transparentPricingNotice: "పారదర్శక రోజువారీ ధరలు మరియు 18% అధికారిక జీఎస్టీ రసీదులు. దాచిన కమిషన్లు లేవు.",
    nav: {
      home: "హోమ్",
      services: "సేవలు",
      buildPlan: "ప్లాన్ చేయండి",
      situations: "కుటుంబ అవసరాలు",
      attendants: "అటెండెంట్లు",
      safety: "భద్రత & విశ్వసనీయత",
      about: "మా గురించి",
      contact: "సంప్రదించండి",
      requestAssistance: "సహాయం పొందండి",
      chatWhatsApp: "వాట్సాప్ కోఆర్డినేటర్",
      language: "భాష",
    },
    situations: {
      badge: "కుటుంబ అవసరాల సంరక్షణ",
      title: "దక్షిణ భారత కుటుంబ వాస్తవాల కోసం రూపొందించిన సేవలు",
      subtitle:
        "ప్రతి కుటుంబ పరిస్థితి ప్రత్యేకమైనది. మీ తక్షణ అవసరాన్ని ఎంచుకోండి మరియు మీ ఇంటికి సరైన సంరక్షకులను కనుగొనండి.",
    },
    configurator: {
      badge: "కేర్ ప్లాన్ రూపొందించండి",
      title: "ఎవరి కోసం సంరక్షణ చూస్తున్నారు?",
      subtitle:
        "సౌత్ ఇండియాలోని 10 ప్రత్యేక కేర్ ప్రొఫైల్స్ నుండి ఎంచుకోండి — సమయం మరియు రోజుల పూర్తి సౌలభ్యంతో.",
      step1: "ఎవరి కోసం",
      step2: "వయస్సు & ప్రొఫైల్",
      step3: "ప్లాన్ సిద్ధం చేయండి",
      proceedCta: "ఈ ప్లాన్‌తో ముందుకు సాగండి",
      whatsappCta: "వాట్సాప్‌లో వివరాలు పంపండి",
    },
    trustStrip: {
      commandDesks: "4 ప్రధాన నగరాల్లో క్రియాశీల సహాయక కేంద్రాలు",
      verifiedCount: "100% నేపథ్య ధృవీకరణ పొందిన సహాయకులు",
      rating: "1,200+ కుటుంబాల నుండి 4.9/5 రేటింగ్",
    },
  },
  kn: {
    careCloserToHome: "ಮನೆಯಂತೆಯೇ ಆಪ್ತವಾದ ಕಾಳಜಿ.",
    tagline: "ದಕ್ಷಿಣ ಭಾರತದ ಕುಟುಂಬಗಳಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಮಹಿಳಾ ಅಟೆಂಡೆಂಟ್‌ಗಳು ಮತ್ತು ನರ್ಸ್‌ಗಳು",
    heroSupporting:
      "ನಿಮ್ಮ ಪೋಷಕರು ಮತ್ತು ಚೇತರಿಸಿಕೊಳ್ಳುತ್ತಿರುವ ಆತ್ಮೀಯರಿಗೆ ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ ಪಡೆದ ಮಹಿಳಾ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಪರವಾನಗಿ ಪಡೆದ ನರ್ಸ್‌ಗಳು.",
    requestConsultation: "ಕಾಳಜಿ ಸಮಾಲೋಚನೆ ಪಡೆಯಿರಿ",
    callCoordinator: "ಸಂಯೋಜಕರೊಂದಿಗೆ ಮಾತನಾಡಿ",
    policeVerified: "100% ಪೊಲೀಸ್ ವೆರಿಫೈಡ್ ಸಿಬ್ಬಂದಿ",
    nurseClarity: "ಅಟೆಂಡೆಂಟ್ ಮತ್ತು ನರ್ಸ್ ಕರ್ತವ್ಯದ ಸ್ಪಷ್ಟತೆ",
    clusterBackup: "ತುರ್ತು ಬ್ಯಾಕಪ್ ವ್ಯವಸ್ಥೆ",
    dailyWhatsAppLogs: "ದೈನಂದಿನ ವಾಟ್ಸಾಪ್ ಆರೋಗ್ಯ ವಿವರಗಳು",
    activeCitiesTitle: "ಕಾರ್ಯಾಚರಣೆ ಕೇಂದ್ರಗಳು",
    activeCities: "ಬೆಂಗಳೂರು • ಚೆನ್ನೈ • ಹೈದರಾಬಾದ್ • ಕೊಯಮತ್ತೂರು",
    transparentPricingNotice: "ಸ್ಪಷ್ಟ ದೈನಂದಿನ ದರಗಳು ಮತ್ತು ಅಧಿಕೃತ ಜಿಎಸ್ಟಿ ಇನ್‌ವಾಯ್ಸ್. ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕವಿಲ್ಲ.",
    nav: {
      home: "ಮುಖಪುಟ",
      services: "ಸೇವೆಗಳು",
      buildPlan: "ಯೋಜನೆ ರೂಪಿಸಿ",
      situations: "ಕುಟುಂಬದ ಸನ್ನಿವೇಶಗಳು",
      attendants: "ಅಟೆಂಡೆಂಟ್‌ಗಳು",
      safety: "ಸುರಕ್ಷತೆ & ನಂಬಿಕೆ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
      requestAssistance: "ನೆರವು ಕೋರಿ",
      chatWhatsApp: "ವಾಟ್ಸಾಪ್ ಸಹಾಯ",
      language: "ಭಾಷೆ",
    },
    situations: {
      badge: "ನೈಜ ಕುಟುಂಬ ಸನ್ನಿವೇಶಗಳು",
      title: "ದಕ್ಷಿಣ ಭಾರತದ ಕುಟುಂಬಗಳಿಗಾಗಿಯೇ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಕಾಳಜಿ",
      subtitle:
        "ಪ್ರತಿಯೊಂದು ಕುಟುಂಬದ ಅಗತ್ಯವೂ ವಿಭಿನ್ನ. ನಿಮ್ಮ ಅಗತ್ಯವನ್ನು ಆರಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಮನೆಗೆ ಸೂಕ್ತವಾದ ಸಹಾಯಕರನ್ನು ಪಡೆಯಿರಿ.",
    },
    configurator: {
      badge: "ನಿಮ್ಮ ಆರೈಕೆ ಯೋಜನೆ ರೂಪಿಸಿ",
      title: "ಯಾರ ಆರೈಕೆಗಾಗಿ ಹುಡುಕುತ್ತಿದ್ದೀರಿ?",
      subtitle:
        "ದಕ್ಷಿಣ ಭಾರತದ 10 ಪ್ರಮುಖ ವಿಭಾಗಗಳಿಂದ ಆಯ್ಕೆಮಾಡಿ — ಶಿಫ್ಟ್ ಸಮಯ ಮತ್ತು ದಿನಗಳ ಸಂಪೂರ್ಣ ಹೊಂದಾಣಿಕೆಯೊಂದಿಗೆ.",
      step1: "ಯಾರಿಗೆ ನೆರವು",
      step2: "ವಯಸ್ಸು ಮತ್ತು ವಿವರ",
      step3: "ಯೋಜನೆ ಪೂರ್ಣಗೊಳಿಸಿ",
      proceedCta: "ಈ ಯೋಜನೆಯೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
      whatsappCta: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
    },
    trustStrip: {
      commandDesks: "4 ಮಹಾನಗರಗಳಲ್ಲಿ ಸಕ್ರಿಯ ಸೇವಾ ಡೆಸ್ಕ್‌ಗಳು",
      verifiedCount: "100% ಪೊಲೀಸ್ ದಾಖಲೆ ಪರಿಶೀಲನೆ ಹೊಂದಿದ ಸಿಬ್ಬಂದಿ",
      rating: "1,200+ ಕುಟುಂಬಗಳಿಂದ 4.9/5 ವಿಶ್ವಾಸಾರ್ಹ ರೇಟಿಂಗ್",
    },
  },
  ml: {
    careCloserToHome: "സ്വന്തം വീട്ടിലെന്നപോലെ സ്നേഹപരിചരണം.",
    tagline: "ദക്ഷിണേന്ത്യൻ കുടുംബങ്ങൾക്കായി വിശ്വസ്തരായ വനിതാ പരിചാരകരും നഴ്സുമാരും",
    heroSupporting:
      "മാതാപിതാക്കൾക്കും രോഗമുക്തി നേടുന്നവർക്കും പോലീസ് വെരിഫിക്കേഷൻ പൂർത്തിയാക്കിയ വനിതാ സഹായികളും രജിസ്റ്റർ ചെയ്ത നഴ്സുമാരും.",
    requestConsultation: "സൗജന്യ കൺസൾട്ടേഷൻ നേടുക",
    callCoordinator: "കോർഡിനേറ്ററുമായി സംസാരിക്കുക",
    policeVerified: "100% പോലീസ് വെരിഫൈഡ് രേഖകൾ",
    nurseClarity: "പരിചാരകരുടെയും നഴ്സുമാരുടെയും ഉത്തരവാദിത്ത വ്യക്തത",
    clusterBackup: "അടിയന്തര ബാക്കപ്പ് സംവിധാനം",
    dailyWhatsAppLogs: "ദിവസേനയുള്ള വാട്സാപ്പ് വിവരങ്ങൾ",
    activeCitiesTitle: "പ്രധാന പ്രവർത്തന കേന്ദ്രങ്ങൾ",
    activeCities: "ബെംഗളൂരു • ചെന്നൈ • ഹൈദരാബാദ് • കോയമ്പത്തൂർ",
    transparentPricingNotice: "സുതാര്യമായ നിരക്കുകളും ഔദ്യോഗിക ജിഎസ്ടി രസീതുകളും. ഇടനിലക്കാരുടെ ചാർജുകൾ ഇല്ല.",
    nav: {
      home: "ഹോം",
      services: "സേവനങ്ങൾ",
      buildPlan: "പ്ലാൻ തയ്യാറാക്കുക",
      situations: "കുടുംബ സാഹചര്യങ്ങൾ",
      attendants: "പരിചാരകർ",
      safety: "സുരക്ഷ & വിശ്വാസ്യത",
      about: "ഞങ്ങളെക്കുറിച്ച്",
      contact: "ബന്ധപ്പെടുക",
      requestAssistance: "സഹായം തേടുക",
      chatWhatsApp: "വാട്സാപ്പ് കോർഡിനേറ്റർ",
      language: "ഭാഷ",
    },
    situations: {
      badge: "യഥാർത്ഥ കുടുംബ സാഹചര്യങ്ങൾ",
      title: "ദക്ഷിണേന്ത്യൻ കുടുംബങ്ങൾക്കായി അനുയോജ്യമായ പരിചരണം",
      subtitle:
        "ഓരോ കുടുംബത്തിന്റെയും ആവശ്യങ്ങൾ വ്യത്യസ്തമാണ്. നിങ്ങളുടെ ആവശ്യം തിരഞ്ഞെടുക്കൂ, അനുയോജ്യമായ പരിചാരകരെ കണ്ടെത്തൂ.",
    },
    configurator: {
      badge: "കെയർ പ്ലാൻ നിർമ്മിക്കൂ",
      title: "ആർക്കാണ് പരിചരണം ആവശ്യമുള്ളത്?",
      subtitle:
        "10 പ്രത്യേക പരിചരണ വിഭാഗങ്ങളിൽ നിന്ന് നിങ്ങൾക്ക് അനുയോജ്യമായ ഷിഫ്റ്റ് സമയവും ദിവസങ്ങളും തിരഞ്ഞെടുക്കുക.",
      step1: "ആർക്കാണ് സഹായം",
      step2: "പ്രായവും വിവരങ്ങളും",
      step3: "പ്ലാൻ പൂർത്തിയാക്കുക",
      proceedCta: "ഈ പ്ലാനുമായി മുന്നോട്ട് പോകുക",
      whatsappCta: "വാട്സാപ്പിൽ വിവരങ്ങൾ പങ്കിടുക",
    },
    trustStrip: {
      commandDesks: "4 പ്രധാന നഗരങ്ങളിൽ സജീവ സേവന കേന്ദ്രങ്ങൾ",
      verifiedCount: "100% പശ്ചാത്തല പരിശോധന പൂർത്തിയാക്കിയ സഹായികൾ",
      rating: "1,200-ലധികം കുടുംബങ്ങളിൽ നിന്ന് 4.9/5 റേറ്റിംഗ്",
    },
  },
};
