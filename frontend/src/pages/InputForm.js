import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/InputForm.css";

const InputForm = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    sample_id: "",
    moisture: "",
    ash: "",
    crude_protein: "",
    crude_fat: "",
    fiber: "",
    gross_energy: "",
    vitamin_a: "",
    vitamin_c: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://your-server-ip:8000/api/create/", formData);
      navigate(`/results/${response.data.reference_id}`);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Enter Analysis Details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} required />
        <input type="text" name="sample_id" placeholder="Sample ID" onChange={handleChange} required />
        <input type="number" name="moisture" placeholder="Moisture (%)" onChange={handleChange} required />
        <input type="number" name="ash" placeholder="Ash (%)" onChange={handleChange} required />
        <input type="number" name="crude_protein" placeholder="Crude Protein (%)" onChange={handleChange} required />
        <input type="number" name="crude_fat" placeholder="Crude Fat (%)" onChange={handleChange} required />
        <input type="number" name="fiber" placeholder="Fiber (%)" onChange={handleChange} required />
        <input type="number" name="gross_energy" placeholder="Gross Energy (kcal/g)" onChange={handleChange} required />
        <input type="number" name="vitamin_a" placeholder="Vitamin A (IU)" onChange={handleChange} required />
        <input type="number" name="vitamin_c" placeholder="Vitamin C (mg)" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
