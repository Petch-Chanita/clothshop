"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, ReactElement } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import generatePayload from "promptpay-qr";
import { PhotoIcon } from "@heroicons/react/16/solid";
import ContactInfoPage from "../contact-info/page";
import EmptyCart from "@/components/common/Empty/Empty";

export default function CheckOutPage() {

  const { selectedItems, grandTotal } = useCart();
  const [slipPreview, setSlipPreview] = useState<string | null>(null);
  const [slipFile, setSlipFile] = useState<File | null>(null);

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const promptpayNumber = "0887474912";
  const qrValue = generatePayload(promptpayNumber, { amount: totalPrice });

  function handleSlipUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSlipFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSlipPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmitPayment() {
    if (!slipFile) {
      return;
    }

    // const formData = new FormData();
    // formData.append("slip", slipFile);
    // formData.append("items", JSON.stringify(selectedItems));
    // formData.append("totalAmount", totalAmount.toString());

    // const res = await fetch("/api/submit-payment", {
    //   method: "POST",
    //   body: formData,
    // });

    if (slipFile) {
      const formData = new FormData();
      console.log("formData", formData);

      //res.ok
      alert("ส่งข้อมูลสำเร็จ กรุณารอการตรวจสอบจากแอดมิน");
      // router.push("/thank-you");
    } else {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  }

  useEffect(() => {
    console.log("cartItems", selectedItems);
  }, [selectedItems]);

  if (selectedItems.length === 0) {
    return (
      <EmptyCart/>
    );
  }

  const container: any = () => {
    return (
      <div className="text-center w-full h-full mx-auto items-center">
        {/* แนบสลิปการโอนเงิน */}
        <div className="border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full mx-auto">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-900"
              >
                แนบสลิปการโอนเงิน
              </label>

              <div className="w-full h-[300] mt-2 flex flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {!slipPreview && (
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto size-12 text-gray-300"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {slipPreview && (
                  <div className="mt-6">
                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md inline-block">
                      <Image
                        src={slipPreview}
                        alt="slip preview"
                        width={150}
                        height={150}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>อัพโหลดไฟล์</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleSlipUpload}
                    />

                    <p className="pl-2 text-xs text-gray-600">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* หมายเหตุ */}
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-900"
          >
            เขียนหมายเหตุ
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              defaultValue=""
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen  bg-[#f7f7f7] pl-15 pt-10 pb-10 pr-15">
      {/* <h1 className="text-2xl font-bold mb-4">ชำระเงิน</h1> */}
      <section className="overflow-hidden gap-2">
        <div className="w-full px-5 py-4 rounded-lg sticky top-10 self-start">
          {/* รวมราคา */}
          <div className="text-center mt-2 font-bold">
            รวม:{" "}
            {grandTotal.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </div>

          {/* QR Code สำหรับ PromptPay */}
          <div className="mt-2 text-center">
            <p className="mb-2">สแกนเพื่อชำระเงิน</p>
            <div className="inline-block p-4 bg-white rounded shadow">
              {/* แสดง QR Code */}
              <QRCode value={qrValue} size={300} />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              PromptPay: {promptpayNumber}
            </p>
          </div>
        </div>
      </section>

      <section
        id="slipFile">
        {/* ฟอร์มสลิป & ที่อยู่ */}
        <ContactInfoPage checkoutPage={true} containerRight={container} slipPreview={slipPreview}/>
      </section>


    </div>
  );
}
