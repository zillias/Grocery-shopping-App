import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Order = ({ id, status }) => {
  const [open, SetOpen] = useState(false);
  const handleClick = () => {
    SetOpen(!open);
  };

  return (
    <List component="nav" disablePadding>
      <ListItemButton onClick={handleClick}>
        {status === "On delivery" ? (
          <ListItemIcon style={{ color: "rgba(255, 169, 2, 1)" }}>
            <InventoryIcon />
          </ListItemIcon>
        ) : (
          <ListItemIcon style={{ color: "rgba(28, 175, 94, 1)" }}>
            <InventoryIcon />
          </ListItemIcon>
        )}

        <ListItemText primary={`Order ID #${id}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse className="orders-list" in={open} timeout="auto" unmountOnExit>
        <Stepper orientation="vertical">
          <Step active>
            <StepLabel>
              <h4>Order Placed</h4>
            </StepLabel>
            <StepContent>
              <h5>9:10 PM, 19 June 2022</h5>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <h4>Order Confirmed</h4>
            </StepLabel>
            <StepContent>
              <h5>9:20 PM, 19 June 2022</h5>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <h4>Your Order On Delivery</h4>
            </StepLabel>
            <StepContent>
              <h5>9:40 PM, 19 June 2022</h5>
            </StepContent>
          </Step>
          {status === "Completed" ? (
            <Step active>
              <StepLabel>
                <h4>Order Delivered</h4>
              </StepLabel>
              <StepContent>
                <h5>9:50 PM, 19 June 2022</h5>
              </StepContent>
            </Step>
          ) : (
            <Step>
              <StepLabel>
                <h4>Order Delivered</h4>
              </StepLabel>
            </Step>
          )}
        </Stepper>
      </Collapse>
      <Divider />
    </List>
  );
};

export default Order;
