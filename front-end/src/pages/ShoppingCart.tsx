import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaTrashAlt, FaHeart, FaRegEdit } from "react-icons/fa";

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  store: string;
  isSelected: boolean;
}

interface ShoppingCartProps {
  isOpen: boolean;
  toggleCart: () => void;
  activeTab: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  toggleCart,
  activeTab,
}) => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Wortel",
      image: "/images/wortel.jpg",
      price: 61500,
      originalPrice: 79000,
      discount: 23,
      quantity: 1,
      store: "Maumere Store",
      isSelected: false,
    },
    {
      id: 2,
      name: "Bayam Segar",
      image: "/images/bayam.jpg",
      price: 62500,
      originalPrice: 89900,
      discount: 17,
      quantity: 1,
      store: "Laku-laku Store",
      isSelected: false,
    },
    {
      id: 3,
      name: "Tomat",
      image: "/images/tomat.jpg",
      price: 65890,
      originalPrice: 140000,
      discount: 53,
      quantity: 1,
      store: "Segar Store",
      isSelected: false,
    },
    {
      id: 4,
      name: "Anggur",
      image: "/images/anggur.jpg",
      price: 75890,
      originalPrice: 180000,
      discount: 53,
      quantity: 1,
      store: "Medan Store",
      isSelected: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleQuantityChange = (id: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return items
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isSelected: newSelectAll }))
    );
  };

  const handleItemSelectChange = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  useEffect(() => {
    if (activeTab !== "cart" && isOpen) {
      toggleCart();
    }
  }, [activeTab, isOpen, toggleCart]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        toggleCart();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleCart]);

  if (!isOpen) return null;

  return (
    <div
      ref={cartRef}
      className="fixed top-0 right-0 w-96 shadow-lg rounded-lg z-40 bg-white"
    >
      <div className="p-4 border-b flex items-center justify-between bg-green-700 text-white">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button onClick={toggleCart} className="text-white hover:text-gray-200">
          <FaShoppingCart className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-green-600"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <label className="text-sm">Pilih Semua</label>
        </div>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start space-x-4 border-b pb-4"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-green-600"
                checked={item.isSelected}
                onChange={() => handleItemSelectChange(item.id)}
              />
              <div className="flex items-center space-x-4 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500">Toko: {item.store}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-2 py-1 bg-green-200 rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2 py-1 bg-green-200 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">
                    Rp {item.price.toLocaleString()}
                  </p>
                  <p className="text-xs line-through text-gray-400">
                    Rp {item.originalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button className="text-gray-500 hover:text-red-600">
                  <FaTrashAlt />
                </button>
                <button className="text-gray-500 hover:text-green-600">
                  <FaHeart />
                </button>
                <button className="text-gray-500 hover:text-green-600">
                  <FaRegEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-right text-lg font-semibold">
            Total: Rp {calculateTotalPrice().toLocaleString()}
          </p>
        </div>
        <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
          Beli
        </button>
        <p className="mt-2 text-center text-green-600 cursor-pointer hover:underline">
          Lihat Produk yang Lain
        </p>
      </div>
    </div>
  );
};

export default ShoppingCart;
