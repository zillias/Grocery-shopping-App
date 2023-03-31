import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../Assets/CarrefourSquareLogo.png";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };
  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  return (
    <div className="opening-background">
      <div className="signin-content">
        <img src={Logo} alt="Carrefour" />
        <div>
          <h2>Create your account</h2>
        </div>

        <div className="form">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <OutlinedInput
              id="name-input"
              label="name"
              value={user.name}
              onChange={handleNameChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            style={{ marginTop: "1rem" }}
            variant="outlined"
            fullWidth
          >
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
            Register
          </Button>

          <h4>
            {"Already have an account ? "}
            <span style={{ color: "blue" }} className="span-Signup">
              <Link to={"/signin"}>Login</Link>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
