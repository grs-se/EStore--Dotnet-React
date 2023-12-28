import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setBasket } from "../../features/basket/basketSlice";
import agent from "../api/agent";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
  const dispatch = useAppDispatch();
  // const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      primary: {
        //main: '#f2f447',
        main: "#fdfce6",
      },
      secondary: {
        main: "#dfb5bf",
      },
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#6aa2b1" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      />
      <CssBaseline />
      <Header
        darkMode={darkMode}
        handleThemeChange={handleThemeChange}
      />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
