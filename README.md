

# **HCI Website Project** (CORPUZ)  
### **Created by:   Group 1 - BSIT1-12
*A website that provides workout guides.*

---

## **📥 Download & Installation Guide**  
1. Download the project files.  
2. Unzip the downloaded file.  
3. Open `HOMEPAGE.HTML` in a web browser to start using the website.  

---

## **📌 Usage Guide**  
- **Search for Workouts:** Use the search bar to find workouts by name, body part, equipment, muscle, or exercise type.  
- **Category Search:** Click on a category button for quick access to specific workout types.  
- **BMI Calculator:** Use the built-in BMI calculator to track fitness progress.  
- **Pinned Workouts:** Save your favorite workouts for easy access.  

---

## **🔥 Features**  
✔ **Search Workouts** by:  
   - Name  
   - Body Part  
   - Equipment  
   - Muscle Name  
   - Exercise Type  

✔ **Categorical Search** – Find workouts based on predefined categories.  
✔ **BMI Calculator** – Calculate and track Body Mass Index.  
✔ **Pinned Workouts** – Save workouts for future reference.  

---



🛠 **Prototype Files:**  
- `MAIN MENU`, `PROTOTYPES`, and `WEBSITE APPEARANCE FILES` are **test files** used for developing features.  
- You **can modify them** to integrate with `HOMEPAGE.HTML`.  

---

### ✅ **Improvements Made:**  
✔ Clear **headings and formatting** for easy readability.  
✔ Used **bullet points** instead of long paragraphs.  
✔ **Emphasized key points** (e.g., API Key requirement).  
✔ **More structured layout** to make it look professional.  



## **🔧 Installation & Dependencies**  
This project uses **HTML, CSS, and JavaScript** (no additional package installations needed).  

However, an **API key is required** to fetch workout data.  

---

## **🔑 API Key Requirement**  
This project **requires an API key** from **ExerciseDB API** to function properly.  

### **📌 How to Get an API Key?**  
1. **Go to RapidAPI** → [ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)  
2. **Sign up / Log in** to RapidAPI.  
3. **Subscribe to the API** (free or paid plan).  
4. **Copy your API key** from the **"X-RapidAPI-Key"** section.




### **🔧 How to Use Your API Key?**  
Replace `YOUR_API_KEY_HERE` in `script.js` with your actual API key:  

```javascript
const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "SECRET",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
  }
};



