// ======================================================
// InitiateAuthCommandの実験サンプル
// パスワードの変更を行う。
// パラメータにアクセストークンが必要なため認証処理を先に行い、パスワードの変更を行う１
// ======================================================
// コマンドライン引数チェック
if (process.argv.length < 4) {
  console.log("パラメータ不足: cognitoのEメール、パスワードが必要です。");
  console.log("> npx tsx src/initiate_auth.ts hoge@example.com P@ssword999");
  process.exit(1);
}

// cognito用インポート
import {
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
// 設定ファイル
import config from "./config.json";

import { cognitoClient } from "./common";

// パラメータ取得
const email = process.argv[2];
const password = process.argv[3];

// ======================
// 認証処理
// ======================
// 認証パラメータ設定
const authParams: InitiateAuthCommandInput = {
  ClientId: config.clientId,
  AuthFlow: "USER_PASSWORD_AUTH",
  AuthParameters: {
    USERNAME: email,
    PASSWORD: password,
  },
};

// コマンド送信
const command = new InitiateAuthCommand(authParams);
const authResponse: InitiateAuthCommandOutput = await cognitoClient.send(
  command
);
console.log(`response: `, authResponse);
