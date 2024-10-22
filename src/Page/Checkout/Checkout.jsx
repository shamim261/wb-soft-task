import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "../../ContextAPIs/CartContext";

const Checkout = () => {
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
  dob: "2024-10-23";
  email: "shamim@test.com";
  formNo: "dafdf";
  fullName: "sdsd";
  gender: "Female";
  guardianName: "sdffsd";
  jobInfo: "sdfsdf";
  mobile: "sdfsd";
  nid: "dsfsdf";
  parentName: "dafdsf";
  parentNumber: "sdfsdf";
  permanentAddress: "sdf";
  presentAddress: "sdfds";
  school: "dc";
  const submitHandler = async (data) => {
    console.log(data);
    const userData = {
      course_id: 1,
      admission_date: new Date().toJSON().slice(0, 10),
      // photo,
      name: data.fullName,
      father_name: data.guardianName,
      father_phone: data.parentNumber,
      school_collage_name: data.school,
      job_title: data.jobInfo,

      gender: data.gender,
      email: data.email,
      phone_no: data.mobile,
      present_address: data.presentAddress,
      permanent_address: data.permanentAddress,
      nid_no: data.nid,
      local_guardian_name: data.localGuardianName,
      local_guardian_phone: data.mobile,
      date_of_birth: data.dob,
      blood_group: data.bloodGroup,
    };
    const response = await axios.post(
      "https://itder.com/api/course-purchase",
      data
    );
    console.log(response);
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
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                {...register("fullName", { required: true })}
                type="text"
                id="fullName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form no:
              </label>
              <input
                {...register("formNo", { required: true })}
                type="text"
                id="formNo"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                {...register("parentName", { required: true })}
                type="text"
                id="parentName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Number:
              </label>
              <input
                {...register("parentNumber", { required: true })}
                type="text"
                id="parentNumber"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                {...register("school", { required: true })}
                type="text"
                id="school"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                {...register("jobInfo", { required: true })}
                type="text"
                id="jobInfo"
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
                {...register("presentAddress", { required: true })}
                id="presentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                {...register("permanentAddress", { required: true })}
                id="permanentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                {...register("nid", { required: true })}
                type="text"
                id="nid"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile No:
              </label>
              <input
                {...register("mobile", { required: true })}
                type="text"
                id="mobile"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="localGuardianName"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Name:
              </label>
              <input
                {...register("localGuardianName", { required: true })}
                type="text"
                id="localGuardianName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                {...register("dob", { required: true })}
                type="date"
                id="dob"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="bloodGroup"
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
