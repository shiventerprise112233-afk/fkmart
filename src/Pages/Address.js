import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Address = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "Andhra Pradesh",
    house: "",
    area: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    window.scroll(0,0)
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const saveAddress = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full Name is required.";

    if (!form.mobile.trim())
      newErrors.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";

    if (!form.pincode.trim())
      newErrors.pincode = "Pincode is required.";
    else if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode.";

    if (!form.city.trim())
      newErrors.city = "City is required.";

    if (!form.house.trim())
      newErrors.house = "House / Building Name is required.";

    if (!form.area.trim())
      newErrors.area = "Road name / Area / Colony is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(form)
    );

    navigate("/order-summary");
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-[16px] font-semibold">
          Add delivery address
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={saveAddress}
        className="bg-white mt-2 p-4 space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            Full Name (Required)*
          </label>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2 outline-none border ${
              errors.fullName
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            Mobile number (Required)*
          </label>

          <input
            type="tel"
            maxLength={10}
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2 outline-none border ${
              errors.mobile
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            Pincode (Required)*
          </label>

          <input
            type="text"
            maxLength={6}
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2 outline-none border ${
              errors.pincode
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.pincode}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            City (Required)*
          </label>

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2 outline-none border ${
              errors.city
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {errors.city && (
            <p className="text-red-500 text-xs mt-1">
              {errors.city}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            State (Required)*
          </label>

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
          >
            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* House */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            House No., Building Name (Required)*
          </label>

          <input
            type="text"
            name="house"
            value={form.house}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2 outline-none border ${
              errors.house
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {errors.house && (
            <p className="text-red-500 text-xs mt-1">
              {errors.house}
            </p>
          )}
        </div>

        {/* Area */}
        <div>
          <label className="block text-[14px] text-gray-700 mb-2">
            Road name, Area, Colony (Required)*
          </label>

          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            className={`w-full rounded px-3 py-2 outline-none border ${
              errors.area
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {errors.area && (
            <p className="text-red-500 text-xs mt-1">
              {errors.area}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#ff6f00] hover:bg-[#f76400] text-white font-semibold py-4 rounded mt-2"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;