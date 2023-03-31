import React, { useContext } from "react";
import { Avatar, Badge, Button, IconButton } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Logo from "../Assets/Carrefour Logo.png";
import avatarProfile from "../Assets/avatar.jpeg";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppContext from "./Context";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(AppContext);
  console.log(cart.items.length);
  return (
    <>
      <div className="desktop-navbar">
        <div className="logo">
          <Link to="/home">
            <img height={"35px"} src={Logo} alt="Carrefour" />
          </Link>
        </div>
        <Button
          onClick={() => navigate("/home/wishlist")}
          className="appbarButton"
        >
          <h3 className="appbarText">Wishlist</h3>
        </Button>
        <Button
          onClick={() => navigate("/home/orders")}
          className="appbarButton"
        >
          <h3 className="appbarText">Orders</h3>
        </Button>
        <Button
          style={{ minWidth: "10rem" }}
          onClick={() => navigate("/home/cart")}
          className="appbarButton"
        >
          <h3 className="appbarText">My Cart</h3>
          <IconButton disableRipple={true} color="primary">
            <Badge
              badgeContent={`${cart.items.length}`}
              color="error"
              overlap="circular"
            >
              <LocalMallIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Button>
        <IconButton
          onClick={() => navigate("/home/profile")}
          className="appbarButton"
        >
          <Avatar alt="Illias Zouad" src={avatarProfile} />
        </IconButton>
      </div>
      <div className="mobile-navbar">
        <div className="navbtns-container">
          <div className="navbtn">
            <IconButton onClick={() => navigate("/home")}>
              <HomeIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="navbtn">
            <IconButton onClick={() => navigate("/home/orders")}>
              <LocalShippingIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <Button
          onClick={() => navigate("/home/cart")}
          variant="contained"
          color="primary"
          className="nav-largebtn"
        >
          <Badge
            badgeContent={`${cart.items.length}`}
            color="error"
            overlap="circular"
          >
            <LocalMallIcon fontSize="inherit" />
          </Badge>
        </Button>
        <div className="navbtns-container">
          <div className="navbtn">
            <IconButton onClick={() => navigate("/home/wishlist")}>
              <FavoriteIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="navbtns">
            <IconButton onClick={() => navigate("/home/profile")}>
              <Avatar alt="Brayden Anderson" src={avatarProfile} />
            </IconButton>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
