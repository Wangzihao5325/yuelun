import { NativeModules } from 'react-native';
/**扫码识别-component */
import QRCodeScanner from 'react-native-qrcode-scanner';
/**读图识别-func */
const QRImageReader = (fileUrl) => {
    let QRScanReader = NativeModules.QRScanReader;
    return QRScanReader.readerQR(fileUrl);
}

export { QRCodeScanner, QRImageReader }