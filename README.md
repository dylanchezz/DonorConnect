# 🩸 DonorConnect - Web-Based Blood Donation Request System

DonorConnect is a web-based platform that streamlines blood donation by connecting patients, donors, hospitals, and administrators through a centralized, real-time system. It allows patients in need of blood transfusions to easily request donations and enables donors to quickly locate and respond to requests based on blood type and location.

---



## 📌 Features

### 🧍‍♂️ Patient Module
- Register/login as a patient
- Submit blood donation requests with blood type, urgency, and location
- Track request status and donation history
- Modify or cancel existing requests

### 🩸 Donor Module
- Register/login as a donor
- View real-time donation requests
- Search and filter by blood type, urgency, and location
- Accept or reject requests and contact patients
- View donation history

### 🛡️ Admin Module
- Monitor donation requests and user activity
- Generate system reports

### 🗺️ Geo-Location Features
- Integrated Google Maps API for precise patient/donor location
- Match donors with nearby patients
- View donation hotspots and distribution patterns

---

## 💻 Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Frontend     | React.js            |
| Backend      | Node.js + Express.js|
| Database     | MySQL               |
| APIs         | Google Maps API     |
| Versioning   | Git + GitHub        |
| Testing      | Postman             |

---


### Prerequisites
- Node.js
- MySQL
- Google Maps API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/donorconnect.git
cd DonorConnect

# Install dependencies
npm install

# Start the development server
npm start
```

> Configure `.env` for database and API credentials.

---



## ✅ Testing

The project uses:
- ✅ White-box testing for core logic
- ✅ Black-box testing for user-facing modules

| Module    | Tested Functionality                  | Status |
|-----------|----------------------------------------|--------|
| Patient   | Request creation, location capture     | ✅ Pass |
| Donor     | Search/filter, accept requests         | ✅ Pass |
| Admin     | User approval, report generation       | ✅ Pass |

---

## 📊 System Modules

- **Authentication Module**: JWT-secured login/register
- **Geo-Location Module**: Maps patient/donor proximity
- **Search & Filter**: Find matching requests efficiently
- **System Reports**: Admin analytics dashboard



## 👥 Target Users

- Patients needing blood transfusions
- Regular blood donors
- Hospitals and medical staff
- Blood banks and NGOs

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- React.js
- Node.js
- MySQL
- Google Maps API




