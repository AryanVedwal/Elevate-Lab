import React from "react";

const Payment = ({ cartItems, removeFromCart, products }) => {
  if (!products || !cartItems) {
    return <div>Loading...</div>;
  }

  const totalAmount = cartItems.reduce((acc, curr) => {
    const product = products.find((p) => p.id === curr);
    return acc + product.price;
  }, 0);

  return (
    <>
      <div className="pay-box">
        <h1>Payment Details</h1>
        <ul>
          {cartItems.map((itemId) => {
            const product = products.find((p) => p.id === itemId);
            return (
              <li key={itemId}>
                {product.title} - ${product.price}
                <button className="item-remove" onClick={() => removeFromCart(itemId)}>
                  <span className="material-icons">close</span>
                </button>
              </li>
            );
          })}
        </ul>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
      </div>
    </>
  );
};

export default Payment;
