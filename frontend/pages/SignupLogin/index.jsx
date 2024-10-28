import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { message } from "antd";
import { useRouter } from "next/router";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Axios from "axios";

const SignupLogin = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for password validation
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    digitOrSpecial: false,
  });

  // State to track password input focus
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });

    // Validate password requirements
    if (name === "password") {
      setPasswordValidations({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        numbers: /[0-9]/.test(value),
        digitOrSpecial: /[\d~!@#$%^&*_\-+=\\|(){}[\]:";'<>?,./]/.test(value),
      });
    }
  };

  const onFinish = async () => {
    try {
      if (isSignUp) {
        // Sign Up logic
        const response = await Axios.post("http://localhost:5000/api/signup", {
          firstName: inputValues.firstName,
          lastName: inputValues.lastName,
          email: inputValues.email,
          password: inputValues.password,
        });

        message.success(response.data.msg);
        setIsSignUp(false);
      } else {
        // Login using your backend
        const response = await Axios.post("http://localhost:5000/api/login", {
          email: inputValues.email,
          password: inputValues.password,
        });

        message.success(response.data.msg);
        router.push("/Dashboard"); // Redirect to the dashboard or another page
      }
    } catch (error) {
      message.error(error.response?.data.msg || error.message);
    }
  };

  const validateConfirmPassword = (_, value) => {
    if (value && value !== inputValues.password) {
      return Promise.reject(new Error("Passwords doesn't match"));
    }
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative">
      {/* Logo and Title */}
      <div className="absolute top-4 left-4 flex flex-col items-start text-tahiti">
        <div className="flex items-center pl-7">
          <Image
            src="/dailyroastLOGO.png"
            alt="logo"
            width={90}
            height={90}
            priority
            className="hover:scale-125 duration-150"
            onClick={(e) => {
              e.preventDefault();
              router.push("/#home");
            }}
          />
          <h1 className="text-[20px] text-dark font-bold pl-2">Daily Roast</h1>
        </div>
      </div>

      {/* Left Image (Login) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: !isSignUp ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-[130px]"
      >
        <Image src="/Login.png" alt="Login" width={400} height={400} />
      </motion.div>

      {/* Centered Login/Signup Form */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-bold text-green-700 mb-4">
          {isSignUp ? "Create your Daily Roast Account Now!" : "Welcome Back!"}
        </h2>
        <Form
          name="authForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {isSignUp && (
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input
                name="firstName"
                value={inputValues.firstName}
                onChange={handleChange}
                placeholder="First Name"
                style={{
                  border: "1px solid",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                }}
                aria-label="First Name"
              />
            </Form.Item>
          )}

          {isSignUp && (
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input
                name="lastName"
                value={inputValues.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                style={{
                  border: "1px solid",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                }}
                aria-label="Last Name"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              placeholder="Email Address"
              style={{
                border: "1px solid",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                padding: "12px",
              }}
              aria-label="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              name="password"
              value={inputValues.password}
              onChange={handleChange}
              placeholder="Password"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                border: "1px solid",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                padding: "12px",
              }}
              aria-label="Password"
            />
          </Form.Item>

          {/* Conditionally render password requirements */}
          {isSignUp && passwordFocused && (
            <div className="text-sm mb-4">
              <p>
                <span
                  className={`${
                    passwordValidations.length ? "text-green" : "text-red"
                  }`}
                >
                  {passwordValidations.length ? (
                    <CheckOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  )}
                </span>
                &nbsp;At least 8 characters
              </p>
              <p>
                <span
                  className={`${
                    passwordValidations.uppercase ? "text-green" : "text-red"
                  }`}
                >
                  {passwordValidations.uppercase ? (
                    <CheckOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  )}
                </span>
                &nbsp;At least one uppercase letter
              </p>
              <p>
                <span
                  className={`${
                    passwordValidations.lowercase ? "text-green" : "text-red"
                  }`}
                >
                  {passwordValidations.lowercase ? (
                    <CheckOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  )}
                </span>
                &nbsp;At least one lowercase letter
              </p>
              <p>
                <span
                  className={`${
                    passwordValidations.numbers ? "text-green" : "text-red"
                  }`}
                >
                  {passwordValidations.numbers ? (
                    <CheckOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  )}
                </span>
                &nbsp;At least one digit
              </p>
              <p>
                <span
                  className={`${
                    passwordValidations.digitOrSpecial
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  {passwordValidations.digitOrSpecial ? (
                    <CheckOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  )}
                </span>
                &nbsp;At least one digit or special character
              </p>
            </div>
          )}

          {isSignUp && (
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your Password!" },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password
                name="confirmPassword"
                value={inputValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                style={{
                  border: "1px solid",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                }}
                aria-label="Confirm Password"
              />
            </Form.Item>
          )}

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="w-[100px] text-tahiti hover:scale-110 bg-addtocartcolor transition duration-300 ease-in-out rounded-lg py-2"
              style={{ borderRadius: "8px" }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm">
            {isSignUp ? "Already one of us?" : "Be one of us now!"}{" "}
            <Button
              type="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className=" font-bold hover:text-mlue duration-200 pl-2 hover:scale-125"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </p>
        </div>
      </motion.div>

      {/* Right Image (Signup) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSignUp ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute right-[90px]"
      >
        <Image src="/Signup.png" alt="Signup" width={400} height={400} />
      </motion.div>
    </div>
  );
};

export default SignupLogin;
