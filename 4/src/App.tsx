import MainRouter from "./app/routes";
import Navbar from "./components/Navbar";
import GlobalStyles from "./style/GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Navbar />
      <MainRouter />
    </div>
  );
};

export default App;
