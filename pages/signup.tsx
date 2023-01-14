import { useState } from "react";
import type { NextPage } from "next";
import { signupAPI } from "../utils/apis/create";

export interface SignUp {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPass: string;
}
const Signup: NextPage = () => {
  const [signupDetails, setSignupDetails] = useState<SignUp>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    signupAPI({
      username: signupDetails.username,
      email: signupDetails.email,
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      password: signupDetails.password,
    });
  };
  return (
    <div className="flex flex-col min-h-screen bg-grey-lighter">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <form
            className=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="username"
              placeholder="Username"
              value={signupDetails.username}
              onChange={handleChange}
            />
            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="email"
              placeholder="Email"
              value={signupDetails.email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="firstName"
              placeholder="First Name"
              value={signupDetails.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="lastName"
              placeholder="Last Name"
              value={signupDetails.lastName}
              onChange={handleChange}
            />
            <input
              type="password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="password"
              placeholder="Password"
              value={signupDetails.password}
              onChange={handleChange}
            />
            <input
              type="password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="confirmPass"
              placeholder="Confirm Password"
              value={signupDetails.confirmPass}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-3 my-1 text-center text-white bg-green-600 rounded hover:bg-green-dark focus:outline-none"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="mt-6 text-grey-dark">
          Already have an account?
          <a
            className="ml-2 text-blue-400 no-underline border-b border-blue-400"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
