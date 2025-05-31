let telInput; 

function iniciarComo(tipo) {
    alert('Has seleccionado iniciar como: ' + tipo);
}

const countriesData = [
    { id: 'AF', text: 'Afghanistan (+93)', dialCode: '93' },
    { id: 'AL', text: 'Albania (+355)', dialCode: '355' },
    { id: 'DZ', text: 'Algeria (+213)', dialCode: '213' },
    { id: 'AD', text: 'Andorra (+376)', dialCode: '376' },
    { id: 'AO', text: 'Angola (+244)', dialCode: '244' },
    { id: 'AR', text: 'Argentina (+54)', dialCode: '54' },
    { id: 'AM', text: 'Armenia (+374)', dialCode: '374' },
    { id: 'AU', text: 'Australia (+61)', dialCode: '61' },
    { id: 'AT', text: 'Austria (+43)', dialCode: '43' },
    { id: 'AZ', text: 'Azerbaijan (+994)', dialCode: '994' },
    { id: 'BH', text: 'Bahrain (+973)', dialCode: '973' },
    { id: 'BD', text: 'Bangladesh (+880)', dialCode: '880' },
    { id: 'BY', text: 'Belarus (+375)', dialCode: '375' },
    { id: 'BE', text: 'Belgium (+32)', dialCode: '32' },
    { id: 'BJ', text: 'Benin (+229)', dialCode: '229' },
    { id: 'BO', text: 'Bolivia (+591)', dialCode: '591' },
    { id: 'BR', text: 'Brazil (+55)', dialCode: '55' },
    { id: 'BG', text: 'Bulgaria (+359)', dialCode: '359' },
    { id: 'BF', text: 'Burkina Faso (+226)', dialCode: '226' },
    { id: 'BI', text: 'Burundi (+257)', dialCode: '257' },
    { id: 'KH', text: 'Cambodia (+855)', dialCode: '855' },
    { id: 'CM', text: 'Cameroon (+237)', dialCode: '237' },
    { id: 'CA', text: 'Canada (+1)', dialCode: '1' },
    { id: 'CL', text: 'Chile (+56)', dialCode: '56' },
    { id: 'CN', text: 'China (+86)', dialCode: '86' },
    { id: 'CO', text: 'Colombia (+57)', dialCode: '57' },
    { id: 'CR', text: 'Costa Rica (+506)', dialCode: '506' },
    { id: 'HR', text: 'Croatia (+385)', dialCode: '385' },
    { id: 'CU', text: 'Cuba (+53)', dialCode: '53' },
    { id: 'CY', text: 'Cyprus (+357)', dialCode: '357' },
    { id: 'CZ', text: 'Czech Republic (+420)', dialCode: '420' },
    { id: 'DK', text: 'Denmark (+45)', dialCode: '45' },
    { id: 'DO', text: 'Dominican Republic (+1)', dialCode: '1' },
    { id: 'EC', text: 'Ecuador (+593)', dialCode: '593' },
    { id: 'EG', text: 'Egypt (+20)', dialCode: '20' },
    { id: 'SV', text: 'El Salvador (+503)', dialCode: '503' },
    { id: 'EE', text: 'Estonia (+372)', dialCode: '372' },
    { id: 'ET', text: 'Ethiopia (+251)', dialCode: '251' },
    { id: 'FI', text: 'Finland (+358)', dialCode: '358' },
    { id: 'FR', text: 'France (+33)', dialCode: '33' },
    { id: 'DE', text: 'Germany (+49)', dialCode: '49' },
    { id: 'GR', text: 'Greece (+30)', dialCode: '30' },
    { id: 'GT', text: 'Guatemala (+502)', dialCode: '502' },
    { id: 'HN', text: 'Honduras (+504)', dialCode: '504' },
    { id: 'HK', text: 'Hong Kong (+852)', dialCode: '852' },
    { id: 'HU', text: 'Hungary (+36)', dialCode: '36' },
    { id: 'IS', text: 'Iceland (+354)', dialCode: '354' },
    { id: 'IN', text: 'India (+91)', dialCode: '91' },
    { id: 'ID', text: 'Indonesia (+62)', dialCode: '62' },
    { id: 'IR', text: 'Iran (+98)', dialCode: '98' },
    { id: 'IQ', text: 'Iraq (+964)', dialCode: '964' },
    { id: 'IE', text: 'Ireland (+353)', dialCode: '353' },
    { id: 'IL', text: 'Israel (+972)', dialCode: '972' },
    { id: 'IT', text: 'Italy (+39)', dialCode: '39' },
    { id: 'JP', text: 'Japan (+81)', dialCode: '81' },
    { id: 'JO', text: 'Jordan (+962)', dialCode: '962' },
    { id: 'KE', text: 'Kenya (+254)', dialCode: '254' },
    { id: 'KW', text: 'Kuwait (+965)', dialCode: '965' },
    { id: 'LB', text: 'Lebanon (+961)', dialCode: '961' },
    { id: 'LY', text: 'Libya (+218)', dialCode: '218' },
    { id: 'LT', text: 'Lithuania (+370)', dialCode: '370' },
    { id: 'LU', text: 'Luxembourg (+352)', dialCode: '352' },
    { id: 'MY', text: 'Malaysia (+60)', dialCode: '60' },
    { id: 'MX', text: 'Mexico (+52)', dialCode: '52' },
    { id: 'MA', text: 'Morocco (+212)', dialCode: '212' },
    { id: 'NP', text: 'Nepal (+977)', dialCode: '977' },
    { id: 'NL', text: 'Netherlands (+31)', dialCode: '31' },
    { id: 'NZ', text: 'New Zealand (+64)', dialCode: '64' },
    { id: 'NI', text: 'Nicaragua (+505)', dialCode: '505' },
    { id: 'NG', text: 'Nigeria (+234)', dialCode: '234' },
    { id: 'NO', text: 'Norway (+47)', dialCode: '47' },
    { id: 'OM', text: 'Oman (+968)', dialCode: '968' },
    { id: 'PK', text: 'Pakistan (+92)', dialCode: '92' },
    { id: 'PA', text: 'Panama (+507)', dialCode: '507' },
    { id: 'PY', text: 'Paraguay (+595)', dialCode: '595' },
    { id: 'PE', text: 'Peru (+51)', dialCode: '51' },
    { id: 'PH', text: 'Philippines (+63)', dialCode: '63' },
    { id: 'PL', text: 'Poland (+48)', dialCode: '48' },
    { id: 'PT', text: 'Portugal (+351)', dialCode: '351' },
    { id: 'PR', text: 'Puerto Rico (+1)', dialCode: '1' },
    { id: 'QA', text: 'Qatar (+974)', dialCode: '974' },
    { id: 'RO', text: 'Romania (+40)', dialCode: '40' },
    { id: 'RU', text: 'Russia (+7)', dialCode: '7' },
    { id: 'SA', text: 'Saudi Arabia (+966)', dialCode: '966' },
    { id: 'SN', text: 'Senegal (+221)', dialCode: '221' },
    { id: 'RS', text: 'Serbia (+381)', dialCode: '381' },
    { id: 'SG', text: 'Singapore (+65)', dialCode: '65' },
    { id: 'SK', text: 'Slovakia (+421)', dialCode: '421' },
    { id: 'ZA', text: 'South Africa (+27)', dialCode: '27' },
    { id: 'KR', text: 'South Korea (+82)', dialCode: '82' },
    { id: 'ES', text: 'Spain (+34)', dialCode: '34' },
    { id: 'LK', text: 'Sri Lanka (+94)', dialCode: '94' },
    { id: 'SE', text: 'Sweden (+46)', dialCode: '46' },
    { id: 'CH', text: 'Switzerland (+41)', dialCode: '41' },
    { id: 'SY', text: 'Syria (+963)', dialCode: '963' },
    { id: 'TW', text: 'Taiwan (+886)', dialCode: '886' },
    { id: 'TH', text: 'Thailand (+66)', dialCode: '66' },
    { id: 'TN', text: 'Tunisia (+216)', dialCode: '216' },
    { id: 'TR', text: 'Turkey (+90)', dialCode: '90' },
    { id: 'UA', text: 'Ukraine (+380)', dialCode: '380' },
    { id: 'AE', text: 'United Arab Emirates (+971)', dialCode: '971' },
    { id: 'GB', text: 'United Kingdom (+44)', dialCode: '44' },
    { id: 'US', text: 'United States (+1)', dialCode: '1' },
    { id: 'UY', text: 'Uruguay (+598)', dialCode: '598' },
    { id: 'VE', text: 'Venezuela (+58)', dialCode: '58' },
    { id: 'VN', text: 'Vietnam (+84)', dialCode: '84' },
    { id: 'YE', text: 'Yemen (+967)', dialCode: '967' },
];


