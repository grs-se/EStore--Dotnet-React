import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from 'react-router-dom';

interface Props {
	product: Product;
}

const btnStyles = { color: 'secondary.main', outline: 'secondary.main' };
export default function ProductCard({ product }: Props) {
	return (
		<Card sx={{ bgcolor: 'primary.main' }} >
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'secondary.light' }}>
						{product.name.charAt(0).toUpperCase()}
					</Avatar>
				}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: 'bold', color: 'primary.main' }
				}}
			/>
			<CardMedia
				sx={{ height: 140, backgroundSize: 'contain' }}
				image={"images/" + product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography gutterBottom color="gray" variant="h6" component="div">
					${(product.price / 100).toFixed(2)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" sx={btnStyles}>Add to cart</Button>
				<Button component={Link} to={`/catalog/${product.id}`} size="small" variant='outlined' sx={btnStyles}>View</Button>
			</CardActions>
		</Card>
	);
}