import React, { useContext, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
} from "@mui/material";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payments";
import CartItem from "./CartItem";
import AppContext from "./Context";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [payment, setPayment] = useState({ online: false, delivery: false });
  const handleOnlinePayment = (e) => {
    if (e.target.value === "online") {
      setPayment({ online: !payment.online, delivery: false });
    } else if (e.target.value === "delivery") {
      setPayment({ online: false, delivery: !payment.delivery });
    }
  };
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="cart-page">
        <div>
          <h2 className="blue-text">Shopping cart</h2>
          <div className="cart-items-scroll">
            {cart.items.length ? (
              cart.items.map((item) => (
                <CartItem key={item.id} product={item} />
              ))
            ) : (
              <h4 style={{ paddingTop: "2rem" }}>No item yet on your cart</h4>
            )}
          </div>
        </div>

        <div className="delivery-info">
          <h2 className="blue-text">Delivery information</h2>
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
        </div>
        <div className="cart-payment">
          <div>
            <h2 className="blue-text">Payment method</h2>
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
          <Divider />
          <div>
            <h2 className="blue-text">Bill details</h2>
            <div className="bill-line">
              <h4> Items Total </h4>
              <h4>
                {(cart.total * 0.8)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
                MAD
              </h4>
            </div>
            <div className="bill-line">
              <h4> Taxes Total </h4>
              <h4>
                {(cart.total * 0.2)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
                MAD
              </h4>
            </div>

            <Divider />
            <div className="bill-line">
              <h4 className="blue-text"> Payment Total </h4>
              <h4 className="blue-text">
                {cart.total
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
                MAD
              </h4>
            </div>
            <Divider />
          </div>

          <FormControl
            style={{ margin: "1rem 0" }}
            fullWidth
            variant="outlined"
          >
            <InputLabel>Promo Code</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained">Apply</Button>
                </InputAdornment>
              }
              label="Promo Code"
              className="promocode-input"
            />
          </FormControl>
          <Button variant="contained" fullWidth>
            Confirm
          </Button>
        </div>
      </div>
      <div className="mobile-cart-page">
        <h2 className="blue-text">Shopping cart</h2>
        <div className="mobile-shopping-cart">
          {cart.items.length ? (
            cart.items.map((item) => <CartItem key={item.id} product={item} />)
          ) : (
            <h4 style={{ paddingTop: "2rem" }}>No item yet on your cart</h4>
          )}
        </div>
        <Divider style={{ width: "90vw" }} />
        <div className="mobile-cart-payment">
          <h2 className="blue-text">Bill details</h2>
          <div>
            <div className="bill-line">
              <h4> Items Total </h4>
              <h4>
                {(cart.total * 0.8)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
                MAD
              </h4>
            </div>
            <div className="bill-line">
              <h4> Taxes Total </h4>
              <h4>
                {(cart.total * 0.2)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
                MAD
              </h4>
            </div>

            <Divider />
            <div className="bill-line">
              <h4 className="blue-text"> Payment Total </h4>
              <h4 className="blue-text">
                {cart.total
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
                MAD
              </h4>
            </div>
            <Divider />
          </div>
          <FormControl
            style={{ margin: "1rem 0" }}
            fullWidth
            variant="outlined"
          >
            <InputLabel>Promo Code</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained">Apply</Button>
                </InputAdornment>
              }
              label="Promo Code"
              className="promocode-input"
            />
          </FormControl>
          <Button
            onClick={() => navigate("deliveryInfo")}
            variant="contained"
            fullWidth
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
