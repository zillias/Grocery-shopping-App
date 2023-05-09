import React, { useEffect, useState, useContext } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import noImagePlaceholder from "../Assets/No-Image-Placeholder.png";
import ProductList from "./ProductList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import allProducts from "../Assets/Carrefour DATA English.json";
import AppContext from "./Context";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const { changeCart, cart, changeWhishlist, whishlistItems } = useContext(
    AppContext
  );

  const mainProduct = allProducts.find((product) => product.id === Number(id));

  const itemOnWishlist = whishlistItems.find(
    (item) => item.id === mainProduct.id
  );
  const existingItem = cart.items.find((item) => item.id === mainProduct.id);
  const existingItemQuantity = existingItem ? existingItem.quantity : 0;
  const addQuantity = () => {
    changeCart(mainProduct.id, existingItemQuantity + 1, mainProduct.image);
  };
  const minusQuantity = () => {
    existingItemQuantity &&
      changeCart(mainProduct.id, existingItemQuantity - 1, mainProduct.image);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  const relatedProducts = allProducts.filter(
    (product) => product.category === mainProduct.category
  );
  const startSlice = (currentPage - 1) * 30;
  const endSlice = startSlice + 30;

  const slicedProducts = relatedProducts.slice(0, endSlice);

  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="homepage-container">
      <div className="product-display">
        <img
          src={
            mainProduct.image.length ? mainProduct.image : noImagePlaceholder
          }
          alt={noImagePlaceholder}
        />

        <div className="product-detail-text">
          <div>
            <h4 className="grey-text">{mainProduct.category}</h4>
            <h1>{mainProduct.name}</h1>
          </div>
          <h2>
            {mainProduct.price} MAD
            <span className="product-oldprice">{mainProduct.oldprice}</span>
          </h2>
          <div style={{ display: "flex" }}>
            <FormControl variant="outlined">
              <InputLabel>Quantity</InputLabel>
              <OutlinedInput
                size="medium"
                inputProps={{ style: { textAlign: "center" } }}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={minusQuantity}>
                      <RemoveCircleIcon color="info" />
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
            <IconButton
              onClick={() => changeWhishlist(mainProduct.id)}
              style={{ marginLeft: "20px" }}
            >
              {itemOnWishlist ? (
                <FavoriteIcon fontSize="large" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="large" color="error" />
              )}
            </IconButton>
          </div>
          <div className="product-details">
            {mainProduct.brand.length ? (
              <h4>{`Brand : ${mainProduct.brand}`}</h4>
            ) : null}
            <h4>{mainProduct.details}</h4>
          </div>
        </div>
      </div>
      <h2>Related products</h2>
      <div className="products-container">
        {slicedProducts.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </div>
      {currentPage !== Math.ceil(relatedProducts.length / 60) &&
      relatedProducts.length ? (
        <Button
          onClick={handlePageChange}
          className="showmore-btn"
          fullWidth
          variant="contained"
        >
          Show More
        </Button>
      ) : null}
    </div>
  );
};

export default ProductPage;
