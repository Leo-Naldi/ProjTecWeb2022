import { React, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Search from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";


const SearchField = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

function Commerce() {

    const [isLogged, SetIsLogged] = useState(false);
    const [toggleNavBar, SetToggledNavBar] = useState(false);

    return (
        <Box>
            <AppBar position='static'>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton 
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}>
                        <MenuIcon />  
                    </IconButton>  

                    <SearchField 
                        sx={{ mr: 2 }}>
                        <SearchIconWrapper>
                            <Search />
                        </SearchIconWrapper>
                        <StyledInputBase 
                            placeholder="Search..."
                            type ="text" />
                    </SearchField>
                
                    {isLogged ? null : <AccountCircleTwoToneIcon />}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Commerce;