from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)


def access_ollama_api():
    # API endpoint URL
    url = "http://localhost:11434/api/generate"
    
    # Set headers
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "deepseek-coder:latest";
        "prompt": "Return a json format";
        ""
    }
    try:
        # Make a GET request to the API with headers
        response = requests.get(url, headers=headers)
        # Raise an exception if the request was unsuccessful
        response.raise_for_status()
        
        # Print the response data on the console
        print(response.json())
        
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")

# Call the function