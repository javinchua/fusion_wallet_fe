import { Dropdown } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@nextui-org/react";

interface CurrencyInputProps {
  label: string;
  type: "fiat" | "crypto";
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  balance: number;
}

const currencyList = { fiat: ["SGD", "RIEL"], crypto: ["ETH", "USDC"] };

export const CurrencyInput = (props: CurrencyInputProps) => {
  const list = currencyList[props.type];
  const [currency, setCurrency] = useState(new Set([list[0]]));
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
      type="number"
      contentRight={<CurrencyDropdown />}
      label={props.label}
      value={props.amount !== 0 ? props.amount : ""}
      onChange={(e) => props.setAmount(parseFloat(e.target.value))}
      helperText={`Balance: ${props.balance}`}
    />
  );
};
