import { React, useState, useEffect } from "react";
import { Typography, Grid, Container, Drawer, 
         CardContent, CardActions, Button,
        Stack, Card, Input, useMediaQuery, Box } from "@mui/material";

import HeaderBar from "../components/HeaderBar";
import ProductCard from "../components/ProductCard";
import SignInForm from "../components/SignInForm";

import { getProducts, getCategories } from "../utils/getProducts";
import { useTheme } from "@emotion/react";

function Commerce() {


    const theme = useTheme();
    const product_num = 20;

    const [shoppingCart, setShoppingCart] = useState({});
    const [products, setProducts] = useState([]);
    const [signInOpen, setSignInOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [categories, setCategories] = useState([]);
    const [openCategories, setOpenCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(-1);

    function addToshoppingCartHandler(id, amount) {

        let newShoppingCart = {...shoppingCart};
        if (id in newShoppingCart) {
            newShoppingCart[id] += amount;  
        } else {
            newShoppingCart[id] = amount;
        }

        setShoppingCart(newShoppingCart);
    } 

    function removeProductHandler(id) {
        let newShoppingCart = { ...shoppingCart };
        delete newShoppingCart[id];
        setShoppingCart(newShoppingCart);
    }

    function changeCartProductAmount(e, id) {
        let newShoppingCart = { ...shoppingCart };
        newShoppingCart[id] = Number(e.target.value);
        setShoppingCart(newShoppingCart);
    }

    function getTotal() {
        return Object.keys(shoppingCart).reduce((acc, cur) => {
            return (acc + shoppingCart[cur] * products.find(p => p.id == cur).price)
        }, 0)
    }

    useEffect(() => {

        let ignore = false;

        getProducts(product_num).then(products => {
            if (!ignore) setProducts(products);
        });

        getCategories().then((c) => {
            if (!ignore) setCategories(c);
            console.log(c)
        });

        return () => (ignore = true);
    }, [])

    return (
        <Box>
            <HeaderBar 
                shoppingCart={shoppingCart}
                openSignIn={() => {setSignInOpen(!signInOpen)}}
                openCart={() => setOpenCart(true)}
                openLeftDrawer={() => setOpenCategories(true)}/>
            <main>
                <Drawer 
                    anchor="right" 
                    open={signInOpen} 
                    onClose={() => setSignInOpen(false)}
                >
                    <SignInForm afterSignInSuccess={() => { setSignInOpen(false) }} />    
                </Drawer>

                <Drawer
                    anchor="right"
                    open={openCart}
                    onClose={() => setOpenCart(false)}>

                    <Container>
                        <Typography variant='h5' sx={{
                            m: 2,
                        }}>
                            Shopping Cart
                        </Typography>
                    </Container>
                    <Box  sx={{
                        width: 680,
                    }}>
                        <Stack sx={{
                            mx: 1,
                            
                        }}>
                            {products.filter(p => Object.keys(shoppingCart).some(id => id == p.id)).
                            map(product => <Card 
                                id={product.id} 
                                sx={{
                                    my: 1,
                                    mx: 2,
                                    display: 'flex',
                                    height: '100%'
                                }}>
                                
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Stack>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color='text.secondary'>
                                            Price: {product.price}$
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => {
                                        removeProductHandler(product.id)
                                    }}>Rimuovi</Button>
                                    <Input
                                        value={shoppingCart[product.id]}
                                        onChange={(e) => changeCartProductAmount(e, product.id)}
                                        onBlur={() => ((shoppingCart[product.id] < 0) ? 0: 999)}
                                        inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 999,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                        sx={{
                                            maxWidth: (shoppingCart[product.id] > 99 ? 50: 40),
                                            ml: 2,
                                        }}

                                    />
                                </CardActions>
                            </Card>)}
                            <Typography variant='h6' sx={{ my: 2, mx: 4 }}>
                                Totale: {getTotal()}$
                            </Typography>
                        </Stack>
                    </Box>
                </Drawer>

                <Drawer
                    anchor="left"
                    open={openCategories}
                    onClose={() => setOpenCategories(false)}>
                    <Box>
                        <Typography variant='h4' sx={{ m: 2, }}>
                            Categorie Prodotti
                        </Typography>
                        <Stack sx={{ 
                            m: 2,
                            p: 1,
                         }}>
                            {categories.map((c) => 
                                <Typography variant='h6' sx={{ my: 1, }}>
                                    {c.replaceAll(/(\b\w)/g, c => c.toUpperCase())}
                                </Typography>
                            )}
                        </Stack>
                    </Box>
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