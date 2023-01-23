import { QrReader } from "react-qr-reader";
import adapter from "webrtc-adapter";

export const QRScanner = ({}) => {
  return (
    <QrReader
      onResult={(result, error) => {
        if (!!result) {
          alert(result?.text);
        }

        if (!!error) {
          alert(error);
        }
      }}
      //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
      // open the front camera
      constraints={{ facingMode: "environment" }}
      style={{ width: "40%", height: "40%" }}
    />
  );
};
