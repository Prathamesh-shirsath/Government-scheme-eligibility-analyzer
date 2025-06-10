// script.js
let currentStep = 1;
const totalSteps = 4;

// DOM elements for step indicators and text
const stepIndicators = {};
const stepTexts = {};
for (let i = 1; i <= totalSteps; i++) {
    stepIndicators[`step${i}`] = document.getElementById(`step${i}-indicator`);
    stepTexts[`step${i}`] = document.querySelector(`#step${i}-indicator + p`);
}

const eligibilityForm = document.getElementById('eligibilityForm');
const resultsSection = document.getElementById('results-section');
const schemesList = document.getElementById('schemes-list');
const noSchemesMessage = document.getElementById('no-schemes-message');
const loadingOverlay = document.getElementById('loading-overlay');
const alertModal = document.getElementById('alert-modal');
const alertModalTitle = document.getElementById('alert-modal-title');
const alertModalMessage = document.getElementById('alert-modal-message');
const alertModalCloseButton = document.getElementById('alert-modal-close');
const languageSelectorNav = document.getElementById('language-selector-nav');


// Function to show/hide steps and update indicators
function showStep(stepNumber) {
    for (let i = 1; i <= totalSteps; i++) {
        const stepDiv = document.getElementById(`step${i}`);
        if (i === stepNumber) {
            stepDiv.classList.remove('hidden');
            stepIndicators[`step${i}`].classList.add('step-indicator-active');
            stepTexts[`step${i}`].classList.add('step-text-active');
        } else {
            stepDiv.classList.add('hidden');
            stepIndicators[`step${i}`].classList.remove('step-indicator-active');
            stepTexts[`step${i}`].classList.remove('step-text-active');
        }
    }
    currentStep = stepNumber;
}

