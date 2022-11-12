import { React, useState } from "react";
import { Slide, Typography, Grid, Container } from "@mui/material";
import Box from '@mui/material/Box';

import CommerceHeaderBar from "../components/HeaderBar";
import ProductCard from "../components/ProductCard";
import SignInSide from "../components/SignInSide";

import getProducts from "../utils/getProducts";

function Commerce() {

    const [isLogged, SetIsLogged] = useState(false);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [products, setProducts] = useState(getProducts(20));
    const [signInOpen, setSignInOpen] = useState(false);
    

    function addToshoppingCartHandler(product) {
        setShoppingCart([...shoppingCart, product]);
    } 

    return (
        <Box>
            <CommerceHeaderBar 
                isLogged={isLogged} 
                shoppingCart={shoppingCart}
                openSignIn={() => {setSignInOpen(!signInOpen)}}/>
            <main>
                <SignInSide anchor="right" 
                            toggled={signInOpen} 
                            setToggled={setSignInOpen} />
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            ECommerce Page
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        
                    </Container>
                </Box>
                <Container sx={{ py: 2 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={3}>
                                <ProductCard {...product}
                                    addToCartHandler={addToshoppingCartHandler} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </Box>
    );
}

export default Commerce;