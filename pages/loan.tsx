import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Button, Card, Grid, Text } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import { CurrencyInput } from "../components/CurrencyInput";
import { getBalanceAPI } from "../utils/apis/api";

const Loan: NextPage = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    const getEthBalance = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id) {
        const bal = await getBalanceAPI(user_id, "eth");
        setEthBalance(bal);
      }
    };
    getEthBalance();
  }, []);

  useEffect(() => {
    setCollateralAmount(depositAmount / 1000);
  }, [depositAmount]);

  useEffect(() => {
    setDepositAmount(collateralAmount * 1000);
  }, [collateralAmount]);

  return (
    <Layout>
      <div className="mt-8 text-center">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Borrow On Your Crypto
        </Text>
        <Text b>Put your crypto to work. Why sell when you can hodl?</Text>
      </div>
      <Card
        css={{
          mw: "60%",
          marginTop: "4rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card.Body>
          <Grid.Container gap={2} justify="center">
            <Grid xs={5} justify="center">
              <CurrencyInput
                label="Credit Amount"
                type="fiat"
                amount={depositAmount}
                setAmount={setDepositAmount}
                balance={0}
              />
            </Grid>
            <Grid xs={2} justify="center" alignItems="flex-end">
              <SwapHorizIcon fontSize="large" />
            </Grid>
            <Grid xs={5} justify="center">
              <CurrencyInput
                label="Collateral Required"
                type="crypto"
                amount={collateralAmount}
                setAmount={setCollateralAmount}
                balance={ethBalance}
              />
            </Grid>
            <Grid justify="center">
              <Button color="success">Borrow Now</Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Loan;
