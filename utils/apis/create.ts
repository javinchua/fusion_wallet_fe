import axios from "axios";
import { BACKEND_ROOT_URL } from "../constants/apiEndpoints";

export interface SignUp {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
const signupAPI = async (data: SignUp) => {
  try {
    const res = await axios.post(BACKEND_ROOT_URL + "/users/create", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createWalletAPI = async (user_id: string) => {
  try {
    const res = await axios.post(
      BACKEND_ROOT_URL + "/wallets/create/" + user_id
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//return public key
const getWalletAPI = async (user_id: string) => {
  try {
    const res = await axios.get(
      BACKEND_ROOT_URL + "/wallets/retrieve/" + user_id
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const retrieveCryptoPricesAPI = async () => {
  try {
    const res = await axios.post(
      BACKEND_ROOT_URL + "/transactions/cryptoPrices/"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getTransLogsAPI = async (user_id: string) => {
  try {
    const res = await axios.get(BACKEND_ROOT_URL + "/transLogs/" + user_id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getBalanceAPI = async (user_id: string) => {
  try {
    const res = await axios.get(BACKEND_ROOT_URL + "/balance/" + user_id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export {
  signupAPI,
  createWalletAPI,
  getWalletAPI,
  retrieveCryptoPricesAPI,
  getTransLogsAPI,
  getBalanceAPI,
};
