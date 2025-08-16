document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const audioForm = document.getElementById('audio-form');
    const audioStatus = document.getElementById('audio-status');
    const ttsForm = document.getElementById('tts-form');
    const ttsStatus = document.getElementById('tts-status');
    const fileInput = document.getElementById('audio-file-input');
    const fileNameDisplay = document.getElementById('file-name');
    
    // --- Localization Data ---
    const translations = {
        en: {
            app_title: "Audio Transformation Suite 🎧",
            converter_title: "Audio Converter (Lofi + Slowed + Reverb)",
            upload_label: "Choose Audio File",
            no_file_chosen: "No file chosen",
            tempo_label: "Slowed Tempo",
            reverb_label: "Reverb Amount",
            lofi_label: "Lofi Filter (Low-Pass Hz)",
            process_btn: "Process Audio",
            tts_title: "Text-to-Human-like-Voice",
            tts_input_label: "Enter Text",
            language_label: "Language",
            voice_style_label: "Voice Style",
            female_voice: "Female",
            male_voice: "Male",
            generate_btn: "Generate Speech",
            processing_msg: "Processing, please wait...",
            generating_msg: "Generating speech, please wait...",
            download_ready: "Your file is ready! Click to Download",
            error_msg: "An error occurred. Please try again."
        },
        hi: {
            app_title: "ऑडियो ट्रांसफॉर्मेशन सुइट 🎧",
            converter_title: "ऑडियो कनवर्टर (लो-फाई + स्लो + रिवर्ब)",
            upload_label: "ऑडियो फ़ाइल चुनें",
            no_file_chosen: "कोई फ़ाइल नहीं चुनी गई",
            tempo_label: "धीमी गति",
            reverb_label: "रिवर्ब की मात्रा",
            lofi_label: "लो-फाई फ़िल्टर (लो-पास हर्ट्ज)",
            process_btn: "ऑडियो प्रोसेस करें",
            tts_title: "टेक्स्ट-से-मानव-जैसी-आवाज़",
            tts_input_label: "टेक्स्ट दर्ज करें",
            language_label: "भाषा",
            voice_style_label: "आवाज़ की शैली",
            female_voice: "महिला",
            male_voice: "पुरुष",
            generate_btn: "आवाज़ उत्पन्न करें",
            processing_msg: "प्रोसेस हो रहा है, कृपया प्रतीक्षा करें...",
            generating_msg: "आवाज़ उत्पन्न हो रही है, कृपया प्रतीक्षा करें...",
            download_ready: "आपकी फ़ाइल तैयार है! डाउनलोड करने के लिए क्लिक करें",
            error_msg: "एक त्रुटि हुई। कृपया पुन: प्रयास करें।"
        }
    };

    // --- Language Switcher Logic ---
    const langEnBtn = document.getElementById('lang-en');
    const langHiBtn = document.getElementById('lang-hi');

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            el.innerText = translations[lang][key];
        });
        document.querySelector('html').lang = lang;
        langEnBtn.classList.toggle('active', lang === 'en');
        langHiBtn.classList.toggle('active', lang === 'hi');
    };

    langEnBtn.addEventListener('click', () => updateLanguage('en'));
    langHiBtn.addEventListener('click', () => updateLanguage('hi'));

    // Set initial language
    updateLanguage('en');

    // --- UI Helpers ---
    const showStatus = (element, message, type = 'loading') => {
        let content = '';
        if (type === 'loading') {
            content = `<p class="loading">${message}</p>`;
        } else if (type === 'error') {
            content = `<p class="error">${message}</p>`;
        } else if (type === 'download') {
            const downloadText = document.documentElement.lang === 'hi' ? translations.hi.download_ready : translations.en.download_ready;
            content = `<a href="${message}" download="processed_audio.mp3">${downloadText}</a>`;
        }
        element.innerHTML = content;
    };

    const getLang = () => document.documentElement.lang;

    // --- Dynamic Slider Value Display ---
    const sliders = [
        { id: 'slowed-tempo', display: 'tempo-value', unit: 'x', isFloat: true },
        { id: 'reverb-amount', display: 'reverb-value', unit: '%' },
        { id: 'lofi-filter', display: 'lofi-value', unit: ' Hz', offValue: 'Off' },
    ];

    sliders.forEach(({ id, display, unit, isFloat, offValue }) => {
        const slider = document.getElementById(id);
        const displayEl = document.getElementById(display);
        slider.addEventListener('input', () => {
            if (offValue && slider.value == 0) {
                displayEl.textContent = offValue;
            } else {
                 displayEl.textContent = isFloat ? parseFloat(slider.value).toFixed(2) + unit : slider.value + unit;
            }
        });
    });
    
    // Display file name on selection
    fileInput.addEventListener('change', () => {
        fileNameDisplay.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : translations[getLang()].no_file_chosen;
    });

    // --- Form Submission Handlers ---
    
    // 1. Audio Processing Form
    audioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = audioForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        showStatus(audioStatus, translations[getLang()].processing_msg, 'loading');

        const formData = new FormData();
        formData.append('audio_file', fileInput.files[0]);
        formData.append('slowed_tempo', document.getElementById('slowed-tempo').value);
        formData.append('reverb_amount', document.getElementById('reverb-amount').value);
        formData.append('lofi_filter', document.getElementById('lofi-filter').value);

        try {
            const response = await fetch('/process-audio', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            showStatus(audioStatus, url, 'download');

        } catch (error) {
            console.error('Error processing audio:', error);
            showStatus(audioStatus, `${translations[getLang()].error_msg} (${error.message})`, 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });

    // 2. Text-to-Speech Form
    ttsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = ttsForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        showStatus(ttsStatus, translations[getLang()].generating_msg, 'loading');

        const text = document.getElementById('tts-text').value;
        const language = document.getElementById('tts-language').value;
        const voice = document.getElementById('tts-voice').value;

        try {
            const response = await fetch('/generate-tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, language, voice })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error');
            }
            
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const downloadText = document.documentElement.lang === 'hi' ? translations.hi.download_ready : translations.en.download_ready;
            ttsStatus.innerHTML = `<a href="${url}" download="generated_speech.mp3">${downloadText}</a>`;

        } catch (error) {
            console.error('Error generating speech:', error);
            showStatus(ttsStatus, `${translations[getLang()].error_msg} (${error.message})`, 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });
});
