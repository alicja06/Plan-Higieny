const fs = require('fs');
const Font = require('fonteditor-core').Font;

const buffer = fs.readFileSync(
  './src/assets/fonts/Montserrat-Regular.ttf'
);

const font = Font.create(buffer, {
  type: 'ttf',
  hinting: false,
});

const ttf = font.write({
  type: 'ttf',
});

const base64 = Buffer.from(ttf).toString('base64');

const jsContent = `
const MontserratRegular = "${base64}";
export default MontserratRegular;
`;

fs.writeFileSync(
  './src/assets/fonts/Montserrat-Regular.js',
  jsContent
);

console.log('Font converted successfully');