# AI-Powered Lesson Planner

## 🚀 Project Overview

The AI-Powered Lesson Planner is a React.js-based web application designed to assist educators in generating structured lesson plans using AI. It utilizes ShadCN for UI components and integrates the Google Gemini API (free version) to dynamically generate lesson content. The entire project runs on the frontend, requiring no backend or database.

## 📜 Installation & Setup

### 1. Get a free Gemini API key from google [aistudio](https://aistudio.google.com/apikey)

### 2. Clone the repository
`git clone https://github.com/your-username/ai-lesson-planner.git`
`cd ai-lesson-planner`

### 3. Create a .env file in root directory of the project

### 4. Add your Gemini API key in .env file (see ".env.example" file for reference)

### 5. Install dependencies
`npm install`

### 6. Run the development server
`npm run dev`


## Current state:

#### Dummy Authentication
Simple login form (Email: demouser, Password: demopass).

No actual authentication; login handled via local state.

#### Lesson Plan Form (User Input)
Fields: Topic, Grade Level, Main Concept & Subtopics, Materials Needed, Learning Objectives, Lesson Outline.

#### AI-Powered Lesson Generation
Fetches AI-generated content via the Google Gemini API.
Generates lesson outlines, classroom activities, and assessments.

#### Manual Editing & Formatting
Users can edit AI-generated content before finalizing.

#### PDF Export
Converts the structured lesson plan into a downloadable PDF using react-to-print.

#### No Backend, No Database
All data is managed on the client side (React state or localStorage).
No SQL/MongoDB required.

## 🛠 Tech Stack

Frontend: React.js (Vite)
UI Components: ShadCN + TailwindCSS
API Integration: Google Gemini API (free version)
PDF Handling: react-to-print

## 📌 Future Enhancements
Support for multiple plans generation saving.
Improved UI/UX with drag-and-drop editing.