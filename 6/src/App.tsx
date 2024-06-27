import MainRouter from "./app/routes";
import Navbar from "./components/Navbar";
import GlobalStyles from "./style/GlobalStyle";
import { useContext } from "react";
import { AuthContext } from "../AuthContext.tsx";

const App = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <div>
      <GlobalStyles />
      <Navbar />
      <MainRouter isAuth={isAuth} />
    </div>
  );
};

export default App;
