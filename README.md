# 🌱 Soil Farming Agent

A modern web application built with **HTML, CSS, JavaScript, and Firebase** for managing soil information and crop distributor details.  
This project helps farmers and users understand soil types, their characteristics, and suitable crops, while also connecting them with crop/seed distributors.  

---

## 📖 Overview

Soil is a crucial component of agriculture. Different types of crops grow best in specific soils, each having unique characteristics.  
The **Soil Farming Agent** application bridges the gap between soil experts, distributors, and users by providing updated information about soils and distributor details.

---

## ✨ Features & Modules

### 👩‍💻 Admin
- Login to admin panel  
- Post soil details (soil type, characteristics, suitable crops)  
- Post distributor details (distributor name, location, crops/seeds supplied)  

### 👨‍🌾 User
- Register and login  
- View soil details with characteristics and crop suitability  
- View distributor details to find nearby suppliers  

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend & Database:** Firebase (Authentication, Firestore, Storage)  
- **Hosting:** Firebase Hosting / Cloud deployment  
- **Other:** Logging using JavaScript libraries  

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add your Firebase credentials.  

Example (`.env.example`):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
👉 Replace placeholder values with actual Firebase credentials from your Firebase Console.

⚡ Setup Instructions
Clone the Repository

git clone https://github.com/your-username/soil-farming-agent.git
cd soil-farming-agent
Install Dependencies
(If using a bundler or npm setup)

npm install
Setup Environment Variables

Copy .env.example → .env.local

Add your Firebase credentials inside .env.local

Run the Application Locally

If using pure HTML/JS, open index.html in your browser

If using npm with Firebase hosting:

npm run dev
Deploy to Firebase Hosting

firebase deploy

📂 Project Structure

soil-farming-agent/
├── index.html          # Entry point
├── style.css           # Styles
├── app.js              # Core logic and Firebase integration
├── components/         # Reusable components (if modularized)
├── services/           # Firebase services
├── .env.local          # Firebase secrets (NOT committed)
├── .env.example        # Template for environment variables
└── README.md           # Project documentation

🧪 Evaluation Metrics
Code Quality: Modular, clean, and readable code

Safe: Secure use of Firebase Auth & Firestore

Testable: Functions can be tested independently

Maintainable: Scalable structure for future features

Portable: Works across OS environments

🧪 Test Cases
✅ User registration/login works correctly

✅ Admin can successfully add soil and distributor details

✅ Soil details are fetched correctly from Firestore

✅ Distributors can be filtered and displayed properly

✅ Unauthorized users cannot access admin-only features

📜 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute with attribution.