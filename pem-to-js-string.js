// pem-to-js-string.js
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node pem-to-js-string.js <path/to/private.pem>');
  process.exit(1);
}

const pemPath = process.argv[2];
const pem = fs.readFileSync(pemPath, 'utf8');

// extract the base64 body between the header/footer
const m = pem.match(/-----BEGIN PRIVATE KEY-----(?:\r?\n)+([\s\S]*?)(?:\r?\n)+-----END PRIVATE KEY-----/);
if (!m) {
  console.error('Could not find "BEGIN PRIVATE KEY" / "END PRIVATE KEY" in the file.');
  process.exit(2);
}

const body = m[1].replace(/\s+/g, ''); // remove any whitespace/newlines
const chunkSize = 64;
const chunks = [];
for (let i = 0; i < body.length; i += chunkSize) {
  chunks.push(body.slice(i, i + chunkSize));
}

// build the JS string lines
const out = [];
out.push('"-----BEGIN PRIVATE KEY-----\\n" +');
for (let i = 0; i < chunks.length; i++) {
  // include a newline at the end of each chunk so the final string resembles standard PEM
  const suffix = '\\n' + (i === chunks.length - 1 ? '' : '" +');
  out.push(`"${chunks[i]}\\n" ${i === chunks.length - 1 ? '+' : '+'}`);
}
out.push('"-----END PRIVATE KEY-----";');

// print a nicely formatted variant (fixing extra +)
let printed = '';
printed += '"-----BEGIN PRIVATE KEY-----\\n" +\n';
for (let i = 0; i < chunks.length; i++) {
  printed += ` "${chunks[i]}\\n" +\n`;
}
printed += ' "-----END PRIVATE KEY-----";\n';

console.log(printed);
