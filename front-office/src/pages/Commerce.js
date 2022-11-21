import { React, useState, useContext } from "react";
import { Typography, Grid, Container, Drawer } from "@mui/material";
import Box from '@mui/material/Box';

import HeaderBar from "../components/HeaderBar";
import ProductCard from "../components/ProductCard";
import SignInForm from "../components/SignInForm";

import getProducts from "../utils/getProducts";

function Commerce() {

    const [shoppingCart, setShoppingCart] = useState([]);
    const [products, setProducts] = useState(getProducts(20));
    const [signInOpen, setSignInOpen] = useState(false);
    

    function addToshoppingCartHandler(product) {
        setShoppingCart([...shoppingCart, product]);
    } 

    return (
        <Box>
            <HeaderBar 
                shoppingCart={shoppingCart}
                openSignIn={() => {setSignInOpen(!signInOpen)}}/>
            <main>
                <Drawer 
                    anchor="right" 
                    open={signInOpen} 
                    onClose={() => setSignInOpen(false)}
                >
                    <SignInForm afterSignInSuccess={() => { setSignInOpen(false) }} />    
                </Drawer>
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