import { DarkMode, LightMode, ShoppingCart } from '@mui/icons-material';
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	Toolbar,
	Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

const midLinks = [
	{ title: 'catalog', path: '/catalog' },
	{ title: 'about', path: '/about' },
	{ title: 'contact', path: '/contact' },
];

const rightLinks = [
	{ title: 'login', path: '/login' },
	{ title: 'register', path: '/register' },
];

const siteBrandStyles = {
	color: 'inherit',
	textDecoration: 'none',
	typography: 'h6',
	'&:hover': {
		color: 'grey.500',
	},
	'&.active': {
		color: 'text.secondary',
	},
};

const navStyles = {
	color: 'inherit',
	textDecoration: 'none',
	typography: 'body1',
	'&:hover': {
		color: 'grey.500',
	},
	'&.active': {
		color: 'text.secondary',
	},
};

interface Props {
	darkMode: boolean;
	handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
	const { basket } = useAppSelector((state) => state.basket);

	const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<AppBar
			position="sticky"
			sx={{ mb: 4, bgcolor: 'secondary.main' }}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItem: 'center',
				}}
			>
				<Box
					display="flex"
					alignItems="center"
				>
					<Typography
						variant="h2"
						component={NavLink}
						to="/"
						sx={siteBrandStyles}
					>
						Art Store
					</Typography>
				</Box>

				<List sx={{ display: 'flex' }}>
					{midLinks.map(({ title, path }) => (
						<ListItem
							component={NavLink}
							to={path}
							key={path}
							sx={navStyles}
						>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>

				<Box
					display="flex"
					alignItems="center"
				>
					<IconButton
						component={Link}
						to="/basket"
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2 }}
					>
						<Badge
							badgeContent={itemCount}
							color="secondary"
						>
							<ShoppingCart />
						</Badge>
					</IconButton>

					<List sx={{ display: 'flex' }}>
						{rightLinks.map(({ title, path }) => (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navStyles}
							>
								{title.toUpperCase()}
							</ListItem>
						))}
					</List>

					<Button
						variant="outlined"
						color="secondary"
						onClick={handleThemeChange}
					>
						{/* {darkMode ? 'Dark' : 'Light'} */}
						<IconButton
							size="small"
							edge="start"
							sx={{ color: 'primary', borderColor: 'primary.main' }}
						>
							{/* <Badge
								badgeContent={itemCount}
								color="secondary"
							> */}
							{darkMode ? <LightMode /> : <DarkMode />}

							{/* </Badge> */}
						</IconButton>
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
