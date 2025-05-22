"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PeerChecked } from "@/components/icon";
import EmptyCart from "@/components/common/Empty/Empty";

export default function CartPage() {
  const router = useRouter();

  const {
    cartItems,
    removeFromCart,
    selectedItems,
    setSelectedItems,
    totalAmount,
    setTotalAmount,
  } = useCart();

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      setSelectedItems(cartItems);
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
    } else {
      setSelectedItems([]);
      setTotalAmount(0);
    }
  };

  const handleSelectItem = (itemId: string) => {
    const itemToSelect = cartItems.find((item) => item.id === itemId);
    if (!itemToSelect) return;

    const isSelected = selectedItems.some((item) => item.id === itemId);

    const newSelectedItems = isSelected
      ? selectedItems.filter((item) => item.id !== itemId)
      : [...selectedItems, itemToSelect];

    const total = newSelectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setSelectedItems(newSelectedItems);
    setTotalAmount(total);
  };

  const handleRemoveItem = (itemId: string, itemSize: string) => {
    // ลบออกจาก cart
    removeFromCart(itemId, itemSize);

    // เอาออกจาก selectedItems
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) =>
        !(selectedItem.id === itemId && selectedItem.size === itemSize)
    );

    setSelectedItems(updatedSelectedItems);

    // คำนวณยอดรวมใหม่
    const newTotal = updatedSelectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);
  };

  useEffect(() => {
    setSelectAll(
      cartItems.length > 0 && selectedItems.length === cartItems.length
    );
  }, [cartItems, selectedItems]);

  useEffect(() => {
    console.log("cartItems cart", cartItems);
  }, []);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="w-full min-h-screen  bg-[#f7f7f7] pl-15 pt-10 pb-10 pr-15">
      <h1 className="text-2xl font-bold mb-4">ตะกร้าของคุณ</h1>
      {/* Checkbox เลือกทั้งหมด */}
      <div className="flex items-center mb-3">
        <label className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <PeerChecked />
          </span>
        </label>
        <span className="ml-2 font-medium">เลือกทั้งหมด</span>
      </div>

      <div className="grid grid-cols-[3fr_2fr] gap-2">
        {/* Grid สำหรับรายการสินค้า */}
        <div className="w-full h-full space-y-1">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white gap-4 py-4 px-5 rounded-lg"
            >
              {/* Checkbox */}
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                    onChange={() => handleSelectItem(item.id)}
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                    id="check"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <PeerChecked />
                  </span>
                </label>
              </div>

              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={60}
                className="rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">ไซส์: {item.size}</p>
                <p className="text-sm text-gray-700">
                  ฿{item.price} x {item.quantity}
                </p>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemoveItem(item.id, item.size)}
              >
                ลบ
              </button>
            </div>
          ))}
        </div>

        {/* Grid สำหรับยอดเงินรวมและปุ่มชำระเงิน */}
        <div className="w-full h-[200] bg-white px-5 py-4 rounded-lg">
          <p className="font-bold text-xl">สรุปรายการสั่งซื้อ</p>

          <div className="flex justify-between pt-5 pb-2">
            <p>ราคาประมาณ:</p>
            <div className="text-right font-bold text-xl">
              {totalAmount.toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })}
            </div>
          </div>

          <button
            disabled={selectedItems.length === 0}
            onClick={() => router.push("/contact-info")}
            className={`px-4 py-2 rounded transition mt-4 w-full ${
              selectedItems.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800 focus:outline-2 focus:outline-offset-2 focus:outline-gray-900 active:bg-gray-800 text-white cursor-pointer"
            }`}
          >
            ชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
}
