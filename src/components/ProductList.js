import React, { useContext } from "react";
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import imagePlaceholder from "../Assets/No-Image-Placeholder.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import AppContext from "./Context";

const ProductList = ({ product }) => {
  const navigate = useNavigate();
  const { changeCart, cart, changeWhishlist, whishlistItems } = useContext(
    AppContext
  );

  const existingItem = cart.items.find((item) => item.id === product.id);
  const existingItemQuantity = existingItem ? existingItem.quantity : 0;
  const addQuantity = () => {
    changeCart(product.id, existingItemQuantity + 1, product.image);
  };
  const minusQuantity = () => {
    existingItemQuantity &&
      changeCart(product.id, existingItemQuantity - 1, product.image);
  };

  const itemOnWishlist = whishlistItems.find((item) => item.id === product.id);

  const productDiscount = product.oldprice.length
    ? (1 -
        parseFloat(product.price.replace(",", ".")) /
          parseFloat(product.oldprice.replace(",", "."))) *
      100
    : 0;

  return (
    <div className="product-card">
      <img
        className="clickable"
        src={product.image.length ? product.image : imagePlaceholder}
        alt={imagePlaceholder}
        onClick={() => {
          navigate(`/home/product/${product.id}`);
          window.scrollTo(0, 0);
        }}
      />
      <div className="product-details">
        <h5
          className="clickable"
          onClick={() => {
            navigate(`/home/product/${product.id}`);
            window.scrollTo(0, 0);
          }}
        >
          {product.name}
        </h5>
        <h4>
          {`${product.price} MAD`}
          <span className="product-oldprice">{`${product.oldprice}`}</span>
        </h4>
      </div>
      <IconButton
        onClick={() => changeWhishlist(product.id)}
        className="product-favorite-icon"
      >
        {itemOnWishlist ? (
          <FavoriteIcon fontSize="large" color="error" />
        ) : (
          <FavoriteBorderIcon fontSize="large" color="error" />
        )}
      </IconButton>

      {productDiscount ? (
        <Button
          className="product-discount-display"
          color="error"
          disableRipple
          variant="contained"
          size="small"
        >
          <h5>{productDiscount.toFixed()}% OFF </h5>
        </Button>
      ) : null}

      <FormControl className="product-actions" fullWidth variant="outlined">
        <InputLabel>Quantity</InputLabel>
        <OutlinedInput
          size="medium"
          inputProps={{ style: { textAlign: "center" } }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton onClick={minusQuantity}>
                <RemoveCircleIcon color="primary" />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={addQuantity}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </InputAdornment>
          }
          value={existingItemQuantity}
          label="Quantity"
          type="number"
          className="quantity-input"
        />
      </FormControl>
    </div>
  );
};

export default ProductList;
