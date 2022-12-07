import React, {useEffect, useState} from 'react';
import { Container, Box, Stack } from '@mui/system';
import { Card, Button, CardContent, Grid, Typography, typographyClasses } from '@mui/material';
import { Autocomplete, TextField, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

import { useAccount } from '../context/CurrentAccountContext';
import { getCities } from '../utils/getCities';
import { services, getProviders, shouldDisableDate, getDaySchedule } from '../utils/getServices';


const steps = [
    {
        label: "Pet Selection",
        description: `Seleziona le bestie per cui vuoi prenotare un servizio`,
        optional: false,
    },
    {
        label: "Seleziona Servizio",
        description: `Seleziona la tipologia di servizio di cui necessiti, o scegli dal
                        catalogo dei servizi disponibili.`,
        optional: false,
    },
    {
        label: "Seleziona Operatore",
        // description: `Seleziona l'operatore presso il quale vuoi farti serviziare`,
        optional: false,
    },
    {
        label: "Data e Ora",
        description: `Scegli data e orario`,
        optional: true,
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
    
    const [providers, setProviders] = useState([]);

    const [filterStartDate, setFilterStartDate] = useState(null);
    const [filterEndDate, setFilterEndDate] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [timeSlots, setTimeSlots] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

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

    // fetch shiet from server
    useEffect(() => {

        let ignore = false;

        getProviders().then((providers) => {
            setTimeout(() => {if (!ignore) {
                setProviders(providers);
            }}, 1000);
        });

        return (() => { ignore = true; });

    }, []);

    useEffect(() => {

        if ((selectedProvider !== null)) {
            getDaySchedule(selectedProvider, selectedDate).then((slots) => {               
                setTimeSlots(slots);
                setSelectedSlot(null);
            })
        }


    }, [selectedDate, selectedProvider]);

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
                        <Button onClick={nextStep} disabled={disableNextStep()}>
                            Next
                        </Button>
                        {(activeStep === steps.length - 1) ? (<Button type="submit">
                            Prenota
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
            case 2:
                return (<Stack spacing={2}>
                    {providers.map((provider) => (
                        <Card
                            onClick={() => {
                                setSelectedProvider(provider); 
                                setSelectedDate(dayjs())
                            }}
                            sx={selectedProvider === provider && ({
                                border: 3,
                                borderColor: 'primary.dark',
                            })}>
                            <CardContent>
                                <Typography variant="h5">
                                    {provider.service_name}
                                </Typography>
                                <Typography variant="subtle1">
                                    {provider.city}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>);
            case 3: 
                return (
                    <Box>
                        <StaticDatePicker 
                            disablePast
                            displayStaticWrapperAs="desktop"
                            shouldDisableDate={(date) => shouldDisableDate(selectedProvider, date)}
                            value={selectedDate}
                            onChange={(newVal) => {setSelectedDate(newVal)}}
                            renderInput={(params) => <TextField {...params} />}/>
                        <Grid container spacing={2}>
                            <Grid item>
                                {(timeSlots === null) ? (
                                <Typography>Loading...</Typography>) : 
                                (<Grid container spacing={1}>
                                    {timeSlots.map((slot, index) => (<Grid item
                                        md={3} key={index}>
                                        <Card sx={[
                                                selectedSlot === index && ({
                                                    border: 3,
                                                    borderColor: 'primary.dark',
                                                }),
                                                { 
                                                    padding: 2 
                                                },
                                            ]}
                                        onClick={() => setSelectedSlot(index)}>
                                            <Typography>
                                                {slot.from.hour()}:{slot.from.minute()} - {slot.to.hour()}:{slot.to.minute()}
                                            </Typography>
                                        </Card>
                                    </Grid>))}
                                </Grid>)}
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 4:
                return (<Box>
                    <Grid container sx={{
                        pt: 2,
                        pl: 2,
                    }} spacing={4}>
                        <Grid key="filterStartDate" item sm={12} md={6}>
                            <DatePicker
                                readOnly
                                label="Data Inizio"
                                value={filterStartDate}
                                renderInput={(params) => <TextField {...params} />} />
                        </Grid>
                        <Grid key="filterEndDate" item sm={12} md={6}>
                            <DatePicker
                                readOnly
                                label="Data Fine"
                                value={(filterEndDate === null) ? (filterStartDate) : (filterEndDate)}
                                renderInput={(params) => <TextField {...params} />} />
                        </Grid>
                        <Grid key="location" item sm={12} md={6}>
                            <Autocomplete
                                readOnly
                                sx={{ width: 280, }}
                                value={selectedCity}
                                options={cities}
                                disablePortal
                                id="city-selected"
                                renderInput={(params) => <TextField {...params} label="Citta'" />}
                            />
                        </Grid>
                    </Grid> 
                </Box>);
        }    
    }

    function disableNextStep() {

        if (steps[activeStep].optional) return false;

        switch (activeStep) {
            case 0:
                return !Object.values(checkedPets).some(x => x === true);
            case 1:
                return selectedService === null;
            case 2:
                return selectedProvider === null;
            case 3:
                return false;
            case 4: 
            default:
                return true;

        }

    }
}

/*return (
                    <Grid container sx={{
                        pt: 2,
                        pl: 2,
                    }} spacing={4}>
                        <Grid key="filterStartDate" item sm={12} md={6}>
                            <DatePicker 
                                disablePast
                                label="Data Inizio"
                                value={startDate}
                                onChange={(newDate) => {
                                    setStartDate(newDate);
                                    if (filterEndDate === null)
                                        setFilterEndDate(newDate);
                                }}
                                renderInput={(params) => <TextField {...params}/>} />
                        </Grid>
                        <Grid key="filterEndDate" item sm={12} md={6}>
                            <DatePicker
                                disablePast
                                shouldDisableDate={(date) => date.isBefore(startDate)}
                                shouldDisableMonth={(date) => date.isBefore(startDate)}
                                label="Data Fine"
                                value={(filterEndDate === null && startDate !== null) ? (startDate) : (filterEndDate)}
                                onChange={(newDate) => setFilterEndDate(newDate)}
                                renderInput={(params) => <TextField {...params} />} />
                        </Grid>
                        <Grid key="location" item sm={12} md={6}>
                            <Autocomplete
                                sx={{ width: 280, }}
                                disablePortal
                                id="city-select"
                                options={cities}
                                onChange={(e, city) => setSelectedCity(city)}
                                renderInput={(params) => <TextField {...params} label="Citta'" />}
                            />
                        </Grid>
                    </Grid>
                );*/