import { QRCodeCanvas } from 'qrcode.react';

function QRCode({ text }) {
  if (!text) return null;

  return (
    <QRCodeCanvas
      value={text}
      size={300}
      bgColor="#ffffff"
      fgColor="#000000"
      level="M"
      includeMargin={true}
    />
  );
}

export default QRCode;
