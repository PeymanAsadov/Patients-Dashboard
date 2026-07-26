# 🏥 Tech.Care

**Modern Patient Management Dashboard**

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-Data_Viz-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

![Live API](https://img.shields.io/badge/Live-API-success?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)
![Search](https://img.shields.io/badge/Smart-Search-orange?style=for-the-badge)
![Charts](https://img.shields.io/badge/Blood_Pressure-Charts-blue?style=for-the-badge)
![Modal](https://img.shields.io/badge/Patient-Modal-purple?style=for-the-badge)
![Skeleton Loading](https://img.shields.io/badge/Skeleton-Loading-black?style=for-the-badge)

A modern, clinic-ready patient dashboard built with React and Tailwind CSS, giving doctors a fast, clean overview of patient records, vital signs, and diagnosis history — all fetched live from a real API.

## ✨ Features

### 🩺 Patient Overview
- Live patient list fetched from a real API
- Real-time search by patient name
- Keyboard navigation (arrow keys, Enter, Esc)
- Auto-scroll to selected patient in the list
- Click-to-select patient details

### 📊 Diagnosis & Vitals
- Interactive blood pressure chart (Systolic / Diastolic) powered by Chart.js
- Respiratory rate, temperature, and heart rate indicators
- Diagnostic list — table view on desktop, card view on mobile

### 👤 Patient Details
- Date of birth, gender, contact info
- Emergency contact & insurance provider
- "Show All Information" modal with full patient profile
- Lab results panel

### 📱 Responsive Design
- Fully responsive across mobile, tablet (iPad), and desktop
- Adaptive layouts: table → card view, multi-column → stacked
- Touch-friendly UI on smaller screens

### ⏳ Polished UX
- Skeleton loading screens while fetching data
- Smooth transitions and hover states
- Clean, minimal, hospital-friendly color palette

## ⚙️ Built With

- React (Hooks: `useState`, `useEffect`, `useMemo`, `useRef`)
- Tailwind CSS
- Vite
- Chart.js + react-chartjs-2
- Fetch API + AbortController

Each patient record includes: `name`, `age`, `gender`, `profile_picture`, `date_of_birth`, `phone_number`, `emergency_contact`, `insurance_type`, `diagnosis_history`, `diagnostic_list`, `lab_results`.

## 📂 Project Structure

```
src/
├── App.jsx                 # Root component
├── HealthCare.jsx           # PatientDashboard — data fetching, state management
├── navbar.jsx                # Navigation bar + search panel
├── DiagnosisHistory.jsx      # Blood pressure chart, vital signs, diagnostic list
├── PatientsDetails.jsx       # Patient details, lab results, modal
├── assets/                   # Logo, doctor image
└── icons/                    # Icons
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs by default at `http://localhost:5173`.

## 📱 Responsive Breakpoints

| Screen | Layout |
|---|---|
| **Mobile** (`< 640px`) | Diagnostic list as cards, 2-column vitals |
| **Tablet** (`640–1024px`) | 3-column vitals, intermediate layout |
| **Desktop** (`≥ 1024px`) | Full 4-column grid dashboard |

## 🔮 Future Improvements

- Debounced search for larger datasets
- Filter diagnostic list by status
- Downloadable lab result files
- Dark mode support

---

**Author:** Peyman Asadov
**Project type:** Frontend portfolio project
