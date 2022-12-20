import path from 'path';
import shell from 'shelljs';
import { existsSync, mkdirSync } from 'fs';

process.env.PATH +=
  path.delimiter + path.join(process.cwd(), 'node_modules', '.bin');

const PROTO_DIR = path.join(__dirname, '../../../proto');
const PROTO_OUT_DIR = path.join(__dirname, '../src/proto');
const PROTOC_PATH = path.join(
  __dirname,
  '../node_modules/grpc-tools/bin/protoc'
);
const PLUGIN_PATH = path.join(
  __dirname,
  '../node_modules/.bin/protoc-gen-ts_proto'
);

if (!existsSync(PROTO_OUT_DIR)) {
  mkdirSync(PROTO_OUT_DIR);
}

const protoConfig = [
  `--plugin=${PLUGIN_PATH}`,

  // https://github.com/stephenh/ts-proto/blob/main/README.markdown
  '--ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=messages,exportCommonSymbols=false,esModuleInterop=true',

  `--ts_proto_out=${PROTO_OUT_DIR}`,
  `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`,
];
// https://github.com/stephenh/ts-proto#usage
shell.exec(`${PROTOC_PATH} ${protoConfig.join(' ')}`, (code, stdout, stderr) =>
  console.log('Proto build result:', code, stdout, stderr)
);
