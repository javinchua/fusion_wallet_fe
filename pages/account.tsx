import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Button, Layout } from "../components";
import { Asset } from "../components/Assets";
import { Transfer } from "../components/Transfer";
import { Text } from "@nextui-org/react";
const Account: NextPage = () => {
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(true);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [email, setEmail] = useState<string>();
  const [walletKey, setWalletKey] = useState<string>();
  useEffect(() => {
    const check = localStorage.getItem("email");
    const check1 = localStorage.getItem("wallet_key");
    if (check && check1) {
      setEmail(check);
      setWalletKey(JSON.parse(check1).publicKey);
    }
  }, []);
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
    <Layout email={email}>
      <div className="mt-8 text-center">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
          }}
          weight="bold"
        >
          All-in-one Bank Account
        </Text>
        <Text b>Unleash the power of crypto and fiat.</Text>
      </div>
      <Asset
        handler={handler}
        reload={reload}
        setReload={setReload}
        wallet={walletKey}
      />
      <Transfer
        visible={visible}
        closeHandler={closeHandler}
        setReload={setReload}
      />
    </Layout>
  );
};

export default Account;
