
import { useQRCode } from 'next-qrcode';

function QRCode(text) {
  const { Image } = useQRCode();

  return (
    <Image
      text={text}
      options={{
        type: 'image/jpeg',
        quality: 0.3,
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}

export default QRCode;