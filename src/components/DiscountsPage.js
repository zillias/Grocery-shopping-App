import React, { useState } from "react";
import { useParams } from "react-router-dom";
import allProducts from "../Assets/Carrefour DATA English.json";
import ProductList from "./ProductList";
import { Button } from "@mui/material";

const DiscountsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams();

  const discountedProducts = allProducts
    .filter((product) => product.category.trim() === category)
    .filter((product) => product.oldprice.length)
    .filter((product) => product.image !== "#N/A");

  const highestDiscount = Math.floor(
    Math.max(
      ...discountedProducts.map((item) =>
        item.oldprice.length
          ? (1 -
              parseFloat(item.price.replace(",", ".")) /
                parseFloat(item.oldprice.replace(",", "."))) *
            100
          : 0
      )
    )
  );

  const startSlice = (currentPage - 1) * 30;
  const endSlice = startSlice + 30;

  const slicedProducts = discountedProducts.slice(0, endSlice);

  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="discounts-page">
      <h2 className="blue-text">Discounts</h2>
      <h3 style={{ maxWidth: "95%" }}>
        Special discounts up to{" "}
        <span className="red-text"> {highestDiscount}% </span> on {category}{" "}
        section
      </h3>
      <div className="products-container">
        {slicedProducts.length
          ? slicedProducts.map((product) => (
              <ProductList key={product.id} product={product} />
            ))
          : null}
      </div>
      {currentPage !== Math.ceil(discountedProducts.length / 60) &&
      discountedProducts.length ? (
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

export default DiscountsPage;
