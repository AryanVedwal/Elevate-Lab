import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CategoryFilterButton from "./components/CategoryFilterButton";
import BannerTop from "./components/BannerTop";
import Payment from "./components/Payment";

const EcommercePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const togglePay = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category.includes(selectedCategory) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addToCart = (productId) => {
    setCartItems((prevCartItems) => [...prevCartItems, productId]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item !== productId)
    );
  };

  const isInCart = (productId) => cartItems.includes(productId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="header">
        <BannerTop />

        <div className="hero">
          <h1 className="hero-heading"> Eflyer </h1>

          <div className="hero-interaction-bar">
            <CategoryFilterButton
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
            <SearchBar value={searchTerm} onChange={handleSearchChange} />

            <span
              onClick={togglePay}
              className="cart"
              data-count={cartItems.length}
            >
              <span className="material-icons">
                {!isOpen ? "shopping_cart" : "close"}
              </span>
            </span>
          </div>

          <h1 className="hero-bot"> Get your Shopping Spree started </h1>
        </div>
      </div>

      <div className={`payment-container ${isOpen ? "show" : ""}`}>
        <Payment
          cartItems={cartItems}
          products={products}
          removeFromCart={removeFromCart}
        />
      </div>

      {products.length > 0 && (
        <div className="data-container">
          <h1 className="data-head"> Men And Women Fashion </h1>

          <ul className="product-items">
            {filteredProducts.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
                <p className="product-title">{product.title}</p>
                <p>$ {product.price}</p>

                <p
                  className="add-btn"
                  onClick={() =>
                    isInCart(product.id)
                      ? removeFromCart(product.id)
                      : addToCart(product.id)
                  }
                >
                  <span className="material-icons">
                    {isInCart(product.id)
                      ? "remove_shopping_cart"
                      : "add_shopping_cart"}
                  </span>
                  <span>
                    {isInCart(product.id) ? "Remove From Cart" : "Add To Cart"}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default EcommercePage;
