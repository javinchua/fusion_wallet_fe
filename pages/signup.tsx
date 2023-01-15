import { useState } from "react";
import type { NextPage } from "next";
import { signupAPI } from "../utils/apis/create";
import { Layout } from "../components";
import { Button, Card, Input } from "@nextui-org/react";

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
    <Layout>
      <Card
        css={{
          mw: "400px",
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
              type="text"
              className="mb-4"
              fullWidth
              name="password"
              placeholder="Password"
              value={signupDetails.password}
              onChange={handleChange}
            />
            <Input
              type="text"
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
      </Card>
    </Layout>
  );
};

export default Signup;
