## PROJECT SETUP INSTRUCTIONS

#### ENVIRONMENT SETUP

### 🔑 Environment Setup
Create a `.env` file inside the `backend` folder using the template below:

```
PORT=3000
CLIENT_URL=http://localhost:5173
DB_FILE=./app.db
VITE_OPENAI_API_KEY=Your_Open_Api_Key_Here
VITE_GEMINI_API_KEY=Place_your_Gemini_Api_Key_Here  
```
Refer to `backend/.env.example` for this required keys.
- Replace `VITE_OPENAI_API_KEY`, `VITE_GEMINI_API_KEY` with your own API Keys

### Project Setup Instructions

#### 1. Clone the repo
```
git clone https://github.com/Venkata-Nageswara-Bhadri78/AI-Product-Advisor.git
cd AI-Product-Advisor.git
```

#### 2. Setup Backend
Open terminal and move to backend `cd backend` and run below commands
- Here you have to do the environment setup and the run below commands
```
npm install
npm start
```

- This will print the output
```
🚀 Server running at http://localhost:3000
SQL connected Sucessfully
HISTORY TABLE CREATED
```

Means the backend setup is **SUCESS**.

#### 3. Setup Frontend
- Open a new terminal tab
- Move to frontend `cd frontend/AI-Product-Advisor` and run below commands
```
npm install
npm run dev
```


#### 4. Open and Explore the App

- This will start the local server at http://localhost:5173/
- Open the local server and explore the project