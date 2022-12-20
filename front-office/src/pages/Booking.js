import React, { useEffect, useReducer } from 'react';
import { Container, Box, Stack } from '@mui/system';
import { Modal, Card, Button, CardContent, Grid, Typography, useTheme, useMediaQuery, MobileStepper } from '@mui/material';
import { Autocomplete, TextField, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import { useAccount } from '../context/CurrentAccountContext';
import { getCities } from '../utils/getCities';
import { getServices, getProviders, shouldDisableDate, getDaySchedule, getMonthSchedule } from '../utils/getServices';

import bookingReducer from '../reducers/bookingReducer';

import dayjs from 'dayjs';
import { filterProviders } from '../utils/filters';


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

    // TODO style
    // TODO once server is done decide between get all providers once and filter locally 
    // or server-get them every time, rn is the first (note: either way date-available filter has to be
    // implemented server side).

    const account = useAccount();
    const cities = getCities();
    const theme = useTheme();

    let booking_reducer_init_state = {
        activeStep: 0,
        services: [],             // list of all available services
        filterDate: null,         // date filter value
        filterCity: null,         // city filter value
        openFiltersModal: false,  // open filters modal
        checkedPets: account.pets // { pet.name: true/false }
        .   reduce((o, pet) => (o[pet.id] = false, o), {}),
        selectedService: null,    // chosen service type
        providers: [],            // list of displayed providers
        selectedProvider: null,   // selected provider
        selectedDate: null,       
        schedule: null,           // will be deprecated
        displaySchedule: null,    // schedule currently used in the datepicker  
        timeSlots: null,          // list of all available time slots in the selected date
        selectedTimeSlot: null,  
        filteredServices: null,
        filteredProviders: null, 
    };

    const [state, dispatch] = useReducer(bookingReducer, booking_reducer_init_state);

    /* Filtered providers/services have to be refiltered (server-side) in the following cases:
       - Checked Pets changes (only applied when you move past the step)
       - When the Apply button in the filters modal is pressed

       Filtering based on service type happens client side as of now
    */

    const applyFliters = () => {
        //console.log(getPets());
        
        dispatch({
            type: 'APPLY_FILTERS',
            pets: getPets(),
        })
    };

    const clearFilters = () => {
        dispatch({
            type: 'CLEAR_FILTERS',
        })
        applyFliters();
    }

    const nextStep = () => {

        if (state.activeStep == 0) {  // filter based on selected pets
            applyFliters();
        }
        dispatch({ 
            type: 'CHANGE_STEP', 
            value: (state.activeStep + 1),
        })
    };
    const previousStep = () => dispatch({ 
        type: 'CHANGE_STEP', 
        value: state.activeStep - 1,
    });
    const resetStep = () => dispatch({ 
        type: 'CLEAR', 
        value: {
            ...booking_reducer_init_state,
            providers: state.providers,
            services: state.services,
            filteredProviders: state.providers,
            filteredServices: state.services,
        }, 
    });
    const openFilters = () => dispatch({ type: 'CHANGE_MODAL', value: true });
    const closeFilters = (keep = false) => {
        // TODO when closing without keepin previous filter values should be restored
        if (keep) {
            applyFliters()
        } 
        dispatch({ type: 'CHANGE_MODAL', value: false });
    }
    
    const handleSubmit = (e) => {
        alert("submitted! yay!");
    };

    const handleCheck = (e, id) => {

        dispatch({ 
            type: 'CHECK_PET', 
            value: e.target.checked, 
            id: id, 
        });
    }

    const handleSelectService = (service) => {
        
        dispatch({ 
            type: 'SELECT_SERVICE', 
            value: service,
        });
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

    useEffect(() => {
        
        let ignore = false;
        
        // these will also set the filteredProviders/services
        getServices().then((s) => {
            if (!ignore) {
                dispatch({
                    type: 'FETCHED_SERVICES',
                    value: s,
                });
            }
        });

        getProviders()
        .then(p => {
            if (!ignore) {
                dispatch({
                    type: 'FETCHED_PROVIDERS',
                    value: p,
                })
            }
        })

        return (() => (ignore = true));
    }, []);

    return (
        <Container>

            <Modal
                open={state.openFiltersModal}
                onClose={closeFilters}
                sx={{
                    position: 'absolute',
                    left: { [theme.breakpoints.up('sm')]: '25%', },
                    p: 1,
                }}>
                <Box sx={{
                    maxWidth: 'md',
                    bgcolor: '#fff',
                    boxShadow: 20,
                    borderRadius: 2,
                    p: 3,
                    mt: 4,
                    position: 'static',
                    
                }}>
                    <Typography component="h4">Filtri Ricerca</Typography>
                    <Stack spacing={2}>
                        <DatePicker
                            value={state.filterDate}
                            onChange={(date) => {
                                dispatch({
                                    type: 'FILTER_DATE',
                                    value: date,
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}>
                            Data
                        </DatePicker>
                        <Autocomplete
                            disablePortal
                            id="cities"
                            options={cities}
                            value={state.filterCity}
                            onChange={(e, val, reason) => dispatch({
                                type: 'FILTER_CITY',
                                value: val,
                            })}
                            renderInput={(params) => <TextField {...params} label="City" />}
                        />
                        <Grid container spacing={1}>
                            <Grid item key="apply-filters-button" xs={6}>
                                <Button onClick={() => { closeFilters(true) }}>
                                    Apply
                                </Button>
                            </Grid>
                            <Grid item key="clear-filters-button" xs={6}>
                                <Button onClick={() => clearFilters()}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Modal>

            <Box sx={{ 
                maxWidth: 'lg', 
                mt: 2 }}
                component="form" onSubmit={handleSubmit}>    

                <Stack spacing={0}>
                    
                    <Box key='top' 
                        sx={{
                            p: 2,
                            border: 1,
                            borderBottom: 0,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>   
                            <Typography variant='h6'>
                                {steps[state.activeStep].label}
                            </Typography>
                        
                            <Button onClick={() => openFilters()}>
                                Filters
                            </Button>
                        
                    </Box>
                    
                    <Grid container spacing={0}>
                        {useMediaQuery(theme.breakpoints.up('sm')) && <Grid key="stepper" item sm={3} sx={{
                            padding: 1,
                            border: 1,
                            [theme.breakpoints.up('sm')]: {
                                borderRight: 0,
                            }
                        }}>
                            <Stepper 
                                activeStep={state.activeStep} 
                                orientation='vertical'>
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
                        </Grid>}

                        <Grid key="steps" item xs={12} sm={9} border={1} padding={1}>
                            {ActiveStepComponent(state.activeStep)}
                        </Grid>
                    </Grid>

                    
                    {useMediaQuery(theme.breakpoints.up('sm')) ? 
                        (<Box key="buttons" item 
                            sx={{
                                padding: 1,
                                border: 1,
                                borderTop: 0,
                            }}>
                            <Button onClick={previousStep} disabled={state.activeStep === 0}>Prev</Button>
                            <Button onClick={resetStep}>Clear</Button>
                            <Button onClick={nextStep} disabled={disableNextStep()}>
                                Next
                            </Button>
                            {(state.activeStep === steps.length - 1) ? (<Button type="submit">
                                Prenota
                            </Button>) : null}
                        </Box>) : (<MobileStepper
                            variant='dots'
                            steps={steps.length}
                            activeStep={state.activeStep}
                            position='static'
                            sx={{
                                flexGrow: 1,
                            }}
                            nextButton={
                                <Button onClick={nextStep} disabled={disableNextStep()}>
                                    Next
                                </Button>
                            }
                            backButton={
                                <Button onClick={previousStep} disabled={state.activeStep === 0}>
                                    Prev
                                </Button>
                        }/>)
                    }
                </Stack>

            </Box>
        </Container>
    );

    function ActiveStepComponent(step) {

        const screen_size_query = useMediaQuery(theme.breakpoints.up('md'));
        
        switch (step) {
            case 0:
                return (
                    <FormControl>
                        {account.pets.map((pet) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedPets[pet.id]}
                                        onChange={(e) => handleCheck(e, pet.id)}
                                        name={pet.name} />
                                }
                                label={pet.name} />
                        ))}
                    </FormControl>
                );
                
            case 1:
                return (<Stack spacing={2}>
                    {(state.filteredServices.length == 0) ? 
                    (<Container>
                        <Typography variant='h5' sx={{ padding: 2 }}>
                            Non ci sono servizi disponibili per i filtri selezionati D:
                        </Typography>
                    </Container>) : 
                    (state.filteredServices.map((service) => (
                        <Card 
                            onClick={() => handleSelectService(service)}
                            sx={state.selectedService === service && ({
                                border: 3,
                                borderColor: 'primary.dark',
                            })}>
                            <CardContent>{service}</CardContent>
                        </Card>
                    )))}
                </Stack>);
            case 2:
                return (<Stack spacing={2}>
                    {filterProviders(state.filteredProviders, state.selectedService)
                    .map((provider) => (
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
                        {screen_size_query ? 
                         (<StaticDatePicker 
                            disablePast
                            displayStaticWrapperAs="desktop"
                            shouldDisableDate={(date) => shouldDisableDate(state.displaySchedule, date)}
                            value={state.selectedDate}
                            onChange={(newVal) => {handleSelectDate(newVal)}}
                            onMonthChange={handleMonthChange}
                            renderInput={(params) => <TextField {...params} />}/>) : 
                            (<DatePicker
                                disablePast
                                shouldDisableDate={(date) => shouldDisableDate(state.displaySchedule, date)}
                                value={state.selectedDate}
                                onChange={(newVal) => { handleSelectDate(newVal) }}
                                onMonthChange={handleMonthChange}
                                renderInput={(params) => <TextField {...params} />} />)}
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

    function getPets() {
        return account.pets.filter(pet => state.checkedPets[pet.id]);
    }
}
