import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../Assets/CarrefourSquareLogo.png";
import { Link, useNavigate } from "react-router-dom";

const OpeningPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <div className="opening-background">
      <div className="signin-content">
        <img src={Logo} alt="Carrefour" />
        <div>
          <h2>Welcome Back </h2>
        </div>
        <h3> Enter your login and password to acess your account</h3>
        <div className="form">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="email-input">E-mail</InputLabel>
            <OutlinedInput
              id="email-input"
              label="E-mail"
              value={user.email}
              onChange={handleEmailChange}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            style={{ marginTop: "1rem" }}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={handlePasswordChange}
              startAdornment={
                <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            style={{ margin: "1rem 0" }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/home")}
          >
            Sign In
          </Button>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Keep Sign In"
          />
          <h4>
            {"Don't have an account ? "}
            <span style={{ color: "blue" }} className="span-Signup">
              <Link to={"/register"}>Sign Up </Link>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default OpeningPage;
