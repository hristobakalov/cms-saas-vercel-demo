"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeElement: React.FC = () => {
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <QRCodeSVG
        value={url}
        size={256} // Adjust size as needed
        level="H" // Error correction level
      />
    </div>
  );
};

export default QRCodeElement;
