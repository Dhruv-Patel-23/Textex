import React, { useEffect, useState } from "react";
import styles from "./login.module.css"; // Import the CSS module
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import ParticlesBg from "particles-bg";
import { Spinner } from "@chakra-ui/react";
const Login = () => {
  const API_URL =
    "https://textex-server.onrender.com"; /* "http://localhost:8000"*/

  const { setUser } = ChatState();

  const [isSignUp, setIsSignUp] = useState(false);
  const [buttonColor, setButtonColor] = useState("#b4418e");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // For Login
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  // For Registration
  const [userSignOut, setUserSignOut] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setUserSignOut({
        ...userSignOut,
        [name]: value,
      });
    } else {
      setUserSignIn({
        ...userSignIn,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const handleSignUpClick = () => {
      setIsSignUp(true);
      setButtonColor("#FF4B2B");
    };

    const handleSignInClick = () => {
      setIsSignUp(false);
      setButtonColor("#b4418e");
    };

    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener("click", handleSignUpClick);
      signInButton.addEventListener("click", handleSignInClick);
    }

    return () => {
      if (signUpButton && signInButton && container) {
        signUpButton.removeEventListener("click", handleSignUpClick);
        signInButton.removeEventListener("click", handleSignInClick);
      }
    };
  }, []);

  const register = async (e) => {
    e.preventDefault();
    const { name, email, password } = userSignOut;
    if (name && email && password) {
      // axios
      //   .post(`${API_URL}/register`, userSignOut)
      //   .then((response) => {
      //     localStorage.setItem("userInfo", JSON.stringify(response.data));
      //   })
      //   .then((data) => setUser(data))
      //   .then(setLoading(false))
      //   .then(navigate("/chats"));
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/register`, userSignOut);
        //alert(response.data.name);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        // console.log(response);
        setLoading(false);
        setUser(response.data);
        navigate("/chats");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("invalid input");
    }
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/login`, userSignIn);
      //alert(response.data.name);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      // console.log(response);
      setLoading(false);
      setUser(response.data);
      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100%"
      w="100%"
    >
      <ParticlesBg type="fountain" bg={true} />
      <div
        className={`${styles.container} ${
          isSignUp ? styles["right-panel-active"] : ""
        }`}
        id="container"
      >
        <div
          className={
            styles["form-container"] + " " + styles["sign-in-container"]
          }
        >
          <form>
            <h1>Sign in</h1>
            {/* <div className={styles["social-container"]}>
              <a href="#" className={styles.social}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.social}>
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className={styles.social}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            {/* <span>or use your account</span> */}
            <input
              type="email"
              name="email"
              value={userSignIn.email}
              placeholder="Email"
              onChange={handlechange}
            />
            <input
              type="password"
              name="password"
              value={userSignIn.password}
              placeholder="Password"
              onChange={handlechange}
            />

            <Button
              color="white"
              size="md"
              onClick={login}
              bg={buttonColor}
              m={"4"}
              _hover={{
                color: "purple", // Change the text color on hover
                backgroundColor: "white", // Change the background color on hover
                // Add other styles here if needed
              }}
            >
              Signin
            </Button>
            {loading ? (
              <Spinner
                color="black"
                size="large"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <></>
            )}
          </form>
        </div>

        <div
          className={
            styles["form-container"] + " " + styles["sign-up-container"]
          }
        >
          <form method="POST">
            <h1>Create Account</h1>
            {/* <div className={styles["social-container"]}>
               <a href="#" className={styles.social}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.social}>
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className={styles.social}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            {/* <span>or use your email for registration</span> */}
            <input
              type="text"
              name="name"
              value={userSignOut.name}
              placeholder="Name"
              onChange={handlechange}
            />
            <input
              type="email"
              name="email"
              value={userSignOut.email}
              placeholder="Email"
              onChange={handlechange}
            />
            <input
              type="password"
              name="password"
              value={userSignOut.password}
              placeholder="Password"
              onChange={handlechange}
            />
            <Button
              color="white"
              size="md"
              onClick={register}
              bg={buttonColor}
              m={"4"}
              _hover={{
                color: "red", // Change the text color on hover
                backgroundColor: "white", // Change the background color on hover
                // Add other styles here if needed
              }}
            >
              Sign Up
            </Button>
            {loading ? (
              <Spinner
                color="black"
                size="large"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <></>
            )}
          </form>
        </div>
        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}
            >
              <h1>Welcome Back to Textex!</h1>
              <p>
                To keep connected with us, please login with your personal info
              </p>

              <Button variant="ghost" color="white" id="signIn" _hover={{}}>
                Sign In
              </Button>
            </div>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <h1>New to Textex?</h1>
              <p>Enter your personal details and start a journey with us</p>
              <Button variant="ghost" color="white" id="signUp" _hover={{}}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;
