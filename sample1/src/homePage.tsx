import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // ログアウト処理
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1>Hello, world</h1>

      {/* logout */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
