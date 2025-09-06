// src/pages/auth/SpecialistRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SpecialistRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    licenseNumber: "",
    experienceYears: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("role", "specialist");
      if (image) data.append("image", image);

      const res = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Specialist registered successfully! Pending admin approval.");
        // console.log(res.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        error.message ||
        "Error registering specialist."
      );
    }
  };

  return (
    <div className="form-container">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Specialist Registration</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g., Cardiologist)"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="text"
            name="licenseNumber"
            placeholder="Medical License Number"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="number"
            name="experienceYears"
            placeholder="Years of Experience"
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 mb-3 border rounded"
          />

          <button
            type="submit"
            className="w-full text-white py-2 rounded"
          >
            Register as Specialist
          </button>
        </form>
      </div>
    </div>
  );
};

export default SpecialistRegister;
