import React, { useState } from 'react';
import './App.css'; // Assuming you have App.css for styles

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [getResponseData, setGetResponseData] = useState(null);
    const [error, setError] = useState('');

    // Handle POST request
    const handleSubmit = async () => {
        setError('');
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await fetch('bhfl-backend-alpha.vercel.app/bfhl', { // Update with your backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: parsedData.data, file_b64: parsedData.file_b64 }), // Include file_b64 if needed
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setResponseData(data);
        } catch (error) {
            setError('Invalid JSON or request failed. Please check your input.');
            console.error(error);
        }
    };

    // Handle GET request
    const handleGetRequest = async () => {
        setError('');
        try {
            const res = await fetch('bhfl-backend-alpha.vercel.app/bfhl', { // Update with your backend URL
                method: 'GET',
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setGetResponseData(data);
        } catch (error) {
            setError('Error fetching GET response');
            console.error(error);
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">21BEC0215</h1>
            <div className="input-container">
                <input
                    className="input-box"
                    type="text"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON: { "data": ["A", "C", "z"], "file_b64": "BASE_64_STRING" }'
                />
                <button className="submit-btn" onClick={handleSubmit}>Submit POST Request</button>
            </div>

            {error && <div className="error">{error}</div>}

            {responseData && (
                <div className="table-container animate">
                    <h2>POST Response</h2>
                    <table className="response-table">
                        <tbody>
                            <tr>
                                <td><strong>Success:</strong></td>
                                <td>{responseData.is_success ? 'True' : 'False'}</td>
                            </tr>
                            <tr>
                                <td><strong>User ID:</strong></td>
                                <td>{responseData.user_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{responseData.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Roll Number:</strong></td>
                                <td>{responseData.roll_number}</td>
                            </tr>
                            <tr>
                                <td><strong>Numbers:</strong></td>
                                <td>{responseData.numbers.join(', ')}</td>
                            </tr>
                            <tr>
                                <td><strong>Alphabets:</strong></td>
                                <td>{responseData.alphabets.join(', ')}</td>
                            </tr>
                            <tr>
                                <td><strong>Highest Lowercase Alphabet:</strong></td>
                                <td>{responseData.highest_lowercase_alphabet.join(', ')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <button className="get-btn" onClick={handleGetRequest}>Click for GET Endpoint</button>

            {getResponseData && (
                <div className="get-response animate">
                    <h2>GET Response</h2>
                    <p>Operation Code: {getResponseData.operation_code}</p>
                </div>
            )}
        </div>
    );
}

export default App;
