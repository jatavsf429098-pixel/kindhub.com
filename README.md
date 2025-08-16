# Full-Stack Audio Transformation Web Application 🎶

This is a complete, production-ready web application that serves as a powerful, user-friendly audio manipulation tool. It allows users to apply a combination of **Lofi, Slowed, and Reverb** effects to their audio files and also features a high-quality **Text-to-Speech** generator with multilingual support.

## ✨ Features

* **Audio Converter Module:**
    * Upload MP3, WAV, or FLAC files.
    * Interactively control the intensity of effects:
        * **Slowed Tempo:** Adjust playback speed from 0.5x to 1.0x.
        * **Reverb:** Add spatial echo effects.
        * **Lofi Filter:** Apply a low-pass filter for a classic lofi sound.
    * Instantly download the processed audio.
* **Text-to-Speech Module:**
    * Convert multi-line text into realistic, human-like speech.
    * Select from multiple languages (English, Hindi, Spanish).
    * Choose a voice style (Male/Female).
    * Download the generated speech as an MP3.
* **Modern & Responsive UI:**
    * A clean, single-page application built with a dark theme.
    * Fully responsive design that works on desktop, tablets, and mobile.
    * **Multilingual Interface:** Easily switch between **English** and **Hindi**.



## 🛠️ Technology Stack

### Backend
* **Framework:** **Python (Flask)**
    * *Justification:* Python is an excellent choice for audio processing due to its extensive ecosystem of powerful libraries. Flask is a lightweight and flexible framework that is perfect for building the required API endpoints without unnecessary overhead.
* **Audio Processing:** **pydub**
    * *Justification:* `pydub` is a high-level library that provides a simple and intuitive API for complex audio manipulations like slicing, filtering, and effects, acting as a wrapper around the industry-standard **FFmpeg**.
* **Text-to-Speech:** **gTTS (Google Text-to-Speech)**
    * *Justification:* The `gTTS` library offers a straightforward way to interface with Google's Text-to-Speech API, providing high-quality voices for multiple languages without requiring complex API key setups for basic use.

### Frontend
* **HTML5, CSS3, JavaScript (Vanilla)**
    * *Justification:* Using vanilla technologies ensures the application is lightweight, fast, and has no external frontend dependencies. This simplifies the development and deployment process. Modern CSS (Flexbox, Grid) is used for a professional and responsive layout.

## 📁 Project Structure
```
/
├── app.py                  # Main Flask backend server logic
├── requirements.txt        # Python dependencies
├── README.md               # This file
├── templates/
│   └── index.html          # Frontend HTML structure
├── static/
│   ├── style.css           # CSS for styling
│   └── script.js           # JavaScript for UI logic and API calls
├── uploads/                # Temporary storage for uploaded files (auto-created)
└── processed/              # Temporary storage for output files (auto-created)

```

## 🚀 Setup and Installation

Follow these steps to get the application running on your local machine.

### 1. Prerequisites
* **Python 3.7+:** Ensure you have Python installed.
* **pip:** Python's package installer.
* **FFmpeg:** This is a crucial dependency for `pydub` to function correctly.
    * **Windows:** Download from the [official FFmpeg site](https://ffmpeg.org/download.html) and add the `bin` folder to your system's PATH.
    * **macOS (using Homebrew):** `brew install ffmpeg`
    * **Linux (using apt):** `sudo apt update && sudo apt install ffmpeg`

### 2. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 3. Set Up a Virtual Environment
It's highly recommended to use a virtual environment to manage project dependencies.
```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 4. Install Dependencies
Install all the required Python packages from the `requirements.txt` file.
```bash
pip install -r requirements.txt
```

### 5. Run the Application
Start the Flask server.
```bash
python app.py
```

### 6. Access the Application
Open your web browser and navigate to:
**http://127.0.0.1:5000**

You should now see the application running and be able to use all its features!
