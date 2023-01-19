import { React } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useDispatchAccount, useSetToken, useToken } from '../context/CurrentAccountContext';
import validateSignIn from '../utils/signInUser';


function SignInForm({afterSignInSuccess = null, afterSignInError = null}) {

    const accountDispatch = useDispatchAccount();
    const setToken = useSetToken();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        //console.log(data);

        validateSignIn(data)
            .then(res => {  // login success
                console.log("YEY")
                if (res.ok) return res.json();
                else if (res.status === 409) throw new Error("Failed");
            })
            .then(body => {
                // console.log(body.token)
                setToken(body.token);

                fetch('http://localhost:8001/users/id/' + body.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + body.token,
                    },
                    method: 'get',
                }).then((res) => {
                    if (res.ok) return res.json();
                    else if (res.status === 409) throw new Error("Failed");
                }).then(body => {
                    
                    accountDispatch({ 
                        type: 'USER_CHANGED', 
                        username: body[0].username,
                        email: body[0].email,
                        pets: body[0].pets || [],
                    });
                    if (afterSignInSuccess) afterSignInSuccess();
                }).catch(e => console.error(e))

                // TODO fetch user info
            })
            .catch((e) => {
                console.log("NOOOOOO")
                console.error(e);
                // TODO set an error message
            });
            

    };

    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default SignInForm;