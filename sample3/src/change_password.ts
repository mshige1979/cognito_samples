// ======================================================
// ChangePasswordCommandの実験サンプル
// パスワードの変更を行う。
// パラメータにアクセストークンが必要なため認証処理を先に行い、パスワードの変更を行う１
// ======================================================
// コマンドライン引数チェック
if (process.argv.length < 5) {
  console.log(
    "パラメータ不足: cognitoのパスワード、新しいパスワード、アクセストークンが必要です。"
  );
  console.log(
    "> npx tsx src/change_password.ts P@ssword999 newP@ssword999 xxxxxxxxx...."
  );
  process.exit(1);
}

// cognito用インポート
import {
  ChangePasswordCommand,
  ChangePasswordCommandInput,
  ChangePasswordCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";

import { cognitoClient } from "./common";

// パラメータ取得
const password1 = process.argv[2];
const password2 = process.argv[3];
const token = process.argv[4];

// ======================
// パスワード変更処理
// ======================
// 認証パラメータ設定
const params: ChangePasswordCommandInput = {
  PreviousPassword: password1,
  ProposedPassword: password2,
  AccessToken: token,
};

// コマンド送信
const command = new ChangePasswordCommand(params);
const response: ChangePasswordCommandOutput = await cognitoClient.send(command);
console.log(`response: `, response);
