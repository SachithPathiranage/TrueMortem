# **TrueMortem: Cause of Death Prediction & Analysis System**  

TrueMortem is an AI-driven system designed to predict and analyze causes of death, with a specific focus on heart disease-related fatalities. The system integrates structured and unstructured autopsy data to enhance forensic and public health investigations. It also provides an interactive dashboard and chatbot for result visualization and user interaction.

---

## 🧠 Project Overview

### 📊 Data Collection & Preprocessing
- Collected **structured autopsy data** including demographics, medical history, and injury details.
- Sourced **unstructured postmortem records** related to heart diseases from **Kurunegala General Hospital**, Sri Lanka.
- Integrated **verbal autopsy data** from the **PHMRC Gold Standard VA Validation** dataset.
- Applied preprocessing steps to clean, encode, and prepare the data for machine learning.

### 🤖 Model Development
- Built two distinct ML models:
  - 🧬 Structured Data Model: Based on postmortem medical records.
  - 🗣️ Verbal Autopsy Model: Based on patient interviews and unstructured narratives.
- Used ML algorithms such as:
  - 🌲 Random Forest
  - ⚡ XGBoost
  - 🧮 Naive Bayes
  - 🧠 Neural Networks
- Focused on **classifying deaths due to heart disease**.

### 📈 Dashboard for Visualization
- Interactive interface to display:
  - ✅ Predicted causes of death
  - 📉 Confidence levels
  - 🔍 Key features contributing to predictions
- Designed for use by **forensic experts** and **public health professionals**.

### 💬 Chatbot Assistant
- Built with **Rasa** framework
- Offers:
  - 🤔 Query answering
  - 📚 Explanation of results
  - 🧪 Exploration of postmortem data insights

### 🔐 **User Authentication**: 
- Secure login/signup functionality using MongoDB.

---

## **🛠️ Installation & Setup**
Follow these steps to set up and run TrueMortem on your local machine.

### **📌 Prerequisites**
- **Python** (3.10 or less version recommended)
- **Node.js** (for frontend)
- **MongoDB** (for backend storage)
- **Rasa** (for chatbot functionality)

---

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/SachithPathiranage/TrueMortem.git
cd TrueMortem
```

### **2️⃣ Backend Setup**
#### **🔹 Create a Virtual Environment**
```bash
python -m venv venv
```
#### **🔹 Activate the Virtual Environment**
- **Windows (PowerShell):**
  ```powershell
  venv\Scripts\Activate
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

#### **🔹 Install Dependencies**
```bash
pip install -r Application/backend/requirements.txt
```

#### **🔹 Set Up Environment Variables**
Create a `.env` file inside `Application/backend/` and add:
```
MONGO_URI=mongodb://localhost:27017/TrueMortem
OPENROUTER_API_KEY=your_secret_key_here
```

#### **🔹 Run the Backend**
```bash
cd Application/backend/Model_Backend
python main.py
```

---

### **3️⃣ Chatbot Setup**
#### **🔹 Install Rasa**
```bash
pip install rasa==3.6.20
```
#### **🔹 Start the Chatbot**
```bash
cd Application/backend/ChatBot/SecondProject
rasa run --enable-api --cors "*"
```
#### **🔹 Start the Action Server**
In a **new terminal**, run:
```bash
rasa run actions
```

---

### **4️⃣ Frontend Setup**
#### **🔹 Install Dependencies**
```bash
cd Application/frontend/TrueMortem
npm install
```
#### **🔹 Run the Frontend**
```bash
npm run dev
```

---

## **🎯 Running Everything Together**
Instead of running each component separately, you can use a **Git Bash** terminal to launch everything in one go.


1. **Run the script in VS Code PowerShell terminal**:
```gitbash
bash run.sh
```

---

## **📜 License**
This project is licensed under the **MIT License**. Feel free to use and modify it.

## **🤝 Contributing**
We welcome contributions! To contribute:
1. Fork the repo.
2. Create a feature branch.
3. Commit and push your changes.
4. Open a pull request.

## **📧 Contact**
For questions, feel free to reach out at **inquiries@truemortem.com**.

---

### **✨ Enjoy using TrueMortem! 🚀**

