# 📱 Interactive Object Detection Web App using YOLOv8 + React

This is a **real-time object detection web application** that uses **YOLOv8 + FastAPI (Python backend)** and **React.js (frontend)**.  
It detects objects using your **mobile or desktop camera**, displays an emoji + label on top of each object, and clicking on the label redirects you to a relevant link.

---

## 🔍 Features

- Real-time **object detection** using YOLOv8
- Live camera feed from **mobile or desktop**
- Shows a clickable label like **🏏 Cricket**
- Opens a related link on click (e.g., Wikipedia)

---

## 🛠️ Tech Stack

| Component | Technology |
|----------|-------------|
| Backend  | Python, FastAPI, Ultralytics YOLOv8 |
| Frontend | React.js, Axios |
| Camera   | HTML5 `getUserMedia()` API |

---

## 📁 Folder Structure

object-detection-web-app/
├── backend/ # FastAPI + YOLOv8
│ ├── main.py
│ ├── requirements.txt
│ └── yolov8s.pt # YOLOv8 model
├── frontend/ # React app
│ ├── public/
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── objectLinks.js
│ └── package.json
├── README.md


---

## 🚀 Getting Started

---

### 1️⃣ Clone the Repository

``bash
git clone https://github.com/tanush-agarkar/object-detection-web-app.git
cd object-detection-web-app

### 2️⃣ Setup Backend (YOLOv8 + FastAPI)
cd backend
python -m venv venv

# Activate venv:
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

### 3️⃣ Run FastAPI Server
uvicorn main:app --host 0.0.0.0 --port 8000

### 4️⃣ Setup Frontend (React)

cd frontend
npm install

### 5️⃣ Start React Frontend
npm start --host 0.0.0.0


🙋‍♂️ Author
Built by Tanush Agarkar
