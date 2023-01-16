import { Dropdown } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { getBalanceAPI } from "../../utils/apis/api";
interface CurrencyInputProps {
  label: string;
  type: "fiat" | "crypto";
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  balance: number;
  width?: string;
  transfer?: boolean;
}

const currencyList = { fiat: ["SGD", "RIEL"], crypto: ["ETH", "USDC"] };

export const CurrencyInput = (props: CurrencyInputProps) => {
  const list = currencyList[props.type];
  const [currency, setCurrency] = useState(new Set([list[0]]));
  const [balance, setBalance] = useState({
    eth: 10,
    usd: 100,
  });
  // useEffect(() => {
  //   const getBalances = async () => {
  //     const user_id = localStorage.getItem("user_id");
  //     if (user_id) {
  //       const ethBal = await getBalanceAPI(user_id, "eth");
  //       const usdBal = await getBalanceAPI(user_id, "cash");
  //       setBalance({
  //         eth: ethBal,
  //         usd: usdBal,
  //       });
  //     }
  //   };
  //   getBalances();
  // }, []);
  const helperText = props.transfer
    ? currency.values().next().value == "ETH"
      ? balance.eth
      : currency.values().next().value == "USDC"
      ? balance.usd
      : 0
    : props.balance;

  const CurrencyDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Button flat>{currency}</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          defaultSelectedKeys={currency}
          selectedKeys={currency}
          onSelectionChange={setCurrency}
        >
          {list.map((currency) => {
            return <Dropdown.Item key={currency}>{currency}</Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  return (
    <Input
      width={props.width ? props.width : ""}
      type="number"
      contentRight={<CurrencyDropdown />}
      label={props.label}
      value={props.amount !== 0 ? props.amount : ""}
      onChange={(e) => props.setAmount(parseFloat(e.target.value))}
      helperText={`Balance: ${helperText}`}
    />
  );
};
