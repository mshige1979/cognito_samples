import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  AdminInitiateAuthCommandOutput,
  SignUpCommand,
  SignUpCommandInput,
  SignUpCommandOutput,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

import config from "./config.json";

// リージョンなどの設定
// 管理コマンドを利用する場合は状況に応じて認証情報を設定（今回はローカル環境のため、、、）
export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
  credentials: config.credentials,
});

// ============================================================================
// ログイン処理
// ============================================================================
export const signIn = async (username: string, password: string) => {
  // ログインパラメータ設定
  const params: AdminInitiateAuthCommandInput = {
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    UserPoolId: config.userPoolId,
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  // ログイン処理実施
  try {
    const command = new AdminInitiateAuthCommand(params);
    const response: AdminInitiateAuthCommandOutput = await cognitoClient.send(
      command
    );
    console.log(`response: `, response);
    console.log(`ChallengeName: `, response.ChallengeName);
    console.log(`ChallengeParameters: `, response.ChallengeParameters);

    if (response.ChallengeName === undefined) {
      const { AuthenticationResult } = response;
      console.log(`AuthenticationResult: `, AuthenticationResult);
      if (AuthenticationResult) {
        sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
        sessionStorage.setItem(
          "accessToken",
          AuthenticationResult.AccessToken || ""
        );
        sessionStorage.setItem(
          "refreshToken",
          AuthenticationResult.RefreshToken || ""
        );
        return AuthenticationResult;
      }
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// ============================================================================
// ユーザー登録処理
// ============================================================================
export const signUp = async (email: string, password: string) => {
  // 登録パラメータ設定
  const params: SignUpCommandInput = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  console.log(params);

  // ユーザー登録処理実施
  try {
    // 登録することで確認用コードがメールへ通知される
    const command = new SignUpCommand(params);
    const response: SignUpCommandOutput = await cognitoClient.send(command);
    console.log(`response: `, response);
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  const params = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};
