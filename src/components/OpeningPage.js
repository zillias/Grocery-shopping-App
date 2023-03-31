import { Button } from "@mui/material";
import React from "react";
import Logo from "../Assets/CarrefourSquareLogo.png";
import { useNavigate } from "react-router-dom";

const OpeningPage = () => {
  const navigate = useNavigate();

  return (
    <div className="opening-background">
      <div className="opening-content">
        <img src={Logo} alt="Carrefour" />
        <div>
          <h2>Get your groceries </h2>
          <h2>delivered to your home </h2>
        </div>
        <h3>
          The best delivery app <br /> for getting your daily <br /> fresh
          groceries at home
        </h3>
        <Button
          variant="contained"
          onClick={() => navigate("/signin")}
          color="primary"
        >
          Shop now
        </Button>
      </div>
    </div>
  );
};

export default OpeningPage;
