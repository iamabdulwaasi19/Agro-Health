const OpenAI = require("openai");
const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: "YOUR_OPENROUTER_FREE_KEY", // Get one for free at openrouter.ai
// });


/**
 * Analyzes an image of a plant leaf using OpenAI's Vision capabilities.
 * @param {string} filePath - Local path to the image file.
 * @param {string} mimeType - The MIME type (e.g., 'image/jpeg' or 'image/png').
 * @returns {Promise<Object>} - Parsed JSON analysis of the plant health.
 */
async function analyzeImage(filePath, mimeType) {
  try {
    // Read the file and convert it to a base64 string
    const base64Image = fs.readFileSync(filePath, {
      encoding: "base64"
    });

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

    // In your function call, use a free model:
// const response = await openai.chat.completions.create({
//   model: "google/gemini-pro-1.5-exp:free", // or any model marked ':free'
//   messages: [
//     {
//           role: "user",
//           content: [
//             { type: "text", text: prompt },
//             {
//               type: "image_url",
//               image_url: {
//                 // Ensure the mimeType is passed correctly (e.g., image/jpeg)
//                 url: `data:${mimeType};base64,${base64Image}`
//               }
//             }
//           ]
//         }
//   ],
// //   Adding response_format helps ensure the model outputs valid JSON
//     response_format: { type: "json_object" }
// });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                // Ensure the mimeType is passed correctly (e.g., image/jpeg)
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      // Adding response_format helps ensure the model outputs valid JSON
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;

    // Even with instructions, AI sometimes adds markdown. 
    // This regex strips markdown code block markers safely.
    const cleanJsonString = content.replace(/^```json\s*|```$/g, "").trim();

    return JSON.parse(cleanJsonString);

  } catch (error) {
    // Log the specific error for debugging
    console.error("OpenAI Analysis Error:", error.message);
    throw new Error("Failed to analyze image: " + error.message);
  }
}

module.exports = { analyzeImage };