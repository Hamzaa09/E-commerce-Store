import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Pages/Landing/Components/Navbar";
import TagLine from "../Pages/Landing/Components/TagLine";
import ScrollToTopButton from "../Pages/Landing/Components/ScrollToTopButton";
import NewsLetter from "../Pages/Landing/Components/NewsLetter";
import Footer from "../Pages/Landing/Components/Footer";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUserThunk,
  signupUserFacebookThunk,
  signupUserGoogleThunk,
} from "../../store/users/user.thunk";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import BreadCrum from "../Pages/Landing/Components/BreadCrum";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { authCheck, screenLoading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (authCheck) {
      navigate("/user");
    }
  }, [authCheck]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await dispatch(loginUserThunk(data));
    if (!response?.payload?.success) {
      toast.error(response?.payload?.message || "Something went wrong");
      return;
    }
    toast.success("Login Successfull!");
    navigate("/user");
  };

  // google login work
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const response = await dispatch(
          signupUserGoogleThunk({ code: authResult.code })
        );
        if (!response.payload?.success) {
          toast.error(response?.payload?.message || "Login failed!");
          return;
        }
        navigate("/user");
        toast.success("Login Successfull!");
      } else {
        toast.error("No Auth Code!");
      }
    } catch (err) {
      toast.error("Error Occured!");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  // facebook work
  const handleFacebookLoginSuccess = async (data) => {
    const { accessToken } = data;
    if (!accessToken) {
      toast.error("Token Expired!");
      return;
    }
    const response = await dispatch(signupUserFacebookThunk({ accessToken }));
    if (!response.payload?.success) {
      toast.error(response?.payload?.message || "SignUp failed!");
      return;
    }

    navigate("/user");
  };

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar />
      <BreadCrum />
      <div className="flex flex-col justify-center items-center min-h-fit 2xl:w-[1500px] 2xl:mx-auto">
        {/* form  */}
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center pt-8 pb-2 mt-15 border border-GrayLight lg:gap-1 w-[90%] sm:w-[90%] md:w-[60%] lg:w-[40%]"
        >
          {/* heading  */}
          <div className="w-[90%] border mb-5 border-white ">
            <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
              Login Please !
            </h1>
          </div>

          {/* email  */}
          <div className="relative w-[90%]">
            <div className="border border-GrayLight">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
                id="email"
                className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
              >
                E-mail
              </label>
            </div>
            <span className="text-Red text-sm p-1">
              {errors.email?.message}
            </span>
          </div>

          {/* password  */}
          <div className="relative w-[90%]">
            <div className="border border-GrayLight">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Invalid Password!",
                  minLength: {
                    value: 8,
                    message: "Invalid Password!",
                  },
                })}
                id="password"
                className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-2 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-2 hover:cursor-text select-none`}
              >
                Password
              </label>

              <div
                className="flex text-Gray absolute right-[3%] top-[25%] lg:text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                <IoEyeSharp
                  className={`${
                    showPassword ? "visible" : "hidden"
                  } cursor-pointer`}
                />
                <FaRegEyeSlash
                  className={`${
                    showPassword ? "hidden" : "visible"
                  } cursor-pointer`}
                />
              </div>
            </div>
            <span className="text-Red text-sm p-1">
              {errors.password?.message}
            </span>
          </div>

          <button
            type="submit"
            className="bg-Red text-white py-2 text-lg font-medium w-[50%] border hover:bg-white hover:text-black hover:border-GrayLight  hover:cursor-pointer transition duration-200 ease-in-out active:translate-y-1"
          >
            {screenLoading ? (
              <div className="loading loading-spinner loading-md"></div>
            ) : (
              <span>Login</span>
            )}
          </button>

          {/* login with google button */}
          <div className="w-[90%] flex justify-center items-center flex-col pt-5">
            <div className="flex justify-center items-center w-[70%]">
              <span className="flex justify-center items-center w-full">
                <span className="bg-GrayLight h-[1px] w-full"></span>
              </span>
              <span className="mx-5">OR</span>
              <span className="flex justify-center items-center w-full">
                <span className="bg-GrayLight h-[1px] w-full"></span>
              </span>
            </div>

            <div className="mt-5 flex gap-4 flex-col bigSm:flex-row transition-all duration-300 ease-in-out">
              {/* google  */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="flex gap-2 justify-center items-center border border-GrayLight p-2 rounded-2xl hover:bg-WhiteLight active:translate-y-1 hover:cursor-pointer"
              >
                <img
                  src="/buttons/google.png"
                  alt="google"
                  className="h-[20px]"
                />
                <span className="text-sm md:text-base">Login with Google</span>
              </button>

              {/* facebook  */}
              <div className="flex gap-2 justify-center items-center border border-GrayLight p-2 rounded-2xl hover:bg-WhiteLight active:translate-y-1 hover:cursor-pointer">
                <img
                  src="/buttons/facebook.jpg"
                  alt="facebook"
                  className="h-[20px]"
                />
                <FacebookLogin
                  appId={import.meta.env.VITE_FACEBOOK_ID}
                  onSuccess={handleFacebookLoginSuccess}
                  onFail={(error) => {
                    console.log(error);
                  }}
                  onProfileSuccess={() => {
                    toast.success("Login Successful!");
                  }}
                  className="hover:cursor-pointer"
                >
                  <span className="text-sm md:text-base">
                    Login with Facebook
                  </span>
                </FacebookLogin>
              </div>
            </div>
          </div>

          <p className="pt-5 text-sm">
            Don't have an account?{" "}
            <Link className="text-Red underline" to={"/signup"}>
              SignUp
            </Link>
          </p>
        </form>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Login;
