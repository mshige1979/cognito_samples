// ======================================================
// AdminResetUserPasswordCommandの実験サンプル
// パスワードのリセット処理を行い、復旧用のコードをメールまたはSMSで送信します。
//
// ======================================================
// コマンドライン引数チェック
// 0: node
if (process.argv.length < 3) {
  console.log("パラメータ不足: cognitoのユーザー名が必要です。");
  console.log(
    "> npx tsx src/admin_password_reset.ts xxxxxxxx-cccc-bbbb-aaaa-zzzzzzzzzzz"
  );
  process.exit(1);
}

// cognito用インポート
import {
  AdminResetUserPasswordCommand,
  AdminResetUserPasswordCommandInput,
  AdminResetUserPasswordCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
// 設定ファイル
import config from "./config.json";

import { cognitoClient, getUser } from "./common";

// ユーザー名
const userName = process.argv[2];

// 存在チェック
try {
  await getUser(userName);
} catch (error) {
  console.error("Error getUser: ", error);
  process.exit(1);
}

// パラメータ設定
const params: AdminResetUserPasswordCommandInput = {
  UserPoolId: config.userPoolId,
  Username: userName,
};

// コマンド送信
const command = new AdminResetUserPasswordCommand(params);
const response: AdminResetUserPasswordCommandOutput = await cognitoClient.send(
  command
);
console.log(`response: `, response);

// ユーザー情報取得
const userInfo = await getUser(userName);
console.log(`userInfo: `, userInfo);
