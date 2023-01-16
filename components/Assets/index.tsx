import { Button, Card, Text, Table, User } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getBalanceAPI } from "../../utils/apis/api";
interface Props {
  handler: () => void;
}
export const Asset = ({ handler }: Props) => {
  const [balance, setBalance] = useState({
    total: 0,
    eth: 0,
    usd: 0,
  });
  useEffect(() => {
    const getBalances = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id) {
        const ethBal = await getBalanceAPI(user_id, "eth");
        const usdBal = await getBalanceAPI(user_id, "cash");
        const totalBal = await getBalanceAPI(user_id, "all");
        setBalance({
          total: totalBal,
          eth: ethBal,
          usd: usdBal,
        });
      }
    };
    getBalances();
  }, []);
  return (
    <div>
      <Card
        css={{
          mw: "60%",
          marginTop: "4rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card.Header>
          <div className="flex justify-between w-full">
            <div className="flex flex-col text-xl">
              <Text b>Primary</Text>
              <Text b>$ {balance.total} USD</Text>
            </div>
            <div>
              <Button size="sm" onClick={handler}>
                Trade
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <div className="flex flex-col">
            <div className="flex flex-row my-2 font-light">
              <div className="mx-2 font-bold underline underline-offset-8 decoration-teal-400">
                Balances
              </div>
              <div className="mx-2">Grow Balances</div>
              <div className="mx-2">Transaction History</div>
              <div className="mx-2">Transfer History</div>
            </div>
            <Table
              aria-label="Example table with static content"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <Table.Header>
                <Table.Column>Currency</Table.Column>
                <Table.Column>Notional Balance</Table.Column>
                <Table.Column>Quantity</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>
                    <User
                      squared
                      src={`/images/usd.png`}
                      name={"USD"}
                      css={{ p: 0 }}
                    ></User>
                  </Table.Cell>
                  <Table.Cell>$0.01 USD</Table.Cell>
                  <Table.Cell>---</Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                  <Table.Cell>
                    <User
                      squared
                      src={`/images/eth.png`}
                      name={"ETH"}
                      css={{ p: 0 }}
                    ></User>
                  </Table.Cell>
                  <Table.Cell>$9089 USD</Table.Cell>
                  <Table.Cell>0.849 ETH</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
