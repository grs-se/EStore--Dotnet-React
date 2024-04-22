import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: 'onTouched',
	});

	async function submitForm(data: FieldValues) {
		try {
			await agent.Account.login(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 4,
			}}
		>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
				>
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(submitForm)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						fullWidth
						label="Username"
						autoFocus
						{...register('username', { required: 'Username is required' })}
						error={!!errors.username}
						helperText={errors?.username?.message as string}
					/>
					<TextField
						margin="normal"
						fullWidth
						label="Password"
						type="password"
						{...register('password', { required: 'Password is required' })}
						error={!!errors.password}
						helperText={errors?.password?.message as string}
					/>
					<LoadingButton
						disabled={!isValid}
						loading={isSubmitting}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</LoadingButton>
					<Grid container>
						<Grid item>
							<Link to="/register">{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

