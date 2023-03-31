import React, { useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Popper,
  OutlinedInput,
  InputAdornment,
  Card,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Filter = ({
  categoryFilter,
  priceRangeFilter,
  discountFilter,
  handleCategoryChange,
  handleDiscountChange,
  handlePriceRangeChange,
  categories,
  highestPrice,
  setOpenFilter,
}) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const openPricerangeSlider = (e) => {
    setOpenSlider(!openSlider);
    setAnchor(e.currentTarget);
  };

  const marks = [
    {
      value: 0,
      label: "0 Dhs",
    },
    {
      value: highestPrice,
      label: `${highestPrice} Dhs`,
    },
  ];

  return (
    <>
      <div className="filter">
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={categoryFilter}
            label="Category"
            onChange={handleCategoryChange}
            MenuProps={{ PaperProps: { style: { maxHeight: "30rem" } } }}
          >
            <MenuItem value={"All"}>All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.category} value={category.category}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Price range</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <KeyboardArrowDownIcon />
              </InputAdornment>
            }
            value={`From ${priceRangeFilter[0]} to ${priceRangeFilter[1]} MAD`}
            label="Price Range"
            onClick={openPricerangeSlider}
            readOnly={true}
          />
          <Popper
            anchorEl={anchor}
            open={openSlider}
            onMouseLeave={openPricerangeSlider}
          >
            <Card
              elevation={4}
              variant="outlined"
              style={{ width: "20rem", padding: "0 35px" }}
            >
              <Slider
                className="pricerange-slider"
                value={priceRangeFilter}
                onChange={handlePriceRangeChange}
                aria-label="Price Range"
                valueLabelDisplay="auto"
                disableSwap
                marks={marks}
                min={0}
                max={highestPrice}
              />
            </Card>
          </Popper>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="discount-select-label">Discount</InputLabel>
          <Select
            labelId="discount-select-label"
            id="discount-select"
            value={discountFilter[1]}
            label="Discount"
            onChange={handleDiscountChange}
          >
            <MenuItem value={100}>All Products</MenuItem>
            <MenuItem value={20}>Up to 20%</MenuItem>
            <MenuItem value={40}>From 20% to 40%</MenuItem>
            <MenuItem value={60}>From 40% to 60%</MenuItem>
            <MenuItem value={80}>From 60% to 80%</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mobile-filter">
        <div>
          <h3 style={{ marginBottom: "0.5rem" }}>Category</h3>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={categoryFilter}
              label="Category"
              onChange={handleCategoryChange}
              MenuProps={{ PaperProps: { style: { maxHeight: "30rem" } } }}
            >
              <MenuItem value={"All"}>All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.category} value={category.category}>
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <h3>Price Range</h3>
          <Slider
            className="pricerange-slider"
            value={priceRangeFilter}
            onChange={handlePriceRangeChange}
            aria-label="Price Range"
            valueLabelDisplay="auto"
            disableSwap
            marks={marks}
            min={0}
            max={highestPrice}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "0.5rem" }}>Discount</h3>
          <FormControl fullWidth>
            <InputLabel id="discount-select-label">Discount</InputLabel>
            <Select
              labelId="discount-select-label"
              id="discount-select"
              value={discountFilter[1]}
              label="Discount"
              onChange={handleDiscountChange}
            >
              <MenuItem value={100}>All Products</MenuItem>
              <MenuItem value={20}>Up to 20%</MenuItem>
              <MenuItem value={40}>From 20% to 40%</MenuItem>
              <MenuItem value={60}>From 40% to 60%</MenuItem>
              <MenuItem value={80}>From 60% to 80%</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          fullWidth
          onClick={() => setOpenFilter(false)}
        >
          Apply Filter
        </Button>
      </div>
    </>
  );
};

export default Filter;
