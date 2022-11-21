import React from 'react';

import { Box, Container } from '@mui/system';
import { Grid } from '@mui/material';
import FeaturedPage from '../components/FeaturedPage';

import Carousel from 'react-bootstrap/Carousel';


const services_data = [
    {
        title: "Veterinari",
        description: "I nostri veterinari sapranno letteralmente resuscitare il tuo pesciolino rosso morto da una settimana",
        image: "https://source.unsplash.com/random",
        imageText: "Immagine Veterinario",
        linkText: "Prenota Subito",
        href: "/vet",
    },
    {
        title: "Petsitting",
        description: "Vuoi andare i vacanza ma il tuo cane non puo venire con te? Lascialo in compagnia dei nostri professionisti!",
        image: "https://source.unsplash.com/random",
        imageText: "Immagine Petsitting",
        linkText: "Prenota Subito",
        href: "/petsitting",
    }
];

function Services() {
    return (
        <Container>
            <Box sx={{maxWidth: 'lg', mt: 2}}>
                <Carousel>
                    <Carousel.Item>
                        <img 
                            style={{ height:600 }}
                            className="d-block w-100"
                            src="https://source.unsplash.com/random"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Servizi Animal House</h3>
                            <p>Sum text Description, i 100% cannot be bothere to write</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: 600 }}
                            className="d-block w-100"
                            src="https://source.unsplash.com/random"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Veterinari</h3>
                            <p>Trova subito il veterinario piu vicino a te!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: 600 }}
                            className="d-block w-100"
                            src="https://source.unsplash.com/random"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Dog Sitter</h3>
                            <p>
                                Durante queste vacanze affida le tue beshtie ai nostri dogsitter!
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Grid container spacing={4} sx={{ mt:2 }}>
                    {services_data.map((service) => (
                            <FeaturedPage  {...service}/>

                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default Services;