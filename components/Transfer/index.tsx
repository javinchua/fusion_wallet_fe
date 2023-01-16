import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useState } from "react";
import { CurrencyInput } from "../CurrencyInput";
import { transferAPI } from "../../utils/apis/api";
interface Props {
  visible: boolean;
  closeHandler: () => void;
}
export const Transfer = ({ visible, closeHandler }: Props) => {
  const [step, setStep] = useState<number>(0);
  const [targetUser, setTargetUser] = useState();
  const [depositAmount, setDepositAmount] = useState(0);
  const handleTransfer = async () => {
    const user = localStorage.getItem("user_id");
    if (user && targetUser) {
      await transferAPI(user, targetUser, depositAmount);
      closeHandler();
    }
  };
  const handleUser = (e: any) => {
    e.preventDefault();
    setTargetUser(e.target.value);
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
              <Button auto onPress={() => setStep(1)}>
                Next
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Transfer to Recipient
              </Text>
            </Modal.Header>
            <Modal.Body>
              <CurrencyInput
                transfer={true}
                width={"500px"}
                label="Transfer Amount"
                type="crypto"
                amount={depositAmount}
                setAmount={setDepositAmount}
                balance={0}
              />
              <Button
                className="my-3"
                auto
                onPress={() => {
                  handleTransfer;
                }}
              >
                Transfer
              </Button>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};
