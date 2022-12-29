import { React, useState, useEffect } from "react";
import { Typography, Grid, Container, Drawer, 
         CardContent, CardActions, Button,
        Stack, Card, Input, useMediaQuery, Box, IconButton, Checkbox, CardMedia } from "@mui/material";

import HeaderBar from "../components/HeaderBar";
import ProductCard from "../components/ProductCard";
import SignInForm from "../components/SignInForm";

import DeleteIcon from '@mui/icons-material/Delete';

import { getProducts, getCategories } from "../utils/getProducts";
import { useTheme } from "@emotion/react";

function Commerce() {


    const theme = useTheme();
    const product_num = 20;

    /* { id: { amount: num, selected: bool } } */
    const [shoppingCart, setShoppingCart] = useState({});

    /* see utils/getProducts */
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    /* drawers opening */
    const [signInOpen, setSignInOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    
    /* search filters */
    const [selectedCategory, setSelectedCategory] = useState(-1);

    function addToshoppingCartHandler(id, amount) {

        let newShoppingCart = {...shoppingCart};
        
        if (id in newShoppingCart) {
            newShoppingCart[id]['amount'] += amount;  
        } else {
            newShoppingCart[id] = {
                'amount': amount,
                selected: true,
            };

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
        newShoppingCart[id]['amount'] = Number(e.target.value);

        if (newShoppingCart[id]['amount'] === 0) newShoppingCart[id]['selected'] = false;

        setShoppingCart(newShoppingCart);
    }

    function getTotal() {
        return Object.keys(shoppingCart).reduce((acc, cur) => {
            if (shoppingCart[cur].selected)
                return (acc + shoppingCart[cur]['amount'] * products.find(p => p.id == cur).price);
            return acc;
        }, 0)
    }

    function changeSelect(e, id) {
        let newShoppingCart = {...shoppingCart};
        newShoppingCart[id].selected = e.target.checked;

        setShoppingCart(newShoppingCart);
    }

    useEffect(() => {

        let ignore = false;

        getProducts(product_num).then(products => {
            if (!ignore) setProducts(products);
        });

        getCategories().then((c) => {
            if (!ignore) setCategories(c);
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
                        <Typography variant='h5' sx={{ my: 2, }}>
                            Shopping Cart
                        </Typography>
                    </Container>
                    <Box>
                        <Stack sx={{
                            mx: 1,

                        }}>
                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                pb: 1,
                                mb: 1,
                            }}>
                                {products.filter(p => Object.keys(shoppingCart).some(id => id == p.id)).
                                map(product => <Card 
                                    id={product.id} 
                                    sx={{
                                        my: 1,
                                        mr: 2,
                                        display: 'flex',
                                        height: '100%'
                                    }}>
                                    <Checkbox 
                                        onChange={(e) => changeSelect(e, product.id)}
                                        checked={shoppingCart[product.id].selected}/>

                                    <CardMedia
                                        component="img"
                                        image={product.img}
                                        alt="Product Image"
                                        sx={{ width: 151, height: '100%'}} />
                                    
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        alignItems: 'space-between',
                                    }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Grid container>
                                                <Grid item md={12}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {product.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={12}>
                                                    <Typography variant="body2" color='text.secondary'>
                                                        Prezzo: {product.price}€
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <Box sx={{ 
                                            display: 'flex',
                                            pb: 1,
                                        }}>
                                            <IconButton onClick={() => {
                                                removeProductHandler(product.id)
                                            }}
                                            sx={{ mr: 1, }}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Input
                                                value={shoppingCart[product.id]['amount']}
                                                onChange={(e) => changeCartProductAmount(e, product.id)}
                                                onBlur={() => ((shoppingCart[product.id] < 0) ? 0 : 999)}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 999,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                                sx={{
                                                    maxWidth: (shoppingCart[product.id]['amount'] > 99 ? 50 : 40),
                                                }}

                                            />
                                        </Box>
                                    </Box>
                                </Card>)}
                            </Box>
                            <Grid container>
                                <Grid item>
                                    <Typography variant='h6' sx={{ my: 2, mx: 4 }}>
                                        Totale: {getTotal()}€
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="contained" 
                                        sx={{ 
                                            mt: 1, 
                                        }}>
                                        Procedi all'ordine
                                    </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Drawer>

                <Drawer
                    anchor="left"
                    open={openCategories}
                    onClose={() => setOpenCategories(false)}>
                    <Box sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}>
                        <Typography variant='h5' sx={{ m: 2, }}>
                            Categorie Prodotti
                        </Typography>
                        <Stack sx={{ 
                            m: 2,
                            p: 1,
                         }}>
                            {categories.map((c) => 
                                <Typography variant='body1' sx={{ my: 1, }}>
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