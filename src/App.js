import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import Results from "./Results";
import Navbar from "./Components/Navbar.jsx";
import PredictionForm from "./Components/Form.jsx";
import Form from "./Components/Form.jsx";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css"; // Import your CSS file for styling

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const [classificationResult, setClassificationResult] = useState(null);
  const [suggestedCure, setSuggestedCure] = useState(null); // Function to handle receiving results from the backend

  const handleResults = (result, cure) => {
    setClassificationResult(result);
    setSuggestedCure(cure);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="content">
          <span>
            <strong>Step 1:</strong>
          </span>
          <button
            className="prediction-form"
            onClick={() => setShowImageUpload(true)}
          >
            Upload ECG Report
          </button>{" "}
          {showImageUpload && <ImageUpload onResults={handleResults} />}
          {classificationResult && suggestedCure && (
            <Results
              classification={classificationResult}
              cure={suggestedCure}
            />
          )}
          <span>
            <strong>Step 2:</strong>
          </span>
          <div className="form">
            <button
              className="prediction-form"
              onClick={() => setShowForm(true)}
            >
              Fill Form
            </button>
            {showForm && <Form />}
            {/* ... other component JSX ... */}
          </div>
        </div>
        <div className="heart cl1">
          <p class="description">
            <h2 class="bkl">How it works:</h2>
            <ul>
              <li>
                <strong>Image upload</strong> Submit an image of your
                echocardiogram (ECG) report.
              </li>
              <li>
                <strong>Form input</strong> Fill out the form with relevant
                information.
              </li>
              <li>
                <strong>Advanced analysis:</strong> Our algorithms extract key
                features from ECG and form data.
              </li>
              <li>
                <strong>Prediction:</strong> The model predicts your heart
                disease risk based on these features.
              </li>
              <li>
                <strong>Actionable insights:</strong> Receive personalized
                recommendations based on the predicted risk.
              </li>
            </ul>
          </p>
        </div>
        <div className="footer">
          <button className="learn" style={{ borderRadius: "10px" }}>
            Learn More About Heart Conditions
          </button>
        </div>
      </div>
      {/* <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<Form />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
