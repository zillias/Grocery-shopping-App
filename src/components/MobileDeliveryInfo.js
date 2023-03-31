import React from "react";
import {
  StepLabel,
  Stepper,
  Step,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MobileDeliveryInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="mobile-ckekout-page">
      <h2>Checkout</h2>
      <Stepper activeStep={1} alternativeLabel>
        <Step>
          <StepLabel>Order</StepLabel>
        </Step>
        <Step>
          <StepLabel>Address</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <h2>Delivery information</h2>
      <div className="delivery-info">
        <TextField
          autoComplete="false"
          id="delivery-fullname"
          label="Full Name"
          variant="outlined"
        />
        <TextField
          autoComplete="false"
          id="delivery-email"
          label="Email Address"
          variant="outlined"
        />
        <TextField
          autoComplete="false"
          id="delivery-phone"
          label="Phone Number"
          variant="outlined"
        />
        <TextField
          autoComplete="false"
          id="delivery-adress"
          label="Address"
          variant="outlined"
        />
        <div className="zip-city">
          <TextField
            autoComplete="false"
            id="zip-code"
            label="Zip Code"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoComplete="false"
            id="city"
            label="City"
            variant="outlined"
            fullWidth
          />
        </div>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Save shipping address"
        />
        <Button
          onClick={() => navigate("/home/cart/payment")}
          variant="contained"
          fullWidth
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MobileDeliveryInfo;
