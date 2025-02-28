import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Results.css";

const Results = () => {
  const { reference_id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://your-server-ip:8000/api/get/${reference_id}/`)
      .then((response) => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [reference_id]);

  return (
    <div className="results-container">
      {loading ? (
        <p>Loading...</p>
      ) : result ? (
        <div>
          <h2>Analysis Results</h2>
          <p><strong>Company:</strong> {result.company_name}</p>
          <p><strong>Sample ID:</strong> {result.sample_id}</p>
          <p><strong>Moisture:</strong> {result.moisture}%</p>
          <p><strong>Crude Protein:</strong> {result.crude_protein}%</p>
          <p><strong>Carbohydrates (Auto):</strong> {result.carbohydrates}%</p>
          <h3>AI Analysis:</h3>
          <p>{result.ai_analysis}</p>
        </div>
      ) : (
        <p>Error loading results</p>
      )}
    </div>
  );
};

export default Results;
