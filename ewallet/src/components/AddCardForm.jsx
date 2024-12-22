import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Walletcard from "./WalletCard";

const banks = [
  {
    name: "Peyman Global Trade",
    primaryColor: "black",
    secondaryColor: "yellow",
  },
  {
    name: "Stonks Rising Holdings",
    primaryColor: "red",
    secondaryColor: "yellow",
  },
  { name: "Yilong Ginnko Bank", primaryColor: "blue", secondaryColor: "white" },
];

const AddCardForm = ({ onSave, editCard }) => {
  const navigate = useNavigate();
  const [bankName, setBankName] = useState(editCard?.bankName || banks[0].name);
  const [cardNumber, setCardNumber] = useState(
    editCard?.cardNumber?.replace(/\s/g, "") || ""
  );
  const [cardholderName, setCardholderName] = useState(
    editCard?.cardholderName || ""
  );
  const [expiryMonth, setExpiryMonth] = useState(editCard?.expiryMonth || "");
  const [expiryYear, setExpiryYear] = useState(editCard?.expiryYear || "");
  const [cvv, setCvv] = useState(editCard?.cvv || "");
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const validateCardNumber = (value) => {
    if (!value) return "Card number is required";
    if (value.length !== 16) return "Card number must be 16 digits";
    if (!/^\d+$/.test(value)) return "Card number must contain only digits";
    return "";
  };

  const validateCardholderName = (value) => {
    if (!value) return "Cardholder name is required";
    if (!/^[a-zA-Z ]+$/.test(value)) return "Name must contain only letters";
    return "";
  };

  const validateExpiryMonth = (value) => {
    if (!value) return "Month is required";
    if (value < 1 || value > 12) return "Month must be between 1 and 12";
    return "";
  };

  const validateExpiryYear = (value) => {
    if (!value) return "Year is required";
    if (value <= new Date().getFullYear()) return "Year must be in the future";
    return "";
  };

  const validateCvv = (value) => {
    if (!value) return "CVV is required";
    if (value.length !== 3) return "CVV must be 3 digits";
    if (!/^\d+$/.test(value)) return "CVV must contain only digits";
    return "";
  };

  const handleCardNumberChange = (e) => {
    const re = /(?!^\d+$)^.+$/g;
    const v = e.target.value.match(re);
    if (v) return;
    const value = e.target.value;
    setCardNumber(value);
    setErrors((prev) => ({
      ...prev,
      cardNumber: validateCardNumber(value),
    }));
  };

  const handleCardholderNameChange = (e) => {
    const value = e.target.value;
    setCardholderName(value);
    setErrors((prev) => ({
      ...prev,
      cardholderName: validateCardholderName(value),
    }));
  };

  const handleExpiryMonthChange = (e) => {
    const value = e.target.value;
    setExpiryMonth(value);
    setErrors((prev) => ({
      ...prev,
      expiryMonth: validateExpiryMonth(value),
    }));
  };

  const handleExpiryYearChange = (e) => {
    const value = e.target.value;
    setExpiryYear(value);
    setErrors((prev) => ({
      ...prev,
      expiryYear: validateExpiryYear(value),
    }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    setErrors((prev) => ({
      ...prev,
      cvv: validateCvv(value),
    }));
  };

  const isValid =
    !errors.cardNumber &&
    !errors.cardholderName &&
    !errors.expiryMonth &&
    !errors.expiryYear &&
    !errors.cvv &&
    cardNumber &&
    cardholderName &&
    expiryMonth &&
    expiryYear &&
    cvv;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardData = {
      bankName,
      cardNumber: cardNumber.match(/.{1,4}/g).join(" "),
      cardholderName,
      expiryMonth,
      expiryYear,
      cvv,
    };

    onSave(cardData);
    navigate("/");
  };

  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <div className="relative px-4 py-10 bg-gray-100 mx-auto rounded-lg shadow-md sm:p-8 w-full max-w-md flex flex-col gap-2 items-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {editCard ? "Edit Card" : "Add New Card"}
          </h2>
          <Walletcard
            card={{
              bankName,
              cardNumber: cardNumber ? cardNumber.match(/.{1,4}/g).join(" "): undefined,
              cardholderName,
              expiryMonth,
              expiryYear,
              cvv,
            }}
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {banks.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative h-[70px]">
              <input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className={`w-full p-3 bg-gray-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cardNumber ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.cardNumber && (
                <p className="absolute text-red-500 text-xs mt-1">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div className="relative h-[70px]">
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardholderName}
                onChange={handleCardholderNameChange}
                className={`w-full p-3 bg-gray-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cardholderName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.cardholderName && (
                <p className="absolute text-red-500 text-xs mt-1">
                  {errors.cardholderName}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <div className="relative h-[70px] flex-1">
                <input
                  type="number"
                  min="1"
                  max="12"
                  placeholder="MM"
                  value={expiryMonth}
                  onChange={handleExpiryMonthChange}
                  className={`w-full p-3 bg-gray-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expiryMonth ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.expiryMonth && (
                  <p className="absolute text-red-500 text-xs mt-1">
                    {errors.expiryMonth}
                  </p>
                )}
              </div>

              <div className="relative h-[70px] flex-1">
                <input
                  type="number"
                  min={new Date().getFullYear()}
                  placeholder="YYYY"
                  value={expiryYear}
                  onChange={handleExpiryYearChange}
                  className={`w-full p-3 bg-gray-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expiryYear ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.expiryYear && (
                  <p className="absolute text-red-500 text-xs mt-1">
                    {errors.expiryYear}
                  </p>
                )}
              </div>

              <div className="relative h-[70px] flex-1">
                <input
                  type="password"
                  maxLength="3"
                  placeholder="CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                  className={`w-full p-3 bg-gray-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cvv ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.cvv && (
                  <p className="absolute text-red-500 text-xs mt-1">
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Link
                to="/"
                className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!isValid}
                className="px-6 py-2 text-white rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {editCard ? "Save" : "Add"} Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCardForm;
