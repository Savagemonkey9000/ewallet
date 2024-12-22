import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import { FaEdit, FaCheck } from "react-icons/fa";

const Wallet = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUserId, setTempUserId] = useState(userId);
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const handleDeleteCard = (cardToDelete) => {
    setCards(cards.filter((c) => c !== cardToDelete));
  };

  const handleEditCard = (cardToEdit) => {
    navigate("/addcard", { state: cardToEdit });
  };

  const handleSaveUsername = () => {
    setUserId(tempUserId);
    setIsEditingUsername(false);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">My Wallet</h1>
          <div className="flex items-center gap-2 max-w-md">
            {isEditingUsername ? (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  value={tempUserId}
                  onChange={(e) => setTempUserId(e.target.value)}
                  className="flex-1 p-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSaveUsername}
                  className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <FaCheck className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex-1 flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className={`${!userId && 'text-gray-400'}`}>
                  {userId || 'Username'}
                </span>
                <button
                  onClick={() => {
                    setTempUserId(userId);
                    setIsEditingUsername(true);
                  }}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.cardNumber}
              className="transition-all duration-300 hover:-translate-y-1"
            >
              <WalletCard
                card={card}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
              />
            </div>
          ))}
          
          {cards.length < 4 && (
            <Link
              to="/addcard"
              className="flex items-center justify-center w-[340px] h-[220px] rounded-xl bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl text-blue-500">+</span>
                </div>
                <span className="text-gray-600 text-lg">Add New Card</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
