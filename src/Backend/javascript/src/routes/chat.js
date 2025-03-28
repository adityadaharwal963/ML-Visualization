import ollama from 'ollama'
import { Router } from 'express'
import axios from 'axios';
import dotenv from 'dotenv';
const route = Router();
dotenv.config();
const OLLAMA_API_URL = "http://localhost:11434/api/generate";
const context = `
You are an AI language model trained to analyze and break down AI/ML code into structured, easy-to-understand JSON format. Given a machine learning script, your task is to:
1. Identify key phases in the code (e.g., Data Loading, Preprocessing, Model Training, Evaluation, etc.).
2. Extract the most critical code snippet from each phase.
3. Provide a simple, non-technical explanation of what each phase does.
4. Return the breakdown in JSON format as shown in the example below.
Input Example:
python
CopyEdit
import numpy as np
from sklearn.linear_model import LinearRegression

# Generate sample data
X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
y = np.array([2, 4, 6, 8, 10])

# Train the model
model = LinearRegression()
model.fit(X, y)

# Predict
prediction = model.predict([[6]])
print("Prediction for input 6:", prediction)
Expected JSON Output:
json
{
  "phases": [
    {
      "phase": "Import Libraries",
      "code_snippet": "import numpy as np\nfrom sklearn.linear_model import LinearRegression",
      "description": "Imports necessary libraries for numerical computations and machine learning."
    },
    {
      "phase": "Data Preparation",
      "code_snippet": "X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)",
      "description": "Creates input data (X) and reshapes it for model training."
    },
    {
      "phase": "Model Training",
      "code_snippet": "model.fit(X, y)",
      "description": "Trains a linear regression model using the given data."
    },
    {
      "phase": "Prediction",
      "code_snippet": "prediction = model.predict([[6]])",
      "description": "Uses the trained model to predict the output for a new input."
    }
  ]
}
Guidelines:
* no text outside json body.
* Ensure the JSON output follows the structure above .
* Each phase should have a meaningful name.
* The explanation should be simple and easy for non-coders to understand.
* Extract all code snippet from each phase.
* if necessary divide phase in sub-phase and update json accordingly
`

const testPropmt = `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout, GRU, Bidirectional
from tensorflow.keras.optimizers import SGD
from tensorflow.random import set_seed

import yfinance as yf
import os
set_seed(455)
np.random.seed(455)
df = pd.read_csv(
    "/content/Mastercard_stock_history.csv", index_col="Date", parse_dates=["Date"]
).drop(["Dividends", "Stock Splits"], axis=1)
df.head()
df.describe()
df.isna().sum()tstart = 2016
tend = 2020

def train_test_plot(df, tstart, tend):
    df.loc[f"{tstart}":f"{tend}", "High"].plot(figsize=(16, 4), legend=True)
    df.loc[f"{tend+1}":, "High"].plot(figsize=(16, 4), legend=True)
    plt.legend([f"Train (Before {tend+1})", f"Test ({tend+1} and beyond)"])
    plt.title("MasterCard stock price")
    plt.show()
train_test_plot(df,tstart,tend)
def train_test_split(dataset, tstart, tend):
    train = dataset.loc[f"{tstart}":f"{tend}", "High"].values
    test = dataset.loc[f"{tend+1}":, "High"].values
    return train, test
training_set, test_set = train_test_split(df, tstart, tend)
sc = MinMaxScaler(feature_range=(0, 1))
training_set = training_set.reshape(-1, 1)
training_set_scaled = sc.fit_transform(training_set)
X_train = X_train.reshape(X_train.shape[0],X_train.shape[1],features)
# The LSTM architecture
model_lstm = Sequential()
model_lstm.add(LSTM(units=125, activation="tanh", input_shape=(n_steps, features)))
model_lstm.add(Dense(units=1))
# Compiling the model
model_lstm.compile(optimizer="RMSprop", loss="mse")
model_lstm.summary()
dataset_total = df.loc[:,"High"]
inputs = dataset_total[len(dataset_total) - len(test_set) - n_steps :].values
inputs = inputs.reshape(-1, 1)
#scaling
inputs = sc.transform(inputs)

# Split into samples
X_test, y_test = split_sequence(inputs, n_steps)
# reshape
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], features)
#prediction
predicted_stock_price = model_lstm.predict(X_test)
#inverse transform the values
predicted_stock_price = sc.inverse_transform(predicted_stock_price)
 def plot_predictions(test, predicted):
    plt.plot(test, color="gray", label="Real")
    plt.plot(predicted, color="red", label="Predicted")
    plt.title("MasterCard Stock Price Prediction")
    plt.xlabel("Time")
    plt.ylabel("MasterCard Stock Price")
    plt.legend()
    plt.show()


def return_rmse(test, predicted):
    rmse = np.sqrt(mean_squared_error(test, predicted))
    print("The root mean squared error is {:.2f}.".format(rmse))
plot_predictions(test_set,predicted_stock_price)
return_rmse(test_set,predicted_stock_price)

return_rmse(test_set,GRU_predicted_stock_price)
    `
    
let chatHistory = [
    { role: "system", content: context }
];

const regex = /```json([\s\S]*?)```/;


// Function to send messages to Ollama
async function chatWithCODER(userMessage) {
    // Add user message to chat history
    chatHistory.push({ role: "user", content: userMessage });

    // Format chat history into a single prompt
    const formattedPrompt = chatHistory.map(msg => `### ${msg.role.toUpperCase()}: ${msg.content}`).join("\n");
    
    // Append "Assistant:" to guide model response
    const finalPrompt = formattedPrompt + "\n### ASSISTANT:";

    try {

        const response = await ollama.chat({model : 'deepseek-r1:7b', messages: [{role:'user' , content : finalPrompt}]});
        console.log(response.message.content);
        const match = response.message.content.match(regex);
        if (match) {
          const jsonString = match[1].trim(); // match[1] contains the text inside the JSON block
          console.log(jsonString);
          return JSON.parse(jsonString);
        }
        return response.message.content;
    //     const response = await axios.get(OLLAMA_API_URL,{
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data : {
    //         'model': 'deepseek-coder:6.7b',
    //         'prompt': finalPrompt
    //     }
    // }
    // );

        // const assistantReply = response.data.response;
        // console.log("Assistant:", assistantReply);

        // // Add assistant response to chat history
        // chatHistory.push({ role: "assistant", content: assistantReply });
        
    } catch (error) {
        // console.error("Error:", error.response ? error.response.data : error.message);
        console.log(error);
    }
}


route.post('/run', async (req, res) => {
    const promt = await req.body.message  
    console.log(req.body)
    const respond = await chatWithCODER(promt)
    console.log("++++++++++++++++\n" + respond)
    res.status(200).json({
      reply : respond.phases
    });
});

// const response = await ollama.chat({
//   model: 'deepseek-coder:latest',
//   messages: [{ role: 'user', content: 'programming language u know?' }],
// })
// console.log(response.message.content)

export default route;