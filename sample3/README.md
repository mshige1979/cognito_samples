# Cognito

## AdminResetUserPasswordCommand

パスワードのリセットし、復旧用のコードをメールまたは SMS で通知する
復旧には`ConfirmForgotPasswordCommand`で確認コードとパスワードを設定する必要あり

```
npx tsx src/admin_password_reset.ts xxxxxxxx-cccc-bbbb-aaaa-zzzzzzzzzzz
```

## ChangePasswordCommand

ログインユーザーのパスワードを変更する
パラメータは現在のパスワード、新しいパスワード、アクセストークンが必要

```
npx tsx src/change_password.ts P@ssword999 newP@ssword999 xxxxxxxxx....
```

## InitiateAuthCommand

ユーザーとパスワードでログインを行う
管理側のログイン機能としては`AdminInitiateAuthCommand`が存在する。

```
npx tsx src/initiate_auth.ts hoge@example.com P@ssword999
```

## ConfirmForgotPasswordCommand

パスワードリセットされたアカウントの復旧を行う

```
npx tsx src/confirm_forgot.ts xxxxxxxx-cccc-bbbb-aaaa-zzzzzzzzzzz 000000 P@ssword999
```
