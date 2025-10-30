# **Healthcare-Chatbot**
A lightweight and interactive healthcare chatbot built using **Node.js** for the backend and **HTML/CSS/JavaScript** for the frontend.
It helps users with basic health-related queries, symptom checks, and wellness tips through a friendly chat interface.
---
## **Features :**

   1. Answers general health and symptom-related questions.
   2. Clean and responsive chat interface.
   3. Integrates OpenAI API for intelligent responses.
   4. Simple structure — easy to update or extend.
   5. Data-driven — new conditions can be added easily.
 ---  
## **Project Structure**

Healthcare-Chatbot/
├── backend/        # Handles API requests, logic, and chatbot responses  
├── frontend/       # User interface (HTML, CSS, JS)  
├── .gitignore      # Ignored files  
├── README.md       # Project documentation  

---
## **Setup Instructions**

**1. Clone the repository**
**2. Install dependencies**
npm install

**3. Create ```.env``` file in ```backend/``` folder**
Add the following content: OPENAI_API_KEY=your_openai_api_key

Replace ```your_openai_api_key``` with your actual OpenAI API key.

**4. Run the backend**
node index.js

You should see: Backend running on http://localhost:5000

**5. Open the frontend**
Open ```frontend/index.html``` in your browser and start chatting!

---
**How It Works?**

User sends a message → request goes to backend
Backend uses OpenAI API to process and generate a response
Reply is displayed in the chat interface
You can also customize the data and logic by editing backend/data/conditions.json.

---
**⚙ Notes**

The ```.env``` file is ignored and will not be uploaded to GitHub.
You can add more diseases in ```backend/data/diseases.json.```
This project is for learning purposes.

---
**Your friendly health companion — in code.**
