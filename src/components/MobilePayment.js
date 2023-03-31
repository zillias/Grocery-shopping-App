import React, { useState } from "react";
import { StepLabel, Stepper, Step, Checkbox, Button } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const MobilePayment = () => {
  const [payment, setPayment] = useState({ online: false, delivery: false });
  const handleOnlinePayment = (e) => {
    if (e.target.value === "online") {
      setPayment({ online: !payment.online, delivery: false });
    } else if (e.target.value === "delivery") {
      setPayment({ online: false, delivery: !payment.delivery });
    }
  };
  return (
    <div className="mobile-ckekout-page">
      <h2>Checkout</h2>
      <Stepper activeStep={2} alternativeLabel>
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
      <div className="cart-payment">
        <h2>Payment method</h2>
        <div>
          <div className="payment-method">
            <CreditCardIcon />
            <h4>Online Payment</h4>
            <Checkbox
              checked={payment.online}
              onChange={handleOnlinePayment}
              value="online"
            />
          </div>

          <div className="payment-method">
            <PaymentIcon />
            <h4>Paiment on delivery</h4>
            <Checkbox
              checked={payment.delivery}
              onChange={handleOnlinePayment}
              value="delivery"
            />
          </div>
        </div>
      </div>
      <Button fullWidth variant="contained">
        Confirm
      </Button>
    </div>
  );
};

export default MobilePayment;
