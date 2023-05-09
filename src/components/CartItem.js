import React, { useContext } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AllProducts from "../Assets/Carrefour DATA English.json";
import AppContext from "./Context";
import { useNavigate } from "react-router-dom";

const CartItem = ({ product }) => {
  const currentProduct = AllProducts.find((item) => item.id === product.id);
  const { changeCart } = useContext(AppContext);
  const navigate = useNavigate();

  const addQuantity = () => {
    changeCart(product.id, product.quantity + 1, product.image);
  };
  const minusQuantity = () => {
    changeCart(product.id, product.quantity - 1, product.image);
  };

  return (
    <div className="cart-item">
      <img
        onClick={() => navigate(`/home/product/${product.id}`)}
        className="clickable"
        alt={currentProduct.name}
        src={currentProduct.image}
      />
      <div className="cart-item-text">
        <h5
          className="clickable"
          onClick={() => navigate(`/home/product/${product.id}`)}
        >
          {currentProduct.name}
        </h5>
        <h5>
          {currentProduct.price} MAD
          <span className="product-oldprice"> {currentProduct.oldprice}</span>
        </h5>
        <FormControl
          size="small"
          style={{ margin: "0.5rem auto 0", width: "80%" }}
          variant="outlined"
        >
          <InputLabel>Quantity</InputLabel>
          <OutlinedInput
            inputProps={{ style: { textAlign: "center" } }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton onClick={minusQuantity}>
                  <RemoveCircleIcon fontSize="small" color="info" />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={addQuantity}>
                  <AddCircleIcon fontSize="small" color="primary" />
                </IconButton>
              </InputAdornment>
            }
            value={product.quantity}
            label="Quantity"
            type="number"
            className="quantity-input"
          />
        </FormControl>
      </div>
    </div>
  );
};

export default CartItem;
