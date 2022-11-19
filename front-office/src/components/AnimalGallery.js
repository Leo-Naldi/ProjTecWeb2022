import React from 'react';

import { Container, Grid, Typography } from '@mui/material';

import { useAccount } from '../context/CurrentAccountContext';
import AnimalCard from './AnimalCard';

function AnimalGallery(){
 
    const account = useAccount();

    return (
        <Container sx={{ py: 2 }} maxWidth="lg">
            
            {account.animals === [] ? 'empty': 'full'}
            {console.log(account)}

            <Grid container spacing={2}>
                {account.animals.map((animal) => (
                    <Grid item key={animal.id} xs={12} sm={6} md={3}>
                        Retard
                        <AnimalCard {...animal}
                            onClick={() => {alert("clicker")}} 
                            onRemove={() => { alert("removed") }} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

}

export default AnimalGallery;