// Function to validate fields in the current step
function validateCurrentStep() {
    const currentFormStep = document.getElementById(`step${currentStep}`);
    const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
    let isValid = true;
    for (const input of inputs) {
        if (!input.value.trim()) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

// Function to move to the next step
function nextStep() {
    if (!validateCurrentStep()) {
        showAlert('alert_title_info', 'alert_required_fields');
        return;
    }

    if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
}

// Function to move to the previous step
function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Function to show custom alert modal
function showAlert(titleKey, messageKey) {
    alertModalTitle.textContent = translations[currentLanguage][titleKey];
    alertModalMessage.textContent = translations[currentLanguage][messageKey];
    alertModal.classList.remove('hidden');
}

// Function to hide custom alert modal
function hideAlert() {
    alertModal.classList.add('hidden');
}

// Function to collect all form data
function collectFormData() {
    const formData = new FormData(eligibilityForm);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

// Function to submit the form data via AJAX
async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    if (!validateCurrentStep()) {
        showAlert('alert_title_info', 'alert_required_fields');
        return;
    }

    loadingOverlay.classList.remove('hidden'); // Show loading indicator

    const formData = collectFormData();
    console.log("Submitting form data:", formData); // Log data being sent

    try {
        const response = await fetch('process_eligibility.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Log the full response text, regardless of success or failure
        const responseText = await response.text();
        console.log("Raw response from PHP:", responseText);

        if (!response.ok) {
            // If response is not OK (e.g., 500, 404), throw an error
            throw new Error(`HTTP error! status: ${response.status}. Response: ${responseText}`);
        }

        // Try to parse JSON. If parsing fails, it will go to the catch block.
        const result = JSON.parse(responseText);

        loadingOverlay.classList.add('hidden'); // Hide loading indicator

        if (result.status === 'success') {
            displayEligibleSchemes(result.eligible_schemes);
            eligibilityForm.classList.add('hidden');
            resultsSection.classList.remove('hidden');
        } else {
            // PHP returned 'error' status
            showAlert('alert_title_error', 'alert_submission_error'); // Generic error message
            console.error('Submission error from PHP:', result.message);
        }
    } catch (error) {
        loadingOverlay.classList.add('hidden'); // Hide loading indicator
        showAlert('alert_title_error', 'alert_submission_error'); // Generic error message
        console.error('Fetch or JSON parse error:', error); // Log the specific error
    }
}

// Function to display eligible schemes
function displayEligibleSchemes(schemes) {
    schemesList.innerHTML = ''; // Clear previous schemes
    noSchemesMessage.classList.add('hidden');

    if (schemes.length === 0) {
        noSchemesMessage.classList.remove('hidden');
    } else {
        schemes.forEach(scheme => {
            const schemeCard = document.createElement('div');
            schemeCard.className = 'bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-600';

            const schemeNameKey = `scheme_name_${currentLanguage}`;
            const descriptionKey = `description_${currentLanguage}`;
            const benefitsKey = `benefits_${currentLanguage}`;

            schemeCard.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${scheme[schemeNameKey] || scheme.scheme_name_en}</h3>
                <p class="text-gray-600 mb-2">${scheme[descriptionKey] || scheme.description_en}</p>
                <p class="text-gray-700 font-medium mb-4">${translations[currentLanguage]['benefits_label'] || 'Benefits'}: ${scheme[benefitsKey] || scheme.benefits_en}</p>
                ${scheme.application_link ? `<a href="${scheme.application_link}" target="_blank" class="text-blue-600 hover:underline mt-2 inline-block">${translations[currentLanguage]['apply_now']}</a>` : ''}
            `;
            schemesList.appendChild(schemeCard);
        });
    }
}

// Function to reset the form and start over
function resetFormAndStartOver() {
    eligibilityForm.reset(); // Clear form inputs
    showStep(1); // Go back to the first step
    resultsSection.classList.add('hidden'); // Hide results
    eligibilityForm.classList.remove('hidden'); // Show form
    noSchemesMessage.classList.add('hidden');
    schemesList.innerHTML = ''; // Clear previous results

    // Re-enable disabled fields (district, caste)
    document.getElementById('district').disabled = true;
    document.getElementById('district').innerHTML = `<option value="">${translations[currentLanguage]['select_district']}</option>`;
    document.getElementById('caste').disabled = true;
    document.getElementById('caste').innerHTML = `<option value="">${translations[currentLanguage]['select_caste']}</option>`;

    updateTextContent(); // Re-apply translations for the form
}


// Data for Indian States and Districts (partial list, you'll need to expand this)
const indianStatesAndDistricts = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Shi Yomi", "Lower Siang", "Kamle", "Lepa Rada", "Pakke Kessang", "Changlang", "Tirap", "Longding", "Namsai", "Anjaw", "Dibang Valley", "Lower Dibang Valley"],
    "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Chhatrapati Sambhajinagar", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Saitual"],
    "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto", "Noklak"],
    "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barauli", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal": ["Alipurduar", "Bankura", "Paschim Bardhaman", "Purba Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
    "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Dadra and Nagar Haveli"],
    "Lakshadweep": ["Lakshadweep"],
    "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
};

// Data for Religions and Castes (simplified and illustrative, expand as needed)
const religionsAndCastes = {
    "hinduism": [ "OPEN", "OBC", "SC", "ST", "Other"],
    "islam": [ "OPEN", "OBC", "SC", "ST", "Other"],
    "christianity":[ "OPEN", "OBC", "SC", "ST", "Other"],
    "sikhism": [ "OPEN", "OBC", "SC", "ST", "Other"],
    "buddhism": [ "OPEN", "OBC", "SC", "ST", "Other"],
    "jainism": [ "OPEN", "OBC", "SC", "ST", "Other"],
    "other": ["Not Specified"] // For users who choose 'Other' religion
};


document.addEventListener('DOMContentLoaded', () => {
    // Set initial language from local storage or default to 'en'
    currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (languageSelectorNav) {
        languageSelectorNav.value = currentLanguage;
        languageSelectorNav.addEventListener('change', (event) => {
            currentLanguage = event.target.value;
            localStorage.setItem('selectedLanguage', currentLanguage); // Save preference
            updateTextContent(); // Update all text on the page
            // Re-populate dynamic dropdowns if needed, with updated language for options
            populateStates();
            // Re-select district/caste if they were previously selected
            const stateSelect = document.getElementById('state');
            const districtSelect = document.getElementById('district');
            if (stateSelect.value) {
                populateDistricts(stateSelect.value, districtSelect.value);
            }
            const religionSelect = document.getElementById('religion');
            const casteSelect = document.getElementById('caste');
            if (religionSelect.value) {
                populateCastes(religionSelect.value, casteSelect.value);
            }
        });
    }

    showStep(1); // Initialize to the first step
    updateTextContent(); // Apply translations on load

    // Populate States dropdown
    function populateStates() {
        const stateSelect = document.getElementById('state');
        stateSelect.innerHTML = `<option value="">${translations[currentLanguage]['select_state']}</option>`; // Clear and add default
        for (const state in indianStatesAndDistricts) {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state; // State names are common across languages
            stateSelect.appendChild(option);
        }
    }
    populateStates();


    // Event listener for State change to populate Districts
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    stateSelect.addEventListener('change', () => {
        populateDistricts(stateSelect.value);
    });

    function populateDistricts(selectedState, selectedDistrict = '') {
        districtSelect.innerHTML = `<option value="">${translations[currentLanguage]['select_district']}</option>`; // Clear and add default
        districtSelect.disabled = true;

        if (selectedState && indianStatesAndDistricts[selectedState]) {
            indianStatesAndDistricts[selectedState].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district; // District names are common
                districtSelect.appendChild(option);
            });
            districtSelect.disabled = false;
            if (selectedDistrict) { // If a previous selection exists, try to restore it
                districtSelect.value = selectedDistrict;
            }
        }
    }


    // Event listener for Religion change to populate Castes
    const religionSelect = document.getElementById('religion');
    const casteSelect = document.getElementById('caste');
    religionSelect.addEventListener('change', () => {
        populateCastes(religionSelect.value);
    });

    function populateCastes(selectedReligion, selectedCaste = '') {
        casteSelect.innerHTML = `<option value="">${translations[currentLanguage]['select_caste']}</option>`; // Clear and add default
        casteSelect.disabled = true;

        if (selectedReligion && religionsAndCastes[selectedReligion]) {
            // Options for caste need translation
            const casteOptions = religionsAndCastes[selectedReligion];
            casteOptions.forEach(caste => {
                const option = document.createElement('option');
                option.value = caste;
                // For simplicity, using English caste names directly. If you need
                // translated caste names, you'd add them to the `translations` object.
                option.textContent = caste;
                casteSelect.appendChild(option);
            });
            casteSelect.disabled = false;
            if (selectedCaste) { // If a previous selection exists, try to restore it
                casteSelect.value = selectedCaste;
            }
        }
    }


    // Attach submit event listener to the form
    eligibilityForm.addEventListener('submit', submitForm);

    // Attach event listener for the alert modal close button
    alertModalCloseButton.addEventListener('click', hideAlert);
});