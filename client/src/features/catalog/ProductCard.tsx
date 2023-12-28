import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { useAppDispatch } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { setBasket } from "../basket/basketSlice";

interface Props {
  product: Product;
}

const btnStyles = { color: "secondary.main", outline: "secondary.main" };
export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card sx={{ bgcolor: "primary.main" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.light" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={"images/" + product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          color="gray"
          variant="h6"
          component="div"
        >
          {currencyFormat(product.price)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
          sx={btnStyles}
        >
          Add to cart
        </LoadingButton>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          size="small"
          variant="outlined"
          sx={btnStyles}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
