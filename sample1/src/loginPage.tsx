import { useState } from "react";
import { signIn } from "./authService";

// ログイン画面
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // 認証処理を行う
      const session = await signIn(email, password);
      console.log("Sign in successful", session);
      if (session && typeof session.AccessToken !== "undefined") {
        sessionStorage.setItem("accessToken", session.AccessToken);
        if (sessionStorage.getItem("accessToken")) {
          window.location.href = "/home";
        } else {
          console.error("Session token was not set properly.");
        }
      } else {
        // 認証失敗
        console.error("SignIn session or AccessToken is undefined.");
      }
    } catch (error) {
      // 認証失敗（例外）
      alert(`Sign in failed: ${error}`);
    }
  };

  return (
    <div className="loginForm">
      <h1>ログイン</h1>
      <h4>{"ログインするメールアドレスとパスワードを設定してください"}</h4>
      <form>
        <div>
          <input
            className="inputText"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            className="inputText"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
      </form>
      <button onClick={handleSignIn}>ログイン</button>
    </div>
  );
};

export default LoginPage;
