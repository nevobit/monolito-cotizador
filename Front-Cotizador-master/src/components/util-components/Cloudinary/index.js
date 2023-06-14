import React, { useState } from "react";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "matosr96",
  api_key: "r9rqkvzr",
  api_secret: "TU_API_SECRET",
});

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(
          "https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload",
          formData
        )
        .then((response) => {
          console.log(
            "Archivo subido exitosamente a Cloudinary:",
            response.data
          );
        })
        .catch((error) => {
          console.error("Error al subir el archivo a Cloudinary:", error);
        });
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir PDF</button>
    </div>
  );
}
