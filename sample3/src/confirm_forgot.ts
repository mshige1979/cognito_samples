// ======================================================
// ConfirmForgotPasswordCommandの実験サンプル
// パスワードリセットにより、送信された確認コードと新しいパスワードで復旧する
// ======================================================
// コマンドライン引数チェック
if (process.argv.length < 5) {
  console.log(
    "パラメータ不足: cognitoのユーザー名、確認コード、パスワードが必要です。"
  );
  console.log(
    "> npx tsx src/confirm_forgot.ts xxxxxxxx-cccc-bbbb-aaaa-zzzzzzzzzzz 000000 P@ssword999"
  );
  process.exit(1);
}

// cognito用インポート
import {
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ConfirmForgotPasswordCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
// 設定ファイル
import config from "./config.json";

import { cognitoClient, getUser } from "./common";

// パラメータ取得
const userName = process.argv[2];
const code = process.argv[3];
const password = process.argv[4];

// 存在チェック
try {
  await getUser(userName);
} catch (error) {
  console.error("Error getUser: ", error);
  process.exit(1);
}

// パラメータ設定
const params: ConfirmForgotPasswordCommandInput = {
  ClientId: config.clientId,
  Username: userName,
  ConfirmationCode: code,
  Password: password,
};

// コマンド送信
const command = new ConfirmForgotPasswordCommand(params);
const response: ConfirmForgotPasswordCommandOutput = await cognitoClient.send(
  command
);
console.log(`response: `, response);

// ユーザー情報取得
const userInfo = await getUser(userName);
console.log(`userInfo: `, userInfo);
