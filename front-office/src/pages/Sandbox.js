import React, {useState} from 'react';
import { AccordionDetails, Grid, Typography, Accordion, FormControlLabel, FormControl, Checkbox } from '@mui/material';
import { Container, Box } from '@mui/system';

import { useAccount } from '../context/CurrentAccountContext';

export default function Sandbox(){

    const account = useAccount();

    // { pet.name: false }, minikui naa.........
    const [checkedPets, setCheckedPets] = useState(
        account.pets.reduce((o, pet) => (o[pet.name] = false, o), {})
    );
    
    const handleSubmit = (e) => {
    
    };

    const handleCheck = (e) => {
        setCheckedPets({
            ...checkedPets,
            [e.target.name]: e.target.checked,
        });
    }

    return (
        <Container>
            <Box sx={{ maxWidth: 'lg', mt: 2 }}>
                <Typography>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Prenotazione
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Seleziona la brestia, scegli luogo, giorno e prenota! Qualcuno i uccida hahahahahhaha.
                    </Typography>
                </Typography> 

                <Box component='form' onSubmit={handleSubmit}>
                 
                    <Accordion>
                        <AccordionDetails>
                            <FormControl>
                                {account.pets.map((pet) => (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={checkedPets[pet.name]}
                                                onChange={handleCheck}
                                                name={pet.name} />
                                        }
                                        label={pet.name} />
                                ))}
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                             
                </Box>
                
            
            </Box>
        </Container>
    );

}