import { React, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Badge, InputBase, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Stack } from "@mui/system";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Search from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useAccount } from '../context/CurrentAccountContext';


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

function HeaderBar({ shoppingCart, openSignIn, openCart, openLeftDrawer }) {

    const user = useAccount();

    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    let open = userMenuAnchor !== null;

    const openUserMenu = (e) => setUserMenuAnchor(e.currentTarget);
    const closeUserMenu = () => setUserMenuAnchor(null);

    function getTotalItems() {

        //console.log(Object.values(shoppingCart).map(o => o.amount))

        return (Object.values(shoppingCart)
            .map(o => o.amount)
            .reduce((val, cur) => val + cur, 0));
    }

    return (
        <Box>
            <AppBar position='static'>

                <Menu
                    id='user-menu'
                    anchorEl={userMenuAnchor}
                    open={open}
                    onClose={closeUserMenu}>
                    <MenuItem>Acquisti</MenuItem>
                    <MenuItem>Prenotazioni</MenuItem>
                    <MenuItem>Log Out</MenuItem>
                </Menu>

                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={openLeftDrawer}>
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
                                sx={{ mr: 2 }}
                                onClick={openCart}>
                                <Badge badgeContent={getTotalItems()} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        { user.username === 'default' ? (<IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                onClick={openSignIn}>
                                <AccountCircleTwoToneIcon />
                        </IconButton>) : (<IconButton onClick={openUserMenu}>
                            <Avatar>
                                {user.username[0].toUpperCase()} 
                            </Avatar>
                        </IconButton>)}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderBar;