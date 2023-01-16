import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Button, Layout } from "../components";
import { Asset } from "../components/Assets";
import { Transfer } from "../components/Transfer";
const Account: NextPage = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [wallet, setWallet] = useState();

  // const fetchEthPrice = async () => {
  //   const res = await axios.get(
  //     COIN_GECKO_URL + "/simple/price?ids=ethereum&vs_currencies=usd"
  //   );
  //   const price = res.data.ethereum.usd;
  //   setEthPrice(price);
  // };
  // useEffect(() => {
  //   fetchEthPrice();
  // }, []);

  return (
    <Layout wallet_id={wallet}>
      <Asset handler={handler} />
      <Transfer visible={visible} closeHandler={closeHandler} />
    </Layout>
  );
};

export default Account;
