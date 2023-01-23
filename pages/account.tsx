import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Button, Layout } from "../components";
import { Asset } from "../components/Assets";
import { Transfer } from "../components/Transfer";
import { Text } from "@nextui-org/react";
import { QRCode } from "../components/QRCode";
const Account: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [qrCodeVisible, setQrCodeVisible] = useState<boolean>(false);
  const [reload, setReload] = useState(true);
  const handler = () => setVisible(true);
  const openQrCode = () => {
    setQrCodeVisible(true);
  };
  const closeHandler = () => {
    setVisible(false);
  };
  const closeQrCode = () => {
    setQrCodeVisible(false);
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
        wallet={walletKey ? walletKey : ""}
        openQr={openQrCode}
      />
      <Transfer
        visible={visible}
        closeHandler={closeHandler}
        setReload={setReload}
      />
      <QRCode
        visible={qrCodeVisible}
        closeHandler={closeQrCode}
        email={email || ""}
      />
    </Layout>
  );
};

export default Account;
