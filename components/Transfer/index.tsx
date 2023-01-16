import { Modal, Button, Text, Input, Grid } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { CurrencyInput } from "../CurrencyInput";
import {
  transferAPI,
  ethPriceAPI,
  getUserFromEmailAPI,
} from "../../utils/apis/api";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  visible: boolean;
  closeHandler: () => void;
}
export const Transfer = ({ visible, closeHandler }: Props) => {
  const [step, setStep] = useState<number>(0);
  const [targetUser, setTargetUser] = useState();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number>(0);
  const [targetUserName, setTargetUserName] = useState("");
  useEffect(() => {
    const getBalances = async () => {
      const ethPrice = await ethPriceAPI("ethereum");
      setEthPrice(ethPrice);
    };
    getBalances();
  }, []);
  useEffect(() => {
    setOutputAmount(ethPrice * depositAmount);
  }, [depositAmount]);
  useEffect(() => {
    setDepositAmount(outputAmount / ethPrice);
  }, [outputAmount]);
  const handleTransfer = async () => {
    const user = localStorage.getItem("user_id");
    console.log(user);
    if (user && targetUser) {
      await transferAPI(user, targetUser, depositAmount);
      closeHandler();
    }
  };
  const handleUser = (e: any) => {
    e.preventDefault();
    setTargetUser(e.target.value);
  };
  const handleNext = async () => {
    if (targetUser) {
      const res = await getUserFromEmailAPI(targetUser);
      setTargetUser(res.id);
      setTargetUserName(res.firstName + " " + res.lastName);
      setStep(1);
    }
  };
  return (
    <div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="600px"
      >
        {step == 0 ? (
          <>
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Enter{" "}
                <Text b size={18}>
                  Recipient Details
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Panda Bank User"
                value={targetUser}
                onChange={handleUser}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto onPress={handleNext}>
                Next
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Transfer to Recipient:
              </Text>
              <div className="text-lg text-blue-600">{targetUserName}</div>
            </Modal.Header>
            <Modal.Body>
              <Grid.Container gap={2} justify="center">
                <Grid xs={12} justify="center">
                  <CurrencyInput
                    transfer={true}
                    width={"400px"}
                    label="Transfer Amount"
                    type="crypto"
                    amount={depositAmount}
                    setAmount={setDepositAmount}
                    balance={0}
                  />
                </Grid>
                <Grid xs={2} justify="center" alignItems="flex-end">
                  <ArrowDownwardIcon fontSize="large" />
                </Grid>
                <Grid xs={12} justify="center">
                  <CurrencyInput
                    output={true}
                    label="Recipient Receives"
                    type="fiat"
                    width={"400px"}
                    amount={outputAmount}
                    setAmount={setOutputAmount}
                    balance={0}
                  />
                </Grid>
                <Grid justify="center">
                  <Button
                    className="my-3"
                    auto
                    onPress={() => handleTransfer()}
                  >
                    Transfer
                  </Button>
                </Grid>
              </Grid.Container>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};
