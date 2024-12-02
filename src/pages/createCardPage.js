import React, { useState } from 'react';
import './../App.css';
import { useLocation, useNavigate } from 'react-router-dom';

function CreditCardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice } = location.state;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const validateCardNumber = (number) => {
    const cardPattern = /^\d{16}$/;  
    return cardPattern.test(number);
  };

  const validateExpiryDate = (date) => {
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; 
    const now = new Date();
    const expiryMonth = parseInt(date.split('/')[0], 10);
    const expiryYear = parseInt(date.split('/')[1], 10) + 2000; 

    if (!expiryPattern.test(date)) return false;

    const expiryDate = new Date(expiryYear, expiryMonth - 1); 
    return expiryDate >= now; 
  };

  const validateCvv = (cvv) => {
    const cvvPattern = /^\d{3,4}$/;  
    return cvvPattern.test(cvv);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    setCardNumberError('');
    setExpiryDateError('');
    setCvvError('');

    if (!cardNumber || !validateCardNumber(cardNumber)) {
      setCardNumberError('Số thẻ tín dụng không hợp lệ! (Cần 16 chữ số)');
      isValid = false;
    }

    if (!expiryDate || !validateExpiryDate(expiryDate)) {
      setExpiryDateError('Ngày hết hạn không hợp lệ!');
      isValid = false;
    }

    if (!cvv || !validateCvv(cvv)) {
      setCvvError('CVV không hợp lệ! (Cần 3 hoặc 4 chữ số)');
      isValid = false;
    }

    if (isValid) {
      alert(`Thông tin thẻ: \nSố thẻ: ${cardNumber}\nNgày hết hạn: ${expiryDate}\nCVV: ${cvv}\nTổng tiền thanh toán: ${totalPrice} VND`);
      alert('Thanh toán thành công!');
      navigate('/');
    }
  };

  return (
    <div className="payment-page">
      <h1>Nhập thông tin thẻ tín dụng</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Số thẻ tín dụng:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Nhập số thẻ tín dụng"
          />
          {cardNumberError && <p className="error-message">{cardNumberError}</p>}
        </label>

        <div className="input-group">
          <label>
            Ngày hết hạn:
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
            {expiryDateError && <p className="error-message">{expiryDateError}</p>}
          </label>

          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
            />
            {cvvError && <p className="error-message">{cvvError}</p>}
          </label>
        </div>

        <button type="submit">Xác nhận thẻ</button>
      </form>
    </div>
  );
}

export default CreditCardPage;
