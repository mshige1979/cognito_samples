import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./loginPage";
import HomePage from "./homePage";

function App() {
  // 簡易認証チェック
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* TOPの場合は未認証ではlogin、認証済の場合はhomeへ遷移 */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />

        {/* login */}
        <Route path="/login" element={<LoginPage />} />

        {/* home */}
        <Route
          path="/home"
          element={
            isAuthenticated() ? <HomePage /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
