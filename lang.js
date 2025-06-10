

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en'; 
const translations = {
    en: {
        
        app_name: "SchemeFinder",
        nav_home: "Home",
        nav_check_eligibility: "Check Eligibility",
        nav_feedback: "Feedback",
        nav_about_us: "About Us",
        footer_text: "&copy; 2025 SchemeFinder. All rights reserved.",
        loading_message: "Processing your request...",
        alert_required_fields: "Please fill in all required fields for the current step.",
        alert_submission_error: "There was an error submitting your form. Please try again.",
        alert_no_schemes_found: "No schemes found matching your criteria. Try adjusting your answers or check back later.",
        alert_title_error: "Error",
        alert_title_info: "Information",

        // Index.html
        home_title: "SchemeFinder - Find Government Schemes",
        header_title: "Find Government Schemes",
        header_subtitle: "Simplifying access to government welfare programs.",
        check_eligibility_button: "Check Eligibility",
        learn_more_button: "Learn More",
        mission_title: "Our Mission",
        mission_description: "To connect citizens with relevant government schemes seamlessly.",
        features_title: "Key Features",
        feature1_title: "Real-time eligibility detection",
        feature1_description: "The system instantly processes user inputs such as age, income, location, and other parameters to determine eligibility for various government schemes without delay.",
        feature2_title: "Centralized database of schemes",
        feature2_description: "All available state and central government schemes are stored in a unified, searchable database, ensuring quick access and simplified management.",
        feature3_title: "Dynamic matching based on user data",
        feature3_description: "The platform smartly compares user data against eligibility rules and filters to suggest the most relevant government schemes tailored to individual needs.",

        // Eligibility.html Form
        eligibility_title: "Check Your Scheme Eligibility",
        eligibility_form_title: "Check Your Scheme Eligibility",
        step1_personal: "Personal Details",
        step2_location_social: "Location & Social",
        step3_financial_occupation: "Financial & Occupation",
        step4_education_health: "Education & Health",

        step1_personal_title: "Step 1: Personal Details",
        label_age: "Age:",
        label_gender: "Gender:",
        select_gender: "Select Gender",
        gender_male: "Male",
        gender_female: "Female",
        gender_other: "Other",
        label_marital_status: "Marital Status:",
        select_marital_status: "Select Marital Status",
        marital_single: "Single",
        marital_married: "Married",
        marital_divorced: "Divorced",
        marital_widowed: "Widowed",

        step2_location_social_title: "Step 2: Location & Social",
        label_state: "State:",
        select_state: "Select State",
        label_district: "District:",
        select_district: "Select District",
        label_residency_location: "Residency Location:",
        select_location_type: "Select Location Type",
        location_rural: "Rural",
        location_urban: "Urban",
        label_religion: "Religion:",
        select_religion: "Select Religion",
        religion_hinduism: "Hinduism",
        religion_islam: "Islam",
        religion_christianity: "Christianity",
        religion_sikhism: "Sikhism",
        religion_buddhism: "Buddhism",
        religion_jainism: "Jainism",
        religion_other: "Other",
        label_caste: "Caste:",
        select_caste: "Select Caste",

        step3_financial_occupation_title: "Step 3: Financial & Occupation",
        label_annual_income: "Annual Income (INR):",
        label_bpl: "Below Poverty Line (BPL):",
        select_option: "Select Option",
        option_yes: "Yes",
        option_no: "No",
        label_occupation: "Occupation:",

        step4_education_health_title: "Step 4: Education & Health",
        label_education_level: "Level of Education:",
        select_level: "Select Level",
        edu_primary: "Primary",
        edu_secondary: "Secondary",
        edu_higher_secondary: "Higher Secondary",
        edu_graduate: "Graduate",
        edu_postgraduate: "Post Graduate",
        edu_none: "None",
        label_pwd: "Person with Disability (PWD):",

        button_next: "Next",
        button_previous: "Previous",
        button_submit: "Submit for Eligibility",

        // Results Section
        eligible_schemes_title: "Your Eligible Government Schemes",
        no_schemes_found: "No schemes found matching your criteria. Please adjust your input or check back later.",
        apply_now: "Apply Now",
        view_details: "View Details", // For application link
        check_again_button: "Check Again"
    },
    hi: {
        // General
        app_name: "स्कीमफाइंडर",
        nav_home: "होम",
        nav_check_eligibility: "पात्रता जांचें",
        nav_admin_panel: "एडमिन पैनल",
        nav_feedback: "फीडबैक",
        nav_about_us: "हमारे बारे में",
        footer_text: "&copy; 2025 स्कीमफाइंडर। सर्वाधिकार सुरक्षित।",
        loading_message: "आपके अनुरोध पर कार्यवाही की जा रही है...",
        alert_required_fields: "कृपया वर्तमान चरण के लिए सभी आवश्यक फ़ील्ड भरें।",
        alert_submission_error: "आपका फ़ॉर्म सबमिट करने में एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
        alert_no_schemes_found: "आपके मानदंडों से मेल खाने वाली कोई योजना नहीं मिली। कृपया अपने उत्तरों को समायोजित करने का प्रयास करें या बाद में जांचें।",
        alert_title_error: "त्रुटि",
        alert_title_info: "जानकारी",

        // Index.html
        home_title: "स्कीमफाइंडर - सरकारी योजनाएँ खोजें",
        header_title: "सरकारी योजनाएँ खोजें",
        header_subtitle: "सरकारी कल्याणकारी कार्यक्रमों तक पहुँच को सरल बनाना।",
        check_eligibility_button: "पात्रता जांचें",
        learn_more_button: "और जानें",
        mission_title: "हमारा मिशन",
        mission_description: "नागरिकों को प्रासंगिक सरकारी योजनाओं से सहजता से जोड़ना।",
        features_title: "मुख्य विशेषताएं",
        feature1_title: "वास्तविक समय पात्रता का पता लगाना",
        feature1_description: "सिस्टम आयु, आय, स्थान और अन्य मापदंडों जैसे उपयोगकर्ता इनपुट को तुरंत संसाधित करता है ताकि विभिन्न सरकारी योजनाओं के लिए पात्रता का तुरंत पता चल सके।",
        feature2_title: "योजनाओं का केंद्रीकृत डेटाबेस",
        feature2_description: "सभी उपलब्ध राज्य और केंद्र सरकार की योजनाएं एक एकीकृत, खोज योग्य डेटाबेस में संग्रहीत हैं, जो त्वरित पहुंच और सरलीकृत प्रबंधन सुनिश्चित करती हैं।",
        feature3_title: "उपयोगकर्ता डेटा के आधार पर गतिशील मिलान",
        feature3_description: "प्लेटफ़ॉर्म व्यक्तिगत आवश्यकताओं के अनुरूप सबसे प्रासंगिक सरकारी योजनाओं का सुझाव देने के लिए पात्रता नियमों और फ़िल्टरों के खिलाफ उपयोगकर्ता डेटा की समझदारी से तुलना करता है।",

        // Eligibility.html Form
        eligibility_title: "अपनी योजना पात्रता जांचें",
        eligibility_form_title: "अपनी योजना पात्रता जांचें",
        step1_personal: "व्यक्तिगत विवरण",
        step2_location_social: "स्थान और सामाजिक",
        step3_financial_occupation: "वित्तीय और व्यवसाय",
        step4_education_health: "शिक्षा और स्वास्थ्य",

        step1_personal_title: "चरण 1: व्यक्तिगत विवरण",
        label_age: "आयु:",
        label_gender: "लिंग:",
        select_gender: "लिंग चुनें",
        gender_male: "पुरुष",
        gender_female: "महिला",
        gender_other: "अन्य",
        label_marital_status: "वैवाहिक स्थिति:",
        select_marital_status: "वैवाहिक स्थिति चुनें",
        marital_single: "अविवाहित",
        marital_married: "विवाहित",
        marital_divorced: "तलाकशुदा",
        marital_widowed: "विधवा",

        step2_location_social_title: "चरण 2: स्थान और सामाजिक",
        label_state: "राज्य:",
        select_state: "राज्य चुनें",
        label_district: "जिला:",
        select_district: "जिला चुनें",
        label_residency_location: "निवास स्थान:",
        select_location_type: "स्थान प्रकार चुनें",
        location_rural: "ग्रामीण",
        location_urban: "शहरी",
        label_religion: "धर्म:",
        select_religion: "धर्म चुनें",
        religion_hinduism: "हिंदू धर्म",
        religion_islam: "इस्लाम",
        religion_christianity: "ईसाई धर्म",
        religion_sikhism: "सिख धर्म",
        religion_buddhism: "बौद्ध धर्म",
        religion_jainism: "जैन धर्म",
        religion_other: "अन्य",
        label_caste: "जाति:",
        select_caste: "जाति चुनें",

        step3_financial_occupation_title: "चरण 3: वित्तीय और व्यवसाय",
        label_annual_income: "वार्षिक आय (INR):",
        label_bpl: "गरीबी रेखा से नीचे (बीपीएल):",
        select_option: "विकल्प चुनें",
        option_yes: "हाँ",
        option_no: "नहीं",
        label_occupation: "व्यवसाय:",

        step4_education_health_title: "चरण 4: शिक्षा और स्वास्थ्य",
        label_education_level: "शिक्षा का स्तर:",
        select_level: "स्तर चुनें",
        edu_primary: "प्राथमिक",
        edu_secondary: "माध्यमिक",
        edu_higher_secondary: "उच्च माध्यमिक",
        edu_graduate: "स्नातक",
        edu_postgraduate: "स्नातकोत्तर",
        edu_none: "कोई नहीं",
        label_pwd: "विकलांग व्यक्ति (पीडब्ल्यूडी):",

        button_next: "आगे",
        button_previous: "पीछे",
        button_submit: "पात्रता के लिए सबमिट करें",

        // Results Section
        eligible_schemes_title: "आपकी पात्र सरकारी योजनाएँ",
        no_schemes_found: "आपके मानदंडों से मेल खाने वाली कोई योजना नहीं मिली। कृपया अपने इनपुट को समायोजित करें या बाद में जांचें।",
        apply_now: "अभी आवेदन करें",
        view_details: "विवरण देखें",
        check_again_button: "पुनः जांचें"
    },
    mr: {
        // General
        app_name: "स्कीमफाइंडर",
        nav_home: "मुख्यपृष्ठ",
        nav_check_eligibility: "पात्रता तपासा",
        nav_admin_panel: "प्रशासक पॅनेल",
        nav_feedback: "अभिप्राय",
        nav_about_us: "आमच्याबद्दल",
        footer_text: "&copy; 2025 स्कीमफाइंडर. सर्व हक्क राखीव.",
        loading_message: "आपल्या विनंतीवर प्रक्रिया केली जात आहे...",
        alert_required_fields: "कृपया वर्तमान चरणासाठी सर्व आवश्यक फील्ड भरा.",
        alert_submission_error: "आपला फॉर्म सबमिट करताना एक त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
        alert_no_schemes_found: "आपल्या निकषांशी जुळणाऱ्या योजना आढळल्या नाहीत. कृपया आपली उत्तरे समायोजित करण्याचा प्रयत्न करा किंवा नंतर तपासा.",
        alert_title_error: "त्रुटी",
        alert_title_info: "माहिती",

        // Index.html
        home_title: "स्कीमफाइंडर - सरकारी योजना शोधा",
        header_title: "सरकारी योजना शोधा",
        header_subtitle: "सरकारी कल्याणकारी कार्यक्रमांमध्ये प्रवेश सुलभ करणे.",
        check_eligibility_button: "पात्रता तपासा",
        learn_more_button: "अधिक जाणून घ्या",
        mission_title: "आमचे ध्येय",
        mission_description: "नागरिकांना संबंधित सरकारी योजनांशी अखंडपणे जोडणे.",
        features_title: "मुख्य वैशिष्ट्ये",
        feature1_title: "रिअल-टाइम पात्रता शोध",
        feature1_description: "प्रणाली वापरकर्त्यांच्या इनपुटवर, जसे की वय, उत्पन्न, स्थान आणि इतर पॅरामीटर्सवर त्वरित प्रक्रिया करते, ज्यामुळे विविध सरकारी योजनांसाठी पात्रता तात्काळ निश्चित होते.",
        feature2_title: "योजनांचा केंद्रीकृत डेटाबेस",
        feature2_description: "सर्व उपलब्ध राज्य आणि केंद्र सरकारच्या योजना एकात्मिक, शोधण्यायोग्य डेटाबेसमध्ये संग्रहित केल्या जातात, ज्यामुळे जलद प्रवेश आणि सुलभ व्यवस्थापन सुनिश्चित होते.",
        feature3_title: "वापरकर्ता डेटावर आधारित डायनॅमिक जुळणी",
        feature3_description: "प्लॅटफॉर्म वापरकर्त्यांच्या डेटाची पात्रता नियमांनुसार आणि फिल्टर्सनुसार तुलना करते, ज्यामुळे वैयक्तिक गरजांनुसार सर्वात संबंधित सरकारी योजना सुचवल्या जातात.",

        // Eligibility.html Form
        eligibility_title: "आपली योजना पात्रता तपासा",
        eligibility_form_title: "आपली योजना पात्रता तपासा",
        step1_personal: "वैयक्तिक तपशील",
        step2_location_social: "स्थान आणि सामाजिक",
        step3_financial_occupation: "आर्थिक आणि व्यवसाय",
        step4_education_health: "शिक्षण आणि आरोग्य",

        step1_personal_title: "पायरी 1: वैयक्तिक तपशील",
        label_age: "वय:",
        label_gender: "लिंग:",
        select_gender: "लिंग निवडा",
        gender_male: "पुरुष",
        gender_female: "महिला",
        gender_other: "इतर",
        label_marital_status: "वैवाहिक स्थिती:",
        select_marital_status: "वैवाहिक स्थिती निवडा",
        marital_single: "अविवाहित",
        marital_married: "विवाहित",
        marital_divorced: "घटस्फोटित",
        marital_widowed: "विधवा",

        step2_location_social_title: "पायरी 2: स्थान आणि सामाजिक",
        label_state: "राज्य:",
        select_state: "राज्य निवडा",
        label_district: "जिल्हा:",
        select_district: "जिल्हा निवडा",
        label_residency_location: "निवासाचे स्थान:",
        select_location_type: "स्थान प्रकार निवडा",
        location_rural: "ग्रामीण",
        location_urban: "शहरी",
        label_religion: "धर्म:",
        select_religion: "धर्म निवडा",
        religion_hinduism: "हिंदू धर्म",
        religion_islam: "इस्लाम",
        religion_christianity: "ख्रिश्चन धर्म",
        religion_sikhism: "शिख धर्म",
        religion_buddhism: "बौद्ध धर्म",
        religion_jainism: "जैन धर्म",
        religion_other: "इतर",
        label_caste: "जात:",
        select_caste: "जात निवडा",

        step3_financial_occupation_title: "पायरी 3: आर्थिक आणि व्यवसाय",
        label_annual_income: "वार्षिक उत्पन्न (INR):",
        label_bpl: "दारिद्र्यरेषेखालील (बीपीएल):",
        select_option: "पर्याय निवडा",
        option_yes: "होय",
        option_no: "नाही",
        label_occupation: "व्यवसाय:",

        step4_education_health_title: "पायरी 4: शिक्षण आणि आरोग्य",
        label_education_level: "शिक्षणाची पातळी:",
        select_level: "पातळी निवडा",
        edu_primary: "प्राथमिक",
        edu_secondary: "माध्यमिक",
        edu_higher_secondary: "उच्च माध्यमिक",
        edu_graduate: "पदवीधर",
        edu_postgraduate: "पदव्युत्तर",
        edu_none: "काहीही नाही",
        label_pwd: "दिव्यांग व्यक्ती (PWD):",

        button_next: "पुढील",
        button_previous: "मागील",
        button_submit: "पात्रतेसाठी सबमिट करा",

        // Results Section
        eligible_schemes_title: "तुमच्या पात्र सरकारी योजना",
        no_schemes_found: "आपल्या निकषांशी जुळणाऱ्या योजना आढळल्या नाहीत. कृपया आपली उत्तरे समायोजित करा किंवा नंतर तपासा.",
        apply_now: "आता अर्ज करा",
        view_details: "तपशील पहा",
        check_again_button: "पुन्हा तपासा"
    }
};

function updateTextContent() {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Handle placeholders manually if needed (not directly supported by data-lang-key)
    const incomeInput = document.getElementById('income');
    if (incomeInput) {
        incomeInput.placeholder = currentLanguage === 'en' ? "e.g., 300000" :
                                  currentLanguage === 'hi' ? "उदा., 300000" :
                                  "उदा., 300000";
    }
    const occupationInput = document.getElementById('occupation');
    if (occupationInput) {
        occupationInput.placeholder = currentLanguage === 'en' ? "e.g., Farmer, Engineer, Student" :
                                      currentLanguage === 'hi' ? "उदा., किसान, इंजीनियर, छात्र" :
                                      "उदा., शेतकरी, अभियंता, विद्यार्थी";
    }
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.placeholder = currentLanguage === 'en' ? "e.g., 30" :
                               currentLanguage === 'hi' ? "उदा., 30" :
                               "उदा., 30";
    }
}