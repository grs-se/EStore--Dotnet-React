import { Grid, Paper } from '@mui/material';
import { useEffect } from 'react';
import AppPagination from '../../app/components/AppPagination';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import {
	fetchFilters,
	fetchProductsAsync,
	productSelectors,
	setPageNumber,
	setProductParams,
} from './catalogSlice';

const sortOptions = [
	{ value: 'name', label: 'Alphabetical' },
	{ value: 'priceDesc', label: 'Price - High to low' },
	{ value: 'price', label: 'Price - Low to high' },
];

export default function Catalog() {
	const products = useAppSelector(productSelectors.selectAll);
	const {
		productsLoaded,
		filtersLoaded,
		brands,
		types,
		productParams,
		metaData,
	} = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch]);

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters());
	}, [dispatch, filtersLoaded]);

	if (!filtersLoaded) return <LoadingComponent message="Loading products..." />;

	return (
		<Grid
			container
			columnSpacing={4}
		>
			<Grid
				item
				xs={2}
			>
				<Paper sx={{ mb: 2, p: 2 }}>
					<ProductSearch />
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
					<RadioButtonGroup
						options={sortOptions}
						onChange={function (event: any): void {
							dispatch(setProductParams({ orderBy: event.target.value }));
						}}
						selectedValue={productParams.orderBy}
					/>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={brands}
						checked={productParams.brands}
						onChange={(items: string[]) =>
							dispatch(setProductParams({ brands: items }))
						}
					/>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={types}
						checked={productParams.types}
						onChange={(items: string[]) =>
							dispatch(setProductParams({ types: items }))
						}
					/>
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
				sx={{ mb: 2, mt: 2 }}
			>
				{metaData && (
					<AppPagination
						metaData={metaData}
						onPageChange={(page: number) =>
							dispatch(setPageNumber({ pageNumber: page }))
						}
					/>
				)}
			</Grid>
		</Grid>
	);
}
