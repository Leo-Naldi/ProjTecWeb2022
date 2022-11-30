import React, {useState} from 'react';
import { Container, Box, Stack } from '@mui/system';
import { Card, Button, CardContent, Grid, Typography } from '@mui/material';
import { Autocomplete, TextField, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useAccount } from '../context/CurrentAccountContext';
import { getCities } from '../utils/getCities';
import { services } from '../utils/getServices';


const steps = [
    {
        label: "Pet Selection",
        description: `Seleziona le bestie per cui vuoi prenotare un servizio`,
        optional: false,
    },
    {
        label: "Seleziona Data e Luogo",
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
    const cities = getCities();

    // { pet.name: false }, minikui naa.........
    const [checkedPets, setCheckedPets] = useState(
        account.pets.reduce((o, pet) => (o[pet.name] = false, o), {})
    );
    
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    
    const [selectedService, setSelectedService] = useState(null);

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
                                        <Typography variant="caption">Opzionale</Typography>
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
                return (
                    <Grid container sx={{
                        pt: 2,
                        pl: 2,
                    }} spacing={4}>
                        <Grid key="startDate" item sm={12} md={6}>
                            <DatePicker 
                                disablePast
                                label="Data Inizio"
                                value={startDate}
                                onChange={(newDate) => {
                                    setStartDate(newDate);
                                    if (endDate === null)
                                        setEndDate(newDate);
                                }}
                                renderInput={(params) => <TextField {...params}/>} />
                        </Grid>
                        <Grid key="endDate" item sm={12} md={6}>
                            <DatePicker
                                disablePast
                                shouldDisableDate={(date) => date.isBefore(startDate)}
                                shouldDisableMonth={(date) => date.isBefore(startDate)}
                                label="Data Fine"
                                value={(endDate === null) ? (startDate) : (endDate)}
                                onChange={(newDate) => setEndDate(newDate)}
                                renderInput={(params) => <TextField {...params} />} />
                        </Grid>
                        <Grid key="location" item sm={12} md={6}>
                            <Autocomplete
                                sx={{ width: 280, }}
                                disablePortal
                                id="city-select"
                                options={cities}
                                renderInput={(params) => <TextField {...params} label="Citta'" />}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (<Stack spacing={2}>
                    {services.map((service) => (
                        <Card 
                            onClick={() => setSelectedService(service)}
                            sx={selectedService === service && ({
                                border: 3,
                                borderColor: 'primary.dark',
                            })}>
                            <CardContent>{service}</CardContent>
                        </Card>
                    ))}
                </Stack>);
            case 3:
                return (<></>);
        }
        
    }

}