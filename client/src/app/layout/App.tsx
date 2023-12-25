import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { Outlet } from 'react-router-dom';

function App() {
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Outlet/>
			</Container>
		</ThemeProvider>
	);
}

export default App;