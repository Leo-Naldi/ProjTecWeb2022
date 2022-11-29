import React, {useState} from 'react';
import { Container, Box } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import { Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

import { useAccount } from '../context/CurrentAccountContext';


const steps = [
    {
        label: "Pet Selection",
        description: `Seleziona le bestie per cui vuoi prenotare un servizio`,
        optional: false,
    },
    {
        label: "Seleziona Data e Luogo (Opzionali)",
        description: `Seleziona le date la citta'`,
        optional: true,
    },
    {
        label: "Seleziona Servizio",
        description: `Seleziona la tipologia di servizio di cui necessiti, o scegli dal
                        catalogo dei servizi disponibili.`,
        optional: false,
    },
    {
        label: "Prenota",
        description: `Prenota Subito!`,
        optional: false,
    },
];




export default function Booking(){

    const account = useAccount();

    // { pet.name: false }, minikui naa.........
    const [checkedPets, setCheckedPets] = useState(
        account.pets.reduce((o, pet) => (o[pet.name] = false, o), {})
    );
    


    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => setActiveStep(activeStep + 1);
    const previousStep = () => setActiveStep(activeStep - 1);
    const resetStep = () => setActiveStep(0);

    
    const handleSubmit = (e) => {
        alert("submitted! yay!");
    };

    const handleCheck = (e) => {
        setCheckedPets({
            ...checkedPets,
            [e.target.name]: e.target.checked,
        });
    }

    return (
        <Container>
            <Box sx={{ 
                maxWidth: 'lg', 
                mt: 2 }}
                component="form" onSubmit={handleSubmit}>

                <Grid container spacing={0}>

                    <Grid key="stepper" item xs={0} sm={2} md={4} border={1} padding={1}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel optional={step.optional ? (
                                        <Typography variant="caption">Optional</Typography>
                                    ) : null}>
                                        {step.label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                            
                    </Grid>

                    <Grid key="steps" item xs={12} sm={10} md={8} border={1} padding={1}>
                        {getActiveStepComponent(activeStep)}
                    </Grid>

                    <Grid key="buttons" item xs={12} sm={12} md={12} border={1} padding={1}>
                        <Button onClick={previousStep} disabled={activeStep === 0}>Prev</Button>
                        <Button onClick={nextStep} disabled={activeStep === steps.length - 1}>
                            Next
                        </Button>
                        {(activeStep === steps.length - 1) ? (<Button type="submit">
                            Submit
                        </Button>) : null}
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );

    function getActiveStepComponent(step) {

        switch (step) {
            case 0:
                return (
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
                );
            case 1:
                return (<></>);
            case 2:
                return (<></>);
            case 3:
                return (<></>);
        }
        
    }

}