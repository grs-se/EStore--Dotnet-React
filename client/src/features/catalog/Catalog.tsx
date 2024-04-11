import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Pagination,
	Paper,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import {
	fetchFilters,
	fetchProductsAsync,
	productSelectors,
} from './catalogSlice';

const sortOptions = [
	{ value: 'name', label: 'Alphabetical' },
	{ value: 'priceDesc', label: 'Price - High to low' },
	{ value: 'price', label: 'Price - Low to high' },
];

export default function Catalog() {
	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status, filtersLoaded, brands, types } =
		useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch]);

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters());
	}, [dispatch, filtersLoaded]);

	if (status.includes('pending'))
		return <LoadingComponent message="Loading products..." />;

	return (
		<Grid
			container
			spacing={4}
		>
			<Grid
				item
				xs={2}
			>
				<Paper sx={{ mb: 2, p: 2 }}>
					<ProductSearch />
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
					<FormControl>
						<FormLabel>Filters</FormLabel>
						<RadioGroup>
							{sortOptions.map(({ value, label }) => (
								<FormControlLabel
									value={value}
									control={<Radio />}
									label={label}
									key={value}
									sx={{ color: 'primary' }}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<FormGroup>
						{brands.map((brand) => (
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label={brand}
								key={brand}
							/>
						))}
					</FormGroup>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<FormGroup>
						{types.map((type) => (
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label={type}
								key={type}
								sx={{}}
							/>
						))}
					</FormGroup>
				</Paper>
			</Grid>

			<Grid
				item
				xs={10}
			>
				<ProductList products={products} />
			</Grid>

			<Grid
				item
				xs={3}
			/>

			<Grid
				item
				xs={9}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography>Displaying 1-6 of 20 items</Typography>
					<Pagination
						count={10}
						color="primary"
						size="medium"
						page={2}
					/>
				</Box>
			</Grid>
		</Grid>
	);
}
