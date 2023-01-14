import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Button } from "../components";
import { getBalanceAPI } from "../utils/apis/create";
import { MenuDropdown } from "../components";
import RecipientDetails from "../components/recipientDetails";
import { COIN_GECKO_URL } from "../utils/constants/apiEndpoints";
import Image from "next/image";
const Transfer: NextPage = () => {
  const [eth, setEth] = useState<number>(0);
  //   useEffect(() => {
  //     // import the Web3 library
  //     const Web3 = require("web3");

  //     // URL of the blockchain network
  //     var url = "your-infura-URL"; // replace with your Infura URL (mainnet, test nets, select one from your infura.io dashboard)

  //     // create the connection
  //     var web3 = new Web3(url);

  //     // simple function that prints to the console the ETH balance, uses web3.utils to convert from WEI to ETH
  //     async function getEthBalance(address: string) {
  //       await web3.eth.getBalance(address, (err: any, balance: any) => {
  //         setEth(web3.utils.fromWei(balance));
  //       });
  //     }
  //     const getBalance = async (user_id: string) => {
  //       const bal = await getBalanceAPI(user_id);
  //       setFiat(bal);
  //     };
  //     getEthBalance("");
  //     getBalance("");
  //   }, []);

  const [fiat, setFiat] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const handleChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const [targetUser, setTargetUser] = useState();
  const [step, setStep] = useState<number>(0);
  const [label, setLabel] = useState("Method of Transfer");
  const [ethPrice, setEthPrice] = useState<number>(0);
  const fetchEthPrice = async () => {
    const res = await axios.get(
      COIN_GECKO_URL + "/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const price = res.data.ethereum.usd;
    setEthPrice(price);
  };
  useEffect(() => {
    fetchEthPrice();
  }, []);
  return (
    <>
      {step == 0 ? (
        <RecipientDetails
          targetUser={targetUser}
          setTargetUser={setTargetUser}
          setStep={setStep}
        />
      ) : (
        <div className="">
          <MenuDropdown
            label={label}
            options={[
              {
                label: "ETH",
                onClick: () => {
                  setLabel("ETH");
                },
              },
              {
                label: "FIAT",
                onClick: () => {
                  setLabel("FIAT");
                },
              },
            ]}
          />
          <div className="grid place-items-center">
            {label == "ETH" ? (
              <div className="flex flex-col">
                <div className="font-bold ">Balance: {eth} ETH</div>
                <div>${eth * ethPrice}</div>
              </div>
            ) : label == "FIAT" ? (
              <div>Balance: {fiat}</div>
            ) : null}
            <div className="flex flex-row">
              {label == "ETH" ? (
                <div className="mr-3">
                  <Image
                    src={`/images/download (1).png`}
                    alt={"eth"}
                    height={100}
                    width={64}
                  />
                </div>
              ) : null}

              <input
                type="number"
                className="block w-full p-3 mb-4 mr-3 border rounded border-grey-light"
                name="value"
                placeholder="Amount to Transfer"
                value={value}
                onChange={handleChange}
              />
              <Button loading={false}>Transfer</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transfer;
