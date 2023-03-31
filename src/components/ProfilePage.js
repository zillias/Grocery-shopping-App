import {
  Inventory,
  Payment,
  Person2,
  LocationOn,
  Settings,
  LiveHelp,
  Email,
  Share,
  Star,
  PowerSettingsNew,
} from "@mui/icons-material";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import avatarProfile from "../Assets/avatar-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="profile-page-header">
        <Avatar
          sx={{
            width: "8rem",
            height: "8rem",
            background: "white",
          }}
          src={avatarProfile}
          alt="Illias Zouad"
        />
        <div>
          <h2>Illias Zouad</h2>
          <h5>z.illias@gmail.com</h5>
        </div>
      </div>
      <List className="profile-page-list">
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Person2 color="primary" />
            </Avatar>
            <ListItemText primary="Account Info" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Inventory color="primary" />
            </Avatar>
            <ListItemText primary="My Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Payment color="primary" />
            </Avatar>
            <ListItemText primary="Payment Method" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <LocationOn color="primary" />
            </Avatar>
            <ListItemText primary="Delivery Address" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Settings color="primary" />
            </Avatar>
            <ListItemText primary="App Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <LiveHelp color="primary" />
            </Avatar>
            <ListItemText primary="Help Center" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Email color="primary" />
            </Avatar>
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Share color="primary" />
            </Avatar>
            <ListItemText primary="Share App" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <Star color="primary" />
            </Avatar>
            <ListItemText primary="Rate App" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <Avatar sx={{ background: "white", margin: "0 2rem" }}>
              <PowerSettingsNew color="error" />
            </Avatar>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default ProfilePage;
