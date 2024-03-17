import React, { useState } from 'react';
import axios from 'axios';
import './PredictionForm.css';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/predict', formData);
      setPrediction(response.data.prediction);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Error predicting heart condition. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Heart Condition Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">Age (years):</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="sex">Sex:</label>
          <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label htmlFor="cp">Chest Pain Type:</label>
          <select id="cp" name="cp" value={formData.cp} onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-Anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
        </div>
        <div>
          <label htmlFor="trestbps">Resting Blood Pressure (mm Hg):</label>
          <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="chol">Serum Cholesterol (mg/dl):</label>
          <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="fbs">Fasting Blood Sugar (120 mg/dl) :</label>
          <select id="fbs" name="fbs" value={formData.fbs} onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">False</option>
            <option value="1">True</option>
          </select>
        </div>
        <div>
          <label htmlFor="restecg">Resting Electrocardiographic Results:</label>
          <select id="restecg" name="restecg" value={formData.restecg} onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Normal</option>
            <option value="1">ST-T Wave Abnormality</option>
            <option value="2">Probable or Definite Left Ventricular Hypertrophy</option>
          </select>
        </div>
        <div>
          <label htmlFor="thalach">Maximum Heart Rate Achieved:</label>
          <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="exang">Exercise Induced Angina:</label>
          <select id="exang" name="exang" value={formData.exang} onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div>
          <label htmlFor="oldpeak">ST Depression Induced by Exercise Relative to Rest:</label>
          <input type="number" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="slope">Slope of the Peak Exercise ST Segment:</label>
          <select id="slope" name="slope" value={formData.slope} onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
        </div>
        <div>
          <label htmlFor="ca">Number of Major Vessels Colored by Fluoroscopy:</label>
          <input type="number" id="ca" name="ca" value={formData.ca} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="thal">Thal:</label>
          <select id="thal" name="thal" value={formData.thal} onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Error</option>
            <option value="1">Fixed Defect</option>
            <option value="2">Normal</option>
            <option value="3">Reversible Defect</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>Predict</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction && (
        <div>
          <h3>Prediction Result</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;