import React, { useRef, useState } from "react";
import {
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Divider,
  Chip,
  Collapse,
  Button,
  Popper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Filter from "./Filter";
import ProductList from "./ProductList";
import allProducts from "../Assets/Carrefour DATA.json";
import imagePlaceholder from "../Assets/No-Image-Placeholder.png";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { debounce } from "lodash";

const HomePage = () => {
  const highestPrice = allProducts.reduce((maxPrice, product) => {
    const productPrice = parseFloat(product.price.replace(",", "."));
    if (productPrice > maxPrice) {
      return productPrice;
    }
    return maxPrice;
  }, 0);

  const [state, setState] = useState({
    searchFilter: "",
    categoryFilter: "All",
    priceRangeFilter: [0, highestPrice],
    discountFilter: [0, 100],
    currentPage: 1,
    itemsPerPage: 60,
  });

  // const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const categories = [...new Set(allProducts.map((item) => item.category))]
    .map((category) => {
      const items = allProducts.filter((item) => item.category === category);
      const highestDiscount = Math.floor(
        Math.max(
          ...items.map((item) =>
            item.oldprice.length
              ? (1 -
                  parseFloat(item.price.replace(",", ".")) /
                    parseFloat(item.oldprice.replace(",", "."))) *
                100
              : 0
          )
        )
      );
      const { category_image } = items[0];
      return {
        category,
        category_image,
        highestDiscount,
      };
    })
    .filter((item) => item.category !== "Current promotions")
    .reverse();

  // Page change
  const handlePageChange = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Filter

  const filterProduct = (product) => {
    const matchSearch =
      state.searchFilter === "" ||
      product.name.toLowerCase().includes(state.searchFilter.toLowerCase());
    const matchCategory =
      state.categoryFilter === "All" ||
      product.category === state.categoryFilter;

    const productPrice = parseFloat(product.price.replace(",", "."));

    const matchPriceRange =
      productPrice >= state.priceRangeFilter[0] &&
      productPrice <= state.priceRangeFilter[1];
    const productDiscount = product.oldprice.length
      ? (1 -
          parseFloat(product.price.replace(",", ".")) /
            parseFloat(product.oldprice.replace(",", "."))) *
        100
      : 0;

    const matchDiscountRange =
      productDiscount >= state.discountFilter[0] &&
      productDiscount <= state.discountFilter[1];

    if (state.categoryFilter === "Carrefour products") {
      return (
        matchSearch &&
        matchCategory &&
        matchPriceRange &&
        matchDiscountRange &&
        product.category !== "Current promotions"
      );
    } else {
      return (
        matchSearch &&
        matchCategory &&
        matchPriceRange &&
        matchDiscountRange &&
        product.category !== "Current promotions" &&
        product.category !== "Carrefour products"
      );
    }
  };

  const [openFilter, setOpenFilter] = useState(false);

  // handle filter change

  const searchFiltering = (searchTerm) => {
    setState((prevState) => ({
      ...prevState,
      searchFilter: searchTerm,
      currentPage: 1,
    }));
  };

  const debouncedSearch = debounce(searchFiltering, 500);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const inputRef = useRef(null);
  const inputMobileRef = useRef(null);

  const closeSearch = () => {
    setState((prevState) => ({
      ...prevState,
      searchFilter: "",
      currentPage: 1,
    }));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (inputMobileRef.current) {
      inputMobileRef.current.value = "";
    }
  };

  const handleCategoryChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      categoryFilter: e.target.value,
      currentPage: 1,
    }));
  };

  const handlePriceRangeChange = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setState((prevState) => ({
        ...prevState,
        priceRangeFilter: [
          Math.min(newValue[0], state.priceRangeFilter[1] - 1),
          state.priceRangeFilter[1],
        ],
        currentPage: 1,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        priceRangeFilter: [
          state.priceRangeFilter[0],
          Math.max(newValue[1], state.priceRangeFilter[0] + 1),
        ],
        currentPage: 1,
      }));
    }
  };

  const handleDiscountChange = (e) => {
    let selectedDiscountRange = [0, 100];

    if (e.target.value === 20) {
      selectedDiscountRange = [1, 20];
    } else if (e.target.value === 40) {
      selectedDiscountRange = [20, 40];
    } else if (e.target.value === 60) {
      selectedDiscountRange = [40, 60];
    } else if (e.target.value === 80) {
      selectedDiscountRange = [60, 80];
    }

    setState((prevState) => ({
      ...prevState,
      discountFilter: selectedDiscountRange,
      currentPage: 1,
    }));
  };

  // items to display

  const displayedProducts = allProducts
    .filter((product) => filterProduct(product))
    .reverse();

  const startSlice = (state.currentPage - 1) * state.itemsPerPage;
  const endSlice = startSlice + state.itemsPerPage;

  const slicedProducts = displayedProducts.slice(0, endSlice);

  return (
    <div className="homepage-container">
      <div className="homepage-welcome-text">
        <h1>
          Hello, <span className="blue-text">Illias</span>
        </h1>
        <h3 className="grey-text">Good morning !</h3>
      </div>
      <div className="homepage-search">
        <FormControl fullWidth variant="outlined">
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            id="search-input"
            inputRef={inputRef}
            endAdornment={
              <InputAdornment position="end">
                {state.searchFilter !== "" ? (
                  <IconButton onClick={closeSearch}>
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton disabled>
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
            label="search"
            onChange={handleSearch}
          />
        </FormControl>
      </div>
      <div className="mobile-homepage-search">
        <FormControl size="small" fullWidth variant="outlined">
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            id="search-mobile-input"
            inputRef={inputMobileRef}
            endAdornment={
              <InputAdornment position="end">
                {state.searchFilter !== "" ? (
                  <IconButton onClick={closeSearch}>
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton disabled>
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
            label="search"
            onChange={handleSearch}
          />
        </FormControl>
        <IconButton>
          <FilterListIcon onClick={() => setOpenFilter(true)} />
        </IconButton>
      </div>
      <Popper open={openFilter} className="mobile-filter-popup">
        <div className="mobilepage-header">
          <IconButton onClick={() => setOpenFilter(false)}>
            <ArrowBackIcon />
          </IconButton>
          <h2 className="blue-text">Filter products</h2>
        </div>
        <Filter
          categoryFilter={state.categoryFilter}
          priceRangeFilter={state.priceRangeFilter}
          discountFilter={state.discountFilter}
          handleCategoryChange={handleCategoryChange}
          handleDiscountChange={handleDiscountChange}
          handlePriceRangeChange={handlePriceRangeChange}
          categories={categories}
          highestPrice={highestPrice}
          setOpenFilter={setOpenFilter}
        />
      </Popper>
      <div className="homepage-discountlist">
        <Collapse
          in={!state.searchFilter.trim().length}
          timeout="auto"
          unmountOnExit
        >
          <div className="media-scroller">
            {categories.map(
              (category) =>
                category.highestDiscount > 40 && (
                  <div
                    key={category.category}
                    className="discount-card clickable"
                    onClick={() =>
                      navigate(`discounts/${category.category.trim()}`)
                    }
                  >
                    <div className="discount-card-text">
                      <h5>{category.category}</h5>
                      <h3>
                        Up to{" "}
                        <span className="red-text">
                          {category.highestDiscount}% OFF
                        </span>
                      </h3>
                      <h6 className="grey-text">
                        on {category.category} section
                      </h6>
                    </div>
                    <img src={category.category_image} alt={imagePlaceholder} />
                  </div>
                )
            )}
          </div>
        </Collapse>
      </div>
      <div className="homepage-section-title">
        <h2>
          {state.searchFilter.trim().length ||
          state.categoryFilter !== "All" ||
          (state.priceRangeFilter[0] !== 0 &&
            state.priceRangeFilter[1] !== highestPrice) ||
          (state.discountFilter[0] !== 0 && state.discountFilter[1] !== 100)
            ? "Search results"
            : "Best Selling"}
        </h2>
      </div>
      <div className="homepage-filter">
        <Divider>
          <Chip label={"Filter by"}></Chip>
        </Divider>
        <Filter
          categoryFilter={state.categoryFilter}
          priceRangeFilter={state.priceRangeFilter}
          discountFilter={state.discountFilter}
          handleCategoryChange={handleCategoryChange}
          handleDiscountChange={handleDiscountChange}
          handlePriceRangeChange={handlePriceRangeChange}
          categories={categories}
          highestPrice={highestPrice}
        />
      </div>
      {displayedProducts.length ? (
        <div className="products-container">
          {slicedProducts.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <h2>No item found !</h2>
      )}

      {state.currentPage !== Math.ceil(displayedProducts.length / 60) &&
      displayedProducts.length ? (
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

export default HomePage;
