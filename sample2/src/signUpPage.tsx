import { useState } from "react";
import { signUp } from "./authService";
import { useNavigate } from "react-router-dom";

// 新規登録画面
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 登録処理
  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // サインアップ処理
      await signUp(email, password);
      // 検証画面へ遷移
      navigate("/confirm", { state: { email } });
    } catch (error) {
      alert(`Sign up failed: ${error}`);
    }
  };

  return (
    <div className="loginForm">
      <h1>ユーザー登録</h1>
      <h4>{"登録するメールアドレスとパスワードを設定してください"}</h4>
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
      <button onClick={handleSignUp}>登録</button>
    </div>
  );
};

export default SignUpPage;
