import React from "react";
import { IconButton, Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductCard({ id, img, name, price, addToCartHandler }){
    return (
        <Card id={id}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                image={img}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography>
                    This is where the product description will be. It will be very 
                    interesting i promise.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${price}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    size="medium"
                    color="inherit"
                    onClick={addToCartHandler}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}


export default ProductCard;