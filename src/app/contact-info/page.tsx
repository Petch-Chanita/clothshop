"use client";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDownIcon,
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button, Field, Input, Menu, Select } from "@headlessui/react";
import EmptyCart from "@/components/common/Empty/Empty";
import { CartItem } from "@/type/cart";

const thailandData: any = {
  กรุงเทพมหานคร: {
    เขตบางรัก: {
      มหาพฤฒาราม: "10500",
      สีลม: "10500",
    },
    เขตปทุมวัน: {
      รองเมือง: "10330",
    },
  },
  เชียงใหม่: {
    เมืองเชียงใหม่: {
      ศรีภูมิ: "50200",
    },
  },
};

type ContactFormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  selectedProvince?: string;
  selectedDistrict?: string;
  selectedSubDistrict?: string;
  zipcode?: string;
  phone?: string;
  address?: string;
};

type TextErrors = {
  text?: string;
};

interface Props {
  checkoutPage?: boolean;
  containerRight?: any;
  slipPreview?: any;
}

export default function ContactInfoPage({
  checkoutPage,
  containerRight,
  slipPreview,
}: Props) {
  const {
    cartItems,
    selectedItems,
    totalAmount,
    grandTotal,
    setGrandTotal,
    setSelectedItems,
    setCartItems,
    setTotalAmount,
  } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectedProvince: "",
    selectedDistrict: "",
    selectedSubDistrict: "",
    zipcode: "",
    phone: "",
    address: "",
  });

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [textErrors, setTextErrors] = useState<TextErrors>({});
  const visibleItems = showAll ? selectedItems : selectedItems.slice(0, 3);
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const shipping = totalItems * 15;

  const provinces = Object.keys(thailandData);
  const districts =
    selectedProvince && thailandData[selectedProvince]
      ? Object.keys(thailandData[selectedProvince])
      : [];

  const subdistricts =
    selectedProvince &&
    selectedDistrict &&
    thailandData[selectedProvince] &&
    thailandData[selectedProvince][selectedDistrict]
      ? Object.keys(thailandData[selectedProvince][selectedDistrict])
      : [];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitting", form);
    const errors: ContactFormErrors = {};

    if (!form.firstName) errors.firstName = "กรุณากรอกชื่อจริง";
    if (!form.lastName) errors.lastName = "กรุณากรอกนามสกุล";
    if (!form.email) errors.email = "กรุณากรอกอีเมล";
    if (!form.selectedProvince) errors.selectedProvince = "กรุณาเลือกจังหวัด";
    if (!form.selectedDistrict) errors.selectedDistrict = "กรุณาเลือกอำเภอ";
    if (!form.selectedSubDistrict)
      errors.selectedSubDistrict = "กรุณาเลือกตำบล";
    if (!form.zipcode) errors.zipcode = "กรุณากรอกรหัสไปรษณีย์";
    if (!form.phone) errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    if (!form.address) errors.address = "กรุณากรอกที่อยู่";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      localStorage.setItem("contactInfo", JSON.stringify(form));
      router.push("/checkout");
    }
  };

  const handleSubmitPayment = (e: any) => {
    e.preventDefault();
    console.log("Submitting", form);
    const errors: ContactFormErrors = {};
    const textErrors: TextErrors = {};

    if (!form.firstName) errors.firstName = "กรุณากรอกชื่อจริง";
    if (!form.lastName) errors.lastName = "กรุณากรอกนามสกุล";
    if (!form.email) errors.email = "กรุณากรอกอีเมล";
    if (!form.selectedProvince) errors.selectedProvince = "กรุณาเลือกจังหวัด";
    if (!form.selectedDistrict) errors.selectedDistrict = "กรุณาเลือกอำเภอ";
    if (!form.selectedSubDistrict)
      errors.selectedSubDistrict = "กรุณาเลือกตำบล";
    if (!form.zipcode) errors.zipcode = "กรุณากรอกรหัสไปรษณีย์";
    if (!form.phone) errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    if (!form.address) errors.address = "กรุณากรอกที่อยู่";
    if (!slipPreview) textErrors.text = "*กรุณาแนปสลิปรูปภาพ";

    if (Object.keys(errors && textErrors).length > 0) {
      setFormErrors(errors);
      setTextErrors(textErrors);
    } else {
      setIsSubmitting(true);

      localStorage.setItem("contactInfo", JSON.stringify(form));
      localStorage.removeItem("cart");

      setCartItems((prevCart: CartItem) =>
        prevCart.filter(
          (item: CartItem) =>
            !selectedItems.some((selected: CartItem) => selected.id === item.id)
        )
      );


      router.push("/thank-you");

      setTimeout(() => {

        setTotalAmount(0);
        setGrandTotal(0);
        setSelectedItems([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (
      selectedProvince &&
      selectedDistrict &&
      selectedSubDistrict &&
      thailandData[selectedProvince] &&
      thailandData[selectedProvince][selectedDistrict] &&
      thailandData[selectedProvince][selectedDistrict][selectedSubDistrict]
    ) {
      const zip =
        thailandData[selectedProvince][selectedDistrict][selectedSubDistrict];
      setForm((prev) => ({ ...prev, zipcode: zip }));
    }
  }, [selectedProvince, selectedDistrict, selectedSubDistrict]);

  useEffect(() => {
    const savedData = localStorage.getItem("contactInfo");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setForm((prevForm) => ({
          ...prevForm,
          ...parsedData,
        }));
        setSelectedProvince(parsedData.selectedProvince || "");
        setSelectedDistrict(parsedData.selectedDistrict || "");
        setSelectedSubDistrict(parsedData.selectedSubDistrict || "");
      } catch (error) {
        console.error("ไม่สามารถแปลงข้อมูลที่บันทึกไว้ได้:", error);
      }
    }
  }, []);

  useEffect(() => {
    const newTotal = totalAmount + shipping;
    setGrandTotal(newTotal);
  }, [totalAmount, shipping]);

  return !isSubmitting && selectedItems?.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className="max-w-full min-h-screen bg-[#f7f7f7] pl-15 pt-10 pb-10 pr-15">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 border-r border-gray-900/10"
        >
          <div className="space-y-6 mx-auto w-full h-full">
            <div className="w-full mx-auto pb-6 p-5">
              <h1 className="text-2xl font-semibold mb-4 mx-auto">
                ข้อมูลส่วนตัว
              </h1>
              <p className="mt-1 text-sm/6 text-gray-600">
                กรุณาระบุที่อยู่ที่ต้องการให้จัดส่งสินค้า
              </p>

              <div className="mt-10 grid grid-cols-4 gap-x-6 gap-y-8 ">
                {/* ชื่อจริง */}
                <Field className="col-span-2">
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    ชื่อจริง
                  </label>
                  <div className="mt-2">
                    <Input
                      id="first-name"
                      name="firstName"
                      type="text"
                      placeholder="ชื่อจริง"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                </Field>

                {/* นามสกุล */}
                <Field className="col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    นามสกุล
                  </label>
                  <div className="mt-2">
                    <Input
                      id="last-name"
                      name="lastName"
                      type="text"
                      placeholder="นามสกุลจริง"
                      value={form.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </Field>

                {/* อีเมล */}
                <Field className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    อีเมล
                  </label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Example@email.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </Field>

                {/* โทรศัพท์ */}
                <Field className="col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    โทรศัพท์
                  </label>
                  <div className="mt-2">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="เบอร์โทร"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="phone"
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </Field>

                {/* ที่อยู่ */}
                <Field className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    ที่อยู่
                  </label>
                  <div className="mt-2">
                    <Input
                      id="street-address"
                      name="address"
                      type="text"
                      placeholder="บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                      value={form.address}
                      onChange={handleChange}
                      autoComplete="street-address"
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                </Field>

                {/* จังหวัด */}
                <Field className="col-span-2 sm:col-start-1">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    จังหวัด
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <Select
                      id="city"
                      name="city"
                      value={form.selectedProvince}
                      onChange={(e) => {
                        const province = e.target.value;
                        setSelectedProvince(province);
                        setForm((prev) => ({
                          ...prev,
                          selectedProvince: province,
                          selectedDistrict: "",
                          selectedSubDistrict: "",
                          zipcode: "",
                        }));
                      }}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="">-- เลือกจังหวัด --</option>
                      {provinces.map((province) => (
                        <option key={province}>{province}</option>
                      ))}
                    </Select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {formErrors.selectedProvince && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.selectedProvince}
                    </p>
                  )}
                </Field>

                {/* อำเภอ */}
                <Field className="col-span-2">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    อำเภอ
                  </label>
                  <div className="mt-2  grid grid-cols-1">
                    <Select
                      id="district"
                      name="district"
                      value={form.selectedDistrict}
                      onChange={(e) => {
                        const district = e.target.value;
                        setSelectedDistrict(district);
                        setForm((prev) => ({
                          ...prev,
                          selectedDistrict: district,
                          selectedSubDistrict: "",
                          zipcode: "",
                        }));
                      }}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      disabled={!selectedProvince}
                    >
                      <option value="">-- เลือกอำเภอ --</option>
                      {districts.map((district) => (
                        <option key={district}>{district}</option>
                      ))}
                    </Select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {formErrors.selectedDistrict && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.selectedDistrict}
                    </p>
                  )}
                </Field>

                {/* ตำบล */}
                <Field className="col-span-2">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    ตำบล
                  </label>
                  <div className="mt-2  grid grid-cols-1">
                    <Select
                      id="subDistrict"
                      name="subDistrict"
                      value={form.selectedSubDistrict}
                      onChange={(e) => {
                        const subDistrict = e.target.value;
                        setSelectedSubDistrict(subDistrict);
                        const zip =
                          thailandData[selectedProvince]?.[selectedDistrict]?.[
                            subDistrict
                          ] || "";
                        setForm((prev) => ({
                          ...prev,
                          selectedSubDistrict: subDistrict,
                          zipcode: zip,
                        }));
                      }}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      disabled={!selectedDistrict}
                    >
                      <option value="">-- เลือกตำบล --</option>
                      {subdistricts.map((sub) => (
                        <option key={sub}>{sub}</option>
                      ))}
                    </Select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                    {formErrors.selectedSubDistrict && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.selectedSubDistrict}
                      </p>
                    )}
                  </div>
                </Field>

                {/* รหัสไปรษณีย์ */}
                <Field className="col-span-2">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    ไปรษณีย์
                  </label>
                  <div className="mt-2">
                    <Input
                      id="zipcode"
                      type="text"
                      name="zipcode"
                      placeholder="รหัสไปรษณีย์"
                      value={form.zipcode}
                      readOnly
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {formErrors.zipcode && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.zipcode}
                      </p>
                    )}
                  </div>
                </Field>
              </div>
            </div>
          </div>
          {/* ปุ่มกลับ */}
          <div className="flex items-end lg:justify-start sm:justify-center">
            <div className="text-center pr-5 py-2 px-5">
              <Button
                onClick={() => {
                  if (!checkoutPage) return router.push(`/cart`);
                  router.push(`/contact-info`);
                }}
                type="button"
                className={`flex gap-2 bg-gray-900 hover:bg-gray-800 focus:outline-2 focus:outline-offset-2 focus:outline-gray-900 active:bg-gray-800 text-white cursor-pointer px-6 py-2 rounded `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
                <span>กลับ</span>
              </Button>
            </div>
          </div>
        </form>

        {!checkoutPage && (
          <div className="flex flex-col w-full overflow-hidden h-full ">
            {/* รายการสั้งซื้อ */}
            <h1 className="text-2xl font-semibold mb-4 pb-6 p-5">
              รายการสั่งซื้อ
            </h1>

            <div className="w-full h-[300] mx-auto space-y-5 overflow-y-auto pr-10 pl-10 mt-5">
              {/* แสดงรายการสินค้า */}
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white gap-4 py-4 px-5 border-b border-gray-300"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">ไซส์: {item.size}</p>
                    <p className="text-sm text-gray-700">
                      ฿{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {/* ปุ่มดูเพิ่มเติม / ซ่อนรายการ */}
              {selectedItems.length > 3 && (
                <div className="text-center mt-2">
                  <button
                    className="text-indigo-500 underline cursor-pointer"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll
                      ? "ย่อรายการ"
                      : `ดูรายการเพิ่มเติม (${selectedItems.length - 3} รายการ)
                        `}
                  </button>
                </div>
              )}
            </div>

            <div className="w-full px-5 py-4 rounded-lg sticky top-10 self-start">
              <div className="px-5 py-4 border-b border-gray-300">
                <div className="text-end mt-2">
                  ยอดรวมย่อย{" "}
                  {totalAmount.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })}
                </div>
                <div className="text-end mt-2">
                  {" "}
                  <span>ค่าจัดส่ง </span>
                  <span>
                    {shipping.toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}
                  </span>
                </div>
              </div>

              {/* รวมราคา */}
              <div className="text-end px-5 py-4 mt-2 font-semibold">
                รวม:{" "}
                {grandTotal.toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })}
              </div>
            </div>

            {/* ปุ่มไปหน้าชำระ */}
            <div className="flex justify-end">
              <div className="text-center pr-5 py-2 px-5">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className={`bg-gray-900 hover:bg-gray-800 focus:outline-2 focus:outline-offset-2 focus:outline-gray-900 active:bg-gray-800 text-white cursor-pointer rounded px-6 py-2  
               
                  `}
                >
                  ไปหน้าชำระเงิน
                </Button>
              </div>
            </div>
          </div>
        )}

        {checkoutPage && (
          <div className="w-full flex flex-col h-full">
            {containerRight()}
            {/* ปุ่มไปหน้าชำระ */}
            <div className="flex items-end justify-end">
              <div className="pr-5 py-2 px-5 text-center">
                <Button
                  type="submit"
                  onClick={handleSubmitPayment}
                  className={`bg-gray-900 hover:bg-gray-800 focus:outline-2 focus:outline-offset-2 focus:outline-gray-900 active:bg-gray-800 text-white cursor-pointer rounded px-6 py-2  
               
                  `}
                >
                  ยืนยันการชำระเงิน
                </Button>
              </div>
            </div>
            {textErrors.text && (
              <p className="text-red-500 text-sm mt-1">{textErrors.text}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
