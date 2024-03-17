import React, { useState } from "react";
import "./ImageUpload.css";

function ImageUpload({ onResults }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      return; // Handle error if no image selected
    }

    // Send image data to backend API (implementation details depend on your backend)
    const response = await fetch("/api/classify", {
      method: "POST",
      body: JSON.stringify({ imageData: selectedImage }),
    });

    const data = await response.json();
    onResults(data.classification, data.cure);
  };

  return (
    <div className="Upload">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Analyse</button>
    </div>
  );
}

export default ImageUpload;
