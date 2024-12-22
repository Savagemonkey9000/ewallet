import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MastercardLogo from "./MastercardLogo";
import Chip from "../assets/chip.svg";

const banks = [
  {
    name: "Peyman Global Trade",
    primaryColor: "from-gray-800 to-gray-900",
    secondaryColor: "white",
    logo: "PGT",
  },
  {
    name: "Stonks Rising Holdings",
    primaryColor: "from-red-600 to-red-700",
    secondaryColor: "white",
    logo: "SRH",
  },
  {
    name: "Yilong Ginnko Bank",
    primaryColor: "from-blue-600 to-blue-700",
    secondaryColor: "white",
    logo: "YGB",
  },
];

const WalletCard = ({ card, onDelete, onEdit }) => {
  const bankTheme = banks.find((b) => b.name === card.bankName);

  return (
    <div
      className={`relative w-[340px] h-[220px] rounded-xl bg-gradient-to-br min-w-fit min-h-fit ${bankTheme.primaryColor} p-7 text-${bankTheme.secondaryColor} shadow-xl transition-transform hover:scale-105`}
      style={{ zIndex: card.zIndex }}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="text-2xl font-bold tracking-wider opacity-80">
            {bankTheme.logo}
          </div>
          <div className="text-xs opacity-60 mt-1">{card.bankName}</div>
        </div>
        {(onEdit !== undefined || onDelete !== undefined) && (
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              title="Edit card"
            >
              <FaEdit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(card)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              title="Delete card"
            >
              <FaTrash className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-xl tracking-[0.2em] min-h-[29px] flex  gap-4 items-center ">
        <img src={Chip} alt="icon" className="w-10 h-8" />{" "}
        <span className="opacity-100">{card.cardNumber}</span>
      </div>

      <div className="mt-8 flex justify-between items-end min-h-[20px]">
        <div className="flex-1">
          <div className="text-[10px] opacity-75 mb-1">CARDHOLDER NAME</div>
          <div className="font-medium tracking-wider text-sm">
            {card.cardholderName.toUpperCase()}
          </div>
        </div>
        <div className="mx-4">
          <div className="text-[10px] opacity-75 mb-1">EXPIRES</div>
          <div className="font-medium tracking-wider text-sm">
            {card.expiryMonth.toString().padStart(2, "0")}/
            {card.expiryYear.toString().slice(-2)}
          </div>
        </div>
        <div className="flex-none">
          <MastercardLogo />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full h-full pointer-events-none rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default WalletCard;
