// ======================================================
// 共通ロジック
// ======================================================
// cognito用インポート
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminGetUserCommandInput,
  AdminGetUserCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";

// 設定ファイル
import config from "./config.json";

// リージョンなどの設定
// 管理コマンドを利用する場合は状況に応じて認証情報を設定（今回はローカル環境のため、、、）
export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
  credentials: config.credentials,
});

// ユーザー情報取得
export const getUser = async (userName: string) => {
  const params: AdminGetUserCommandInput = {
    UserPoolId: config.userPoolId,
    Username: userName,
  };
  const command = new AdminGetUserCommand(params);
  const response: AdminGetUserCommandOutput = await cognitoClient.send(command);
  return response;
};
