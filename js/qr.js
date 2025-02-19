// https://stackoverflow.com/questions/67403923/how-do-i-generate-qr-code-from-url-in-javascript
const qrCode = new QRCode(document.getElementById('qrcode'), {
    text: window.location.href,
    width: 128,
    height: 128,
    colorDark : '#0f2643',
    colorLight : '#fff',
    // L M Q H
    correctLevel : QRCode.CorrectLevel.L
});

export { qrCode }