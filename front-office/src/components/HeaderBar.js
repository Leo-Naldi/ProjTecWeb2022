import { React } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Badge, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Stack } from "@mui/system";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Search from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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
        width: '60ch',
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

function HeaderBar({user, shoppingCart, openSignIn}) {

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
                            type="text" />
                    </SearchField>
                    
                    <Stack direction="row">
                        
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                sx={{ mr: 2 }}>
                                <Badge badgeContent={shoppingCart.length} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        {user ? null :
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                onClick={() => { openSignIn() }}>
                                <AccountCircleTwoToneIcon />
                            </IconButton>}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderBar;