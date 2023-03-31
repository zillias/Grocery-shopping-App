import React, { useContext } from "react";
import AppContext from "./Context";
import ProductList from "./ProductList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const WhishList = () => {
  const { whishlistItems } = useContext(AppContext);

  return (
    <div className="whishList-page">
      <h2 className="blue-text">My Wishlist</h2>
      {whishlistItems.length ? (
        <div className="products-container">
          {whishlistItems.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <h4 style={{ maxWidth: "90%" }}>
          No products on your wishlist, you can click on
          <FavoriteBorderIcon
            style={{ marginInline: "0.3rem" }}
            fontSize="small"
            color="error"
          />
          icon on each product to save it on your wishlist.
        </h4>
      )}
    </div>
  );
};

export default WhishList;
