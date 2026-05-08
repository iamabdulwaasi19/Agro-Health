// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const axios = require('axios')

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: fs.readFileSync(path).toString("base64"),
//       mimeType,
//     },
//   };
// }

// async function analyzeImage(filePath, mimeType) {
//   try {
//     let imageBase64;

//     if (filePath.startsWith('http')) {
//       // If it's a Cloudinary URL, fetch it
//       const response = await axios.get(filePath, { responseType: 'arraybuffer' });
//       imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
//     } else {
//       // If it's a local path
//       imageBase64 = fs.readFileSync(filePath).toString("base64");
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use stable model name

//     const imagePart = {
//       inlineData: {
//         data: imageBase64,
//         mimeType,
//       },
//     };

// async function analyzeImage(filePath, mimeType) {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash", 
//       systemInstruction: "You are a professional plant pathologist. Analyze images and output ONLY valid JSON.",
//       generationConfig: {
//         responseMimeType: "application/json",
//       },
//     }, { apiVersion: 'v1beta' }); 

//     const prompt = `
//   Analyze the uploaded image of a plant leaf as an high level expert agriculturalist and renowned professional plant pathologist.
  
//   Provide a response in strict JSON format with the following structure:
//   {
//     "detected": boolean,
//     "disease_name": "Common name of the disease",
//     "scientific_name": "Latin name in italics",
//     "severity": "Low" | "Moderate" | "Severe",
//     "confidence": number,
//     "description": "A brief explanation of the disease and how it spreads",
//     "symptoms": ["list", "of", "4-5", "key", "visual", "symptoms"],
//     "treatment": {
//       "immediate_actions": ["list", "of", "organic/chemical", "steps"],
//       "prevention_tips": ["list", "of", "long-term", "preventative", "measures"]
//     }
//   }

//   Output ONLY the raw JSON string.
// `;

//     const imagePart = fileToGenerativePart(filePath, mimeType);

//     const result = await model.generateContent([prompt, imagePart]);

//     return JSON.parse(result.response.text());

//   } catch (error) {
//     console.error("Gemini Analysis Error details:", error.message);
//     throw new Error("Failed to analyze image: " + error.message);
//   }
// }

// module.exports = { analyzeImage };


const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const axios = require('axios');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeImage(filePath, mimeType) {
  try {
    let imageBase64;

    // 1. Handle image retrieval (Cloudinary URL vs Local Path)
    if (filePath.startsWith('http')) {
      const response = await axios.get(filePath, { responseType: 'arraybuffer' });
      imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    } else {
      imageBase64 = fs.readFileSync(filePath).toString("base64");
    }

    // 2. Initialize Model (Using 1.5-flash for stability)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      systemInstruction: "You are a professional plant pathologist. Analyze images and output ONLY valid JSON.",
    }, { apiVersion: 'v1beta' }); 

    const prompt = `
      Analyze the uploaded image of a plant leaf as an high level expert agriculturalist and renowned professional plant pathologist.
      
      Provide a response in strict JSON format with the following structure:
      {
        "detected": boolean,
        "disease_name": "Common name of the disease",
        "scientific_name": "Latin name in italics",
        "severity": "Low" | "Moderate" | "Severe",
        "confidence": number,
        "description": "A brief explanation of the disease and how it spreads",
        "symptoms": ["list", "of", "4-5", "key", "visual", "symptoms"],
        "treatment": {
          "immediate_actions": ["list", "of", "organic/chemical", "steps"],
          "prevention_tips": ["list", "of", "long-term", "preventative", "measures"]
        }
      }
      Output ONLY the raw JSON string.
    `;

    // 3. Construct the image part for Gemini
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    // 4. Generate Content
    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    return JSON.parse(responseText);

  } catch (error) {
    console.error("Gemini Analysis Error details:", error.message);
    throw new Error("Failed to analyze image: " + error.message);
  }
}

module.exports = { analyzeImage };