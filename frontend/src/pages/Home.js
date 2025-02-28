import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Select an Analysis Type</h1>
      <div className="analysis-options">
        <Link to="/input-form">
          <div className="option-card">
            <img src="/icons/proximate.png" alt="Proximate Analysis" />
            <p>Proximate Analysis</p>
          </div>
        </Link>
        <Link to="/input-form">
          <div className="option-card">
            <img src="/icons/gross-energy.png" alt="Gross Energy" />
            <p>Gross Energy</p>
          </div>
        </Link>
        <Link to="/input-form">
          <div className="option-card">
            <img src="/icons/vitamins.png" alt="Vitamin Analysis" />
            <p>Vitamin Analysis</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
