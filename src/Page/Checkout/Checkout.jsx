import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../ContextAPIs/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const cartItems = state.cart.cartItems;
  const updateQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = { ...item, quantity: newQuantity };
      dispatch({ type: "ADD_TO_CART", payload: updatedItem });
    }
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discount_price * item.quantity || 1,
    0
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const test = cartItems.reduce(
    (total, item) => total + item.discount_price,
    0
  );

  const submitHandler = async (data) => {
    const orderData = {
      ...data,
      course_id: cartItems[0].id,
      course_fee: cartItems.reduce(
        (total, item) => total + item.discount_price,
        0
      ),
      course_qty: cartItems.reduce((total, item) => total + item.quantity, 0),
      total_course_fee: totalPrice,
      discount_course_fee: 0,
      sub_total_course_fee: totalPrice,
      photo: data.photo[0],
    };

    const response = await axios.post(
      "https://itder.com/api/course-purchase",
      orderData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    navigate("/order-details", { state: { orderData, res } });
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="  mt-5 border mx-2">
      <div class="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block font-semibold text-base mb-2"
              >
                Phone No:
              </label>
              <input
                {...register("phone_no", { required: true })}
                type="number"
                id="phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="father_name"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                {...register("father_name", { required: true })}
                type="text"
                id="father_name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="father_phone_no"
                className="block font-semibold text-base mb-2"
              >
                Father Phone No:
              </label>
              <input
                {...register("father_phone_no", { required: true })}
                type="number"
                id="father_phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school_collage_name"
                className="block font-semibold text-base mb-2"
              >
                School/College Name:
              </label>
              <input
                {...register("school_collage_name", { required: true })}
                type="text"
                id="school_collage_name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="job_title"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                {...register("job_title", { required: true })}
                type="text"
                id="job_title"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                {...register("gender", { required: true })}
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                {...register("present_address", { required: true })}
                id="present_address"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanent_address"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                {...register("permanent_address", { required: true })}
                id="permanent_address"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid_no"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                {...register("nid_no", { required: true })}
                type="text"
                id="nid_no"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="local_guardian_phone_no"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian Phone No:
              </label>
              <input
                {...register("local_guardian_phone_no", { required: true })}
                type="number"
                id="local_guardian_phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="local_guardian_name"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Name:
              </label>
              <input
                {...register("local_guardian_name", { required: true })}
                type="text"
                id="local_guardian_name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="date_of_birth"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                {...register("date_of_birth", { required: true })}
                type="date"
                id="date_of_birth"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="blood_group"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                {...register("blood_group", { required: true })}
                id="blood_group"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block font-semibold text-base mb-2"
              >
                Photo:
              </label>
              <input
                {...register("photo", { required: true })}
                type="file"
                id="photo"
              />
            </div>
          </div>
        </div>

        <div className="m-mt_16px">
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <div className="w-full lg:w-[58%] bg-white border-2">
                <table className=" overflow-x-auto  w-full">
                  <thead>
                    <tr className="border-b-4 border-gray-300">
                      <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                        Course
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Price
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Quantity
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Sub Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="overflow-x-auto ">
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-300 overflow-x-auto"
                      >
                        <td>
                          <div className="flex items-center justify-center ">
                            <div
                              className="w-[20%] text-center flex items-center justify-center cursor-pointer"
                              onClick={() => removeItem(item)}
                            >
                              <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                            </div>
                            <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                              <div className="mask">
                                <img
                                  className="h-[40px] w-[70px] object-contain"
                                  src={item.photo}
                                  alt="Course"
                                />
                              </div>
                              <p className="text-[14.4px] px-[7px] text-center flex ">
                                {item.course_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            {item.discount_price}
                          </p>
                        </td>
                        <td>
                          <div className="flex justify-center">
                            <div className="border">
                              <button
                                disabled={item.quantity === 1}
                                className="px-4 w-[30px] font-bold font_standard my-1.5"
                                onClick={() =>
                                  updateQuantity(item, (item.quantity || 1) - 1)
                                }
                              >
                                -
                              </button>
                            </div>
                            <div className="border-y">
                              {/* <input
                            type="number"
                            className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                            value={item.quantity}
                          /> */}
                              <span className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full flex items-center justify-center">
                                {item.quantity || 1}
                              </span>
                            </div>
                            <div className="border">
                              <button
                                onClick={() =>
                                  updateQuantity(item, (item.quantity || 1) + 1)
                                }
                                className="px-4 w-[30px] font-bold font_standard my-1.5"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            {(item.discount_price * item.quantity).toFixed(2)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:w-[41%] bg-white border-2 ">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">Total Price</p>
                    <p className="text-black font-bold">{totalPrice}</p>
                  </div>

                  <button
                    type="submit"
                    state={"bdt"}
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
