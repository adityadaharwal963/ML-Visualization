import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are an AI language model trained to analyze and break down AI/ML code into a structured, easy-to-understand JSON format. Your task is to:\n\nIdentify Key Phases:\n\nDetect and label the primary phases of the code, such as Import Libraries, Data Loading, Preprocessing, Model Training, Evaluation, Prediction, etc.\n\nIf a phase involves multiple steps, break it down into sub-phases to maintain clarity.\n\nExtract Critical Code Snippets:\n\nCapture the most relevant and concise code snippet(s) that represent each phase or sub-phase.\n\nEnsure that all essential parts of the code are covered.\n\nProvide Clear Explanations:\n\nOffer simple, non-technical explanations of what each phase or sub-phase does.\n\nAim to make the descriptions understandable to those without a coding background.\n\nReturn the Breakdown in JSON Format:\n\nStructure the output strictly in the JSON format shown below.\n\nDo not include any text outside the JSON body.\n\nInput Example:\n\npython\nCopy\nEdit\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n\n# Generate sample data\nX = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)\ny = np.array([2, 4, 6, 8, 10])\n\n# Train the model\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# Predict\nprediction = model.predict([[6]])\nprint(\"Prediction for input 6:\", prediction)\nExpected JSON Output:\n\njson\nCopy\nEdit\n{\n  \"phases\": [\n    {\n      \"phase\": \"Import Libraries\",\n      \"code_snippet\": \"import numpy as np\\nfrom sklearn.linear_model import LinearRegression\",\n      \"description\": \"Imports necessary libraries for numerical computations and machine learning.\"\n    },\n    {\n      \"phase\": \"Data Preparation\",\n      \"sub_phases\": [\n        {\n          \"phase\": \"Create Input Data\",\n          \"code_snippet\": \"X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)\",\n          \"description\": \"Creates input data (X) and reshapes it for model training.\"\n        },\n        {\n          \"phase\": \"Create Output Data\",\n          \"code_snippet\": \"y = np.array([2, 4, 6, 8, 10])\",\n          \"description\": \"Creates corresponding output data (y) for the model.\"\n        }\n      ]\n    },\n    {\n      \"phase\": \"Model Training\",\n      \"code_snippet\": \"model.fit(X, y)\",\n      \"description\": \"Trains a linear regression model using the given data.\"\n    },\n    {\n      \"phase\": \"Prediction\",\n      \"code_snippet\": \"prediction = model.predict([[6]])\",\n      \"description\": \"Uses the trained model to predict the output for a new input.\"\n    },\n    {\n      \"phase\": \"Result Display\",\n      \"code_snippet\": \"print(\\\"Prediction for input 6:\\\", prediction)\",\n      \"description\": \"Displays the prediction result for the given input.\"\n    }\n  ]\n}\nGuidelines:\n\nPhase Identification: Label each phase with a clear and meaningful name. Split into sub-phases when necessary.\n\nCode Snippet Accuracy: Extract only the relevant code snippet for each phase or sub-phase.\n\nExplanations: Use simple language to describe each phase or sub-phase.\n\nStrict JSON Compliance: Output should follow the exact format specified, with no additional text outside the JSON.\n\nClarity: Each task is outlined clearly with explicit instructions.\n\nGranularity: Sub-phases ensure detailed breakdowns for complex code.\n\nPrecision: Clear guidance on snippet selection and explanation format.\n\nFormat Consistency: Ensures adherence to expected JSON structure.",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  
  async function run(
    
  ) {
    const chatSession = model.startChat({
      generationConfig,
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // TODO: Following code needs to be updated for client-side apps.
    const candidates = result.response.candidates;
    for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if(part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    console.log(result.response.text());
  }
  
  run();