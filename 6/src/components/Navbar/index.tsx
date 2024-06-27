import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MISHA_ROUTE, MASK_ROUTE, KAREN_ROUTE, TABLE, AUTH_ROUTE } from "../../app/routes/config";
import { Dropdown, Menu, Space } from "antd";
import { AuthContext } from "../../../AuthContext";
import authInstance from "../../../auth";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await authInstance.post("auth/logout/");
      if (response.status === 200) {
        localStorage.removeItem("access_token");
        setIsAuth(false);
        navigate("/auth");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const items = [
    {
      key: "1",
      label: <Link to={AUTH_ROUTE}>Profile</Link>,
    },
    {
      key: "2",
      label: <button onClick={logout}>Logout</button>,
    },
  ];

  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to={MISHA_ROUTE} className="routeLink">
          Миша
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={MASK_ROUTE} className="routeLink">
          Макс
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={KAREN_ROUTE} className="routeLink">
          Карен
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={TABLE} className="routeLink">
          Таблица
        </Link>
      </Menu.Item>

      {isAuth && (
        <Menu.Item>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>Hover me</Space>
            </a>
          </Dropdown>
        </Menu.Item>
      )}

      {!isAuth && (
        <Menu.Item>
          <Link to={AUTH_ROUTE}>Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
