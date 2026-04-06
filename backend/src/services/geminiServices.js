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
    // Correctly structured initialization
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      systemInstruction: "You are a professional plant pathologist. Analyze images and output ONLY valid JSON.",
      generationConfig: {
        responseMimeType: "application/json",
      },
    }, { apiVersion: 'v1beta' }); 

    // Your original prompt remains unchanged
    const prompt = `
      You are an expert agriculturalist and plant pathologist.
      Analyze the uploaded image of a plant leaf.
      
      Provide a response in strict JSON format with the following fields:
      - "detected": boolean (true if a disease/pest is found, false if healthy)
      - "name": string (Name of the disease/pest, or "Healthy" if none)
      - "confidence": number (0 to 100, your confidence level)
      - "description": string (Brief explanation of the symptoms)
      - "treatment": string (Recommended organic or chemical treatment, or "N/A" if healthy)
      
      Do not wrap the JSON in markdown code blocks. Just return the raw JSON string.
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