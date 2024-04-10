import { LoadingButton } from '@mui/lab';
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../../app/models/product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { addBasketItemAsync } from '../basket/basketSlice';

interface Props {
	product: Product;
}

const btnStyles = { color: 'secondary.main', outline: 'secondary.main' };

export default function ProductCard({ product }: Props) {
	const { status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();

	return (
		<Card sx={{ bgcolor: 'primary.main' }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'secondary', fontSize: '16px' }}>
						#{product.id}
						{/* {product.name.charAt(0).toUpperCase()} */}
					</Avatar>
				}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: 'bold', color: 'secondary', fontSize: '16px' },
				}}
				sx={{ backgroundColor: 'secondary' }}
			/>
			<CardMedia
				sx={{
					height: 260,
					backgroundSize: 'contain',
					backgroundColor: 'secondary',
				}}
				image={product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography
					gutterBottom
					color="gray"
					variant="body1"
					component="div"
				>
					{currencyFormat(product.price)}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					textTransform={'capitalize'}
				>
					{product.brand}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					textTransform={'capitalize'}
				>
					{product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<LoadingButton
					loading={status.includes('pendingAddItem' + product.id)}
					onClick={() =>
						dispatch(addBasketItemAsync({ productId: product.id }))
					}
					size="small"
					// sx={btnStyles}
					sx={{ color: 'inherit', outline: 'inherit' }}
				>
					Add to cart
				</LoadingButton>
				<Button
					component={Link}
					to={`/catalog/${product.id}`}
					size="small"
					variant="outlined"
					sx={{ color: 'inherit', outline: 'inherit' }}
				>
					View
				</Button>
			</CardActions>
		</Card>
	);
}
