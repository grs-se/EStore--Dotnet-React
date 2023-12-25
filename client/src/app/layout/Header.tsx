import { AppBar, Button, Toolbar, Typography } from "@mui/material";

interface Props {
	darkMode: boolean;
	handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
	return (
		<AppBar position='sticky' sx={{ mb: 4, bgcolor: 'secondary.main' }}>
			<Toolbar>
				<Typography variant='h6'>
					Forget-Me-Not Flowers
				</Typography>
				<Button
					variant="outlined"
					onClick={handleThemeChange}
				>
					{darkMode ? 'Dark' : 'Light'}
				</Button>
			</Toolbar>
		</AppBar>
	);
}