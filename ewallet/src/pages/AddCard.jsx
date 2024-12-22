import React from "react";
import AddCardForm from "../components/AddCardForm";
import { useLocation } from "react-router-dom";

const AddCard = () => {
  const location = useLocation();
  const editCard = location.state;

  const handleSaveCard = (cardData) => {
    const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");

    if (editCard) {
      const updatedCards = savedCards.map((card) =>
        card.cardNumber === editCard.cardNumber ? cardData : card
      );
      localStorage.setItem("cards", JSON.stringify(updatedCards));
    } else {
      savedCards.push({ ...cardData, zIndex: savedCards.length });
      localStorage.setItem("cards", JSON.stringify(savedCards));
    }
  };

  return <AddCardForm onSave={handleSaveCard} editCard={editCard} />;
};

export default AddCard;
