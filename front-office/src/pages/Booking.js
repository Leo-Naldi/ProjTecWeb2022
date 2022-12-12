import React, {useEffect, useReducer, useState} from 'react';
import { Container, Box, Stack } from '@mui/system';
import { Card, Button, CardContent, Grid, Typography, typographyClasses } from '@mui/material';
import { Autocomplete, TextField, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

import { useAccount } from '../context/CurrentAccountContext';
import { getCities } from '../utils/getCities';
import { services, getProviders, shouldDisableDate, getDaySchedule, getMonthSchedule, getEarliestAvailable } from '../utils/getServices';
import bookingReducer from '../reducers/bookingReducer';


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

    const initial_state = {
        checkedPets: account.pets.reduce((o, pet) => (o[pet.name] = false, o), {}),
        selectedService: null,
        providers: null,
        selectedProvider: null,
        selectedDate: null,
        schedule: null,
        displaySchedule: null,
        timeSlots: null,
        selectedTimeSlot: null,
        activeStep: 0,
    };

    const [state, dispatch] = useReducer(bookingReducer, initial_state);

    
    
    // generally speaking if you change something at step x, all state variables in the following 
    // steps should be unset. The only exception is displaySchedule.
    // TODO This avoids any illegal state configurations (i hope) but is stricter than it needs to be 

    // TODO search filters

    const nextStep = () => dispatch({ 
        type: 'CHANGE_STEP', 
        value: (state.activeStep + 1),
    });
    const previousStep = () => dispatch({ 
        type: 'CHANGE_STEP', 
        value: state.activeStep - 1,
    });
    const resetStep = () => dispatch({ 
        type: 'CHANGE_STEP', 
        value: 0 ,
    });

    
    const handleSubmit = (e) => {
        alert("submitted! yay!");
    };

    const handleCheck = (e) => {

        dispatch({ 
            type: 'CHECK_PET', 
            value: e.target.checked, 
            id: e.target.name 
        });
    }

    const handleSelectService = (service) => {
        
        dispatch({ 
            type: 'SELECT_SERVICE', 
            value: service 
        });

        getProviders().then(p => dispatch({
            type: 'FETCHED_PROVIDERS',
            value: p,
        }));
    }

    const handleSelectProvider = (provider) => {
        
        dispatch({
            type: 'SELECT_PROVIDER',
            value: provider.id,
        });

        getMonthSchedule(provider, dayjs()).then(s => dispatch({
            type: 'FETCHED_DISPLAY_SCHEDULE',
            value: s,
        }));
    }

    const handleSelectDate = (date) => {
        
        dispatch({
            type: 'SELECT_DATE',
            value: date,
        });

        getDaySchedule(state.displaySchedule, date).then(s => dispatch({
            type: 'FETCHED_TIME_SLOTS',
            value: s,
        }));
    }

    const selectTimeSlot = (slot) => {
        dispatch({
            type: 'SELECT_TIME_SLOT',
            value: slot,
        });
    }

    const handleMonthChange = (month) => {
        getMonthSchedule(state.selectedProvider, month).then(s => dispatch({
            type: 'CHANGE_DISPLAY_MONTH',
            value: s,
        }));
    }

    return (
        <Container>
            <Box sx={{ 
                maxWidth: 'lg', 
                mt: 2 }}
                component="form" onSubmit={handleSubmit}>

                <Grid container spacing={0}>

                    <Grid key="stepper" item xs={0} sm={2} md={4} border={1} padding={1}>
                        <Stepper activeStep={state.activeStep} orientation="vertical">
                            {steps.map((step) => (
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
                        {getActiveStepComponent(state.activeStep)}
                    </Grid>

                    <Grid key="buttons" item xs={12} sm={12} md={12} border={1} padding={1}>
                        <Button onClick={previousStep} disabled={state.activeStep === 0}>Prev</Button>
                        <Button onClick={resetStep}>Clear</Button>
                        <Button onClick={nextStep} disabled={disableNextStep()}>
                            Next
                        </Button>
                        {(state.activeStep === steps.length - 1) ? (<Button type="submit">
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
                                        checked={state.checkedPets[pet.name]}
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
                            onClick={() => handleSelectService(service)}
                            sx={state.selectedService === service && ({
                                border: 3,
                                borderColor: 'primary.dark',
                            })}>
                            <CardContent>{service}</CardContent>
                        </Card>
                    ))}
                </Stack>);
            case 2:
                return (<Stack spacing={2}>
                    {state.providers.map((provider) => (
                        <Card
                            onClick={() => {
                                handleSelectProvider(provider)
                            }}
                            sx={state.selectedProvider == provider.id && ({
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
                            shouldDisableDate={(date) => shouldDisableDate(state.displaySchedule, date)}
                            value={state.selectedDate}
                            onChange={(newVal) => {handleSelectDate(newVal)}}
                            onMonthChange={handleMonthChange}
                            renderInput={(params) => <TextField {...params} />}/>
                        <Grid container spacing={2}>
                            <Grid item>
                                {(state.timeSlots === null) ? (
                                <Typography>Loading...</Typography>) : 
                                (<Grid container spacing={1}>
                                        {state.timeSlots.map((slot, index) => (<Grid item
                                        md={3} key={index}>
                                        <Card sx={[
                                            state.selectedTimeSlot === index && ({
                                                    border: 3,
                                                    borderColor: 'primary.dark',
                                                }),
                                                { 
                                                    padding: 2 
                                                },
                                            ]}
                                        onClick={() => selectTimeSlot(index)}>
                                            <Typography>
                                                {slot.from.format('HH:mm')} - {slot.to.format('HH:mm')}
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
                                label="Data"
                                value={state.selectedDate}
                                renderInput={(params) => <TextField {...params} />} />
                        </Grid>
                        <Grid key="location" item sm={12} md={6}>
                            <Autocomplete
                                readOnly
                                sx={{ width: 280, }}
                                value={"Citta'"}
                                options={['TODO', 'todo', 'tOdO']}
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

        console.log(state.activeStep);

        if (steps[state.activeStep].optional) return false;

        switch (state.activeStep) {
            case 0:
                return !Object.values(state.checkedPets).some(x => x === true);
            case 1:
                return state.selectedService === null;
            case 2:
                return state.selectedProvider === null;
            case 3:
                return false;
            case 4: 
            default:
                return true;

        }

    }
}
