import { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Button } from "../components";

const createWallet: NextPage = () => {
  const createWalletCall = () => {
    // calling backend to create wallet
  };
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid place-items-center">
        <Button loading={false}>Create Wallet</Button>
      </div>
    </div>
  );
};

export default createWallet;
