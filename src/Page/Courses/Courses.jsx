import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../ContextAPIs/CartContext";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("https://itder.com/api/get-course-list");
      setCourses(data.courseData);
    };
    getData();
  }, []);

  // add to cart
  const { state, dispatch } = useCart();
  const cartItems = state?.cart?.cartItems;

  const handleAddToCart = (course) => {
    if (state.cart.cartItems.id) {
      toast.info("You can only add one course to cart");
      return;
    }
    let updatedCourse = { ...course, quantity: 1 };
    dispatch({ type: "ADD_TO_CART", payload: updatedCourse });

    toast.success("Successfully added to cart");
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(3);
  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourses = courses.slice(firstCourseIndex, lastCourseIndex);

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentCourses.map((course, index) => (
          <div
            key={index}
            className=" bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img src={course.photo} alt="" className="min-h-[370px]" />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">
                  {course.course_name}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {course.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">
                  ★★★★★(no need to change)
                </span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {course.trainer_data?.name}
                </span>
              </div>
              {/* <div className="flex gap-2 mb-4 flex-wrap">
                                {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
                                    <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
              <p className="text-gray-600 text-md mb-4">
                Course Details{" "}
                <span className="text-blue-500">
                  Show Details(no need to change)
                </span>
              </p>
              <hr />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    {course.regular_price}
                  </span>
                  <span className="text-green-600 text-md font-bold ml-2">
                    {Math.round(
                      ((course.regular_price - course.discount_price) /
                        course.regular_price) *
                        100
                    )}
                    % OFF
                  </span>
                  <span className="text-black text-lg font-bold ml-2">
                    {course.discount_price} tk
                  </span>
                </div>
                {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md"
                  onClick={() => handleAddToCart(course)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Courses;
