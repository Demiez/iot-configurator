import path from 'path';
import { readdirSync, unlinkSync, rmSync } from 'fs';

process.env.PATH +=
  path.delimiter + path.join(process.cwd(), 'node_modules', '.bin');

const PROTO_DIR = path.join(__dirname, '../proto');
const GOOGLE_IMPORTS_DIR = path.join(__dirname, '../proto/google');

rmSync(GOOGLE_IMPORTS_DIR, { recursive: true, force: true });

readdirSync(PROTO_DIR).forEach((fileName) => {
  if (path.extname(fileName) !== '.proto') {
    const filePath = path.join(PROTO_DIR, fileName);

    unlinkSync(filePath);
  }
});