$(document).ready(function() {
    $('#pais').select2({
        placeholder: "Selecciona tu país...",
        allowClear: true,
    });

    countriesData.forEach(country => {
        const newOption = new Option(country.text, country.id, false, false);
        $('#pais').append(newOption);
    });
    $('#pais').trigger('change'); 

    const phoneInputField = document.querySelector("#telefono");
    telInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true, 
    });

    phoneInputField.addEventListener("countrychange", function() {
        const selectedCountryData = telInput.getSelectedCountryData();
        const countryCode = selectedCountryData.iso2.toUpperCase(); 

        if (countryCode) {
            $('#pais').val(countryCode).trigger('change');
        }
    });

    phoneInputField.addEventListener("input", function() {
        const dialCode = telInput.getSelectedCountryData().dialCode;

        if (dialCode) {
            const matchedCountry = countriesData.find(country => country.dialCode === dialCode);
            if (matchedCountry) {
                $('#pais').val(matchedCountry.id).trigger('change');
            }
        }
    });

    $('#pais').on('select2:select', function (e) {
        const countryId = e.params.data.id;
        const selectedCountry = countriesData.find(c => c.id === countryId);
        if (selectedCountry) {
            telInput.setCountry(selectedCountry.id.toLowerCase()); 
        }
    });
});
