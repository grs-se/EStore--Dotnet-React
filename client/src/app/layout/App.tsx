import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../util/util";

function App() {
	const { setBasket } = useStoreContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const buyerId = getCookie('buyerId');
		if (buyerId) {
			agent.Basket.get()
				.then(basket => setBasket(basket))
				.catch(error => console.log(error))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [setBasket]);

	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? 'dark' : 'light';

	const theme = createTheme({
		palette: {
			primary: {
				//main: '#f2f447',
				main: '#fdfce6'
			},
			secondary: {
				main: '#dfb5bf'
			},
			mode: paletteType,
			background: {
				default: paletteType === 'light' ? '#6aa2b1' : '#121212'
			}
		}
	});

	function handleThemeChange() {
		setDarkMode(!darkMode);
	}

	if (loading) return <LoadingComponent message="Initialising app..."/>

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Outlet />
			</Container>
		</ThemeProvider>
	);
}

export default App;