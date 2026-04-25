const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType,
    },
  };
}

async function analyzeImage(filePath, mimeType) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      systemInstruction: "You are a professional plant pathologist. Analyze images and output ONLY valid JSON.",
      generationConfig: {
        responseMimeType: "application/json",
      },
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

    const imagePart = fileToGenerativePart(filePath, mimeType);

    // Send to Gemini
    const result = await model.generateContent([prompt, imagePart]);

    // Parse the result
    return JSON.parse(result.response.text());

  } catch (error) {
    console.error("Gemini Analysis Error details:", error.message);
    throw new Error("Failed to analyze image: " + error.message);
  }
}

module.exports = { analyzeImage };