import React, { useState, useEffect } from "react";
import "./../App.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const products = [
    {
      id: 1,
      name: "Blessu Đồng Hồ Điện Tử",
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rccq-lrdrol0ioec8e6@resize_w450_nl.webp",
      price: 100000,
    },
    {
      id: 2,
      name: "Đồng hồ thời trang nam",
      image:
        "https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lqir43b45z5hd4.webp",
      price: 200000,
    },
    {
      id: 3,
      name: "Đồng hồ thạch anh",
      image:
        "https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-ltdjfqntnelp68.webp",
      price: 300000,
    },
    {
      id: 4,
      name: "Đồng hồ cơ",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0quk0m5rs0f63.webp",
      price: 400000,
    },
  ];

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const totalPrice = selectedProducts
    .map((id) => products.find((product) => product.id === id).price)
    .reduce((acc, price) => acc + price, 0);

  const handlePayment = () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn sản phẩm");
    } else {
      if (paymentMethod === "credit-card") {
        navigate("/credit-card", {
          state: { totalPrice, selectedProducts, products },
        });
      } else {
        alert(
          `Thanh toán thành công! \nPhương thức thanh toán: ${paymentMethod}\nTổng tiền: ${totalPrice} VND`
        );
      }
    }
  };

  useEffect(() => {
    if (paymentMethod === "paypal") {
      const paypalContainer = document.getElementById("paypal-button-container");
      
      if (paypalContainer && paypalContainer.hasChildNodes()) {
        paypalContainer.innerHTML = ""; 
      }
  
      if (paypalContainer) {
        const exchangeRate = 25000; 
        const totalPriceVND = totalPrice; 
        const totalPriceUSD = (totalPriceVND / exchangeRate).toFixed(2);
  
  
        window.paypal
          .Buttons({
            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPriceUSD, 
                      currency_code: "USD",
                    },
                  },
                ],
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(function (details) {
                alert(
                  `Thanh toán thành công với PayPal!\nThông tin: ${details.payer.name.given_name}\nTổng tiền: ${totalPriceVND} VND (tương đương ${totalPriceUSD} USD)`
                );
                navigate("/");
              });
            },
            onError: function (err) {
              console.error("Lỗi thanh toán PayPal:", err);
              alert("Có lỗi xảy ra trong quá trình thanh toán.");
            },
          })
          .render("#paypal-button-container"); 
      } else {
        console.error("Không tìm thấy phần tử #paypal-button-container");
      }
    }
  }, [paymentMethod, totalPrice, navigate]);
  

  return (
    <div className="App">
      <h1>Danh sách sản phẩm</h1>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">
              {product.price.toLocaleString()} VND
            </p>
            <label>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
              />
              Chọn sản phẩm
            </label>
          </div>
        ))}
      </div>

      <div className="payment-section">
        <h2>Tổng giá tiền: {totalPrice.toLocaleString()} VND</h2>

        <div className="payment-method">
          <label htmlFor="payment-method">Chọn phương thức thanh toán: </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Thanh toán khi nhận hàng</option>
            <option value="credit-card">Thẻ tín dụng</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {paymentMethod !== "paypal" ? (
          <button className="elevated-button" onClick={handlePayment}>
            Thanh toán
          </button>
        ) : (
          <div id="paypal-button-container"></div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
