import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MISHA_ROUTE,
  MASK_ROUTE,
  KAREN_ROUT,
  TABLE,
} from "../../app/routes/config";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginButtonText = isLoggedIn ? "Выйти" : "Войти";

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <Link to={MISHA_ROUTE} className="routeLink">
              Миша
            </Link>
            <Link to={MASK_ROUTE} className="routeLink">
              Макс
            </Link>
            <Link to={KAREN_ROUT} className="routeLink">
              Карен
            </Link>
            <Link to={TABLE} className="routeLink">
              Таблица
            </Link>
          </div>
          <div>
            <div>
              <button onClick={handleLoginToggle}>
                {loginButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
