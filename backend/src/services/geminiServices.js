const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeImage(fileBuffer, mimeType) {
  try {
    // Convert image buffer to base64
    const imageBase64 = fileBuffer.toString("base64");

    // Initialize Model (Using 2.5-flash for stability)
    const model = genAI.getGenerativeModel(
      {
        model: "gemini-2.5-flash",
        systemInstruction:
          "You are a professional plant pathologist. Analyze images and output ONLY valid JSON.",
        generationConfig: {
          responseMimeType: "application/json",
        },
      },
      { apiVersion: "v1beta" },
    );

    // Gemini prompt for diagnosis
    const prompt = `
      Analyze the uploaded image of a plant leaf as an high level expert agriculturalist and worldwide renowned professional plant pathologist.
      
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

    // Construct the image part for Gemini
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    // Generate Content
    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Gemini Analysis Error details:", error.message);
    throw new Error("Failed to analyze image: " + error.message);
  }
}

module.exports = { analyzeImage };
