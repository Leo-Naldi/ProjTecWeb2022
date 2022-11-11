import { React, useState } from "react";
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";
import {Grid} from "@mui/material";
import { Card, CardContent, CardMedia, CardAction, CardActions } from "@mui/material";
import {Button} from "@mui/material";
import { Container } from "@mui/material";

import CommerceHeaderBar from "../components/CommerceHeaderBar";
import ProductCard from "../components/ProductCard";

import getProducts from "../utils/getProducts";

function Commerce() {

    const [isLogged, SetIsLogged] = useState(false);
    const [products, setProducts] = useState(getProducts(20));

    return (
        <Box>
            <CommerceHeaderBar isLogged={isLogged}/>
            <main>
                {/* Hero unit */}
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
                        {products.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={3}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            pt: '0%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </Box>
    );
}

export default Commerce;