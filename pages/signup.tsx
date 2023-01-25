import { useState } from "react";
import type { NextPage } from "next";
import { signupAPI, createWalletAPI, retrieveWallet } from "../utils/apis/api";
import { Layout } from "../components";
import { Button, Card, Input, Link } from "@nextui-org/react";
import Router from "next/router";
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signupAPI({
      username: signupDetails.username,
      email: signupDetails.email,
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      password: signupDetails.password,
    });
    await createWalletCall();
  };
  const createWalletCall = async () => {
    // calling backend to create wallet
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      const res = await createWalletAPI(user_id);
      const res1 = await retrieveWallet(user_id);
      Router.push("/account");
    }
  };
  return (
    <Layout>
      <div className="md:w-[400px] w-[350px] mx-auto">
        <Card
          css={{
            marginTop: "4rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Body>
            <form
              className="px-4 py-4"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="username"
                placeholder="Username"
                value={signupDetails.username}
                onChange={handleChange}
              />
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="email"
                placeholder="Email"
                value={signupDetails.email}
                onChange={handleChange}
              />
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="firstName"
                placeholder="First Name"
                value={signupDetails.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="lastName"
                placeholder="Last Name"
                value={signupDetails.lastName}
                onChange={handleChange}
              />
              <Input
                type="password"
                className="mb-4"
                fullWidth
                name="password"
                placeholder="Password"
                value={signupDetails.password}
                onChange={handleChange}
              />
              <Input
                type="password"
                className="mb-4"
                fullWidth
                name="confirmPass"
                placeholder="Confirm Password"
                value={signupDetails.confirmPass}
                onChange={handleChange}
              />

              <Button type="submit" css={{ width: "100%" }}>
                Create Account
              </Button>
            </form>
          </Card.Body>
          <Card.Footer>
            <div className="flex flex-row mx-auto">
              <div>Already a user? &nbsp;</div>
              <Link color="primary" target="_blank" href="/login">
                Login here!
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
