import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Container, Box } from '@mui/system';

import { useAccount } from '../context/CurrentAccountContext';
import AnimalCard from '../components/AnimalCard';

export default function AnimalGallery() {

    const account = useAccount();

    return (
        <Container>
            <Box sx={{ maxWidth: 'lg', mt: 2 }}>
                <Box>
                    <Container>
                        <Typography component="h2" variant="h5">
                            Galleria
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            Qui puoi aggiuntere i tuoi animaletti maledetti!
                        </Typography>
                    </Container>
                </Box >
                <Grid container
                    sx={{
                        justifyContent: 'space-between',
                        mt: 1,
                    }}
                    spacing={4}>
                    {account.pets.map((pet) => (
                        <Grid item xs={12} sm={6} md={3}>
                            <AnimalCard id={pet.name} {...pet} onClick={() => { }} onRemove={() => { }} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );

}