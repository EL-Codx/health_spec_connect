// src/pages/auth/PatientRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role: "patient",
      });

      if (res.data.success) {
        alert("Patient registered successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering patient.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Patient Registration</h2>

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
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register as Patient
        </button>
      </form>
    </div>
  );
};

export default PatientRegister;
