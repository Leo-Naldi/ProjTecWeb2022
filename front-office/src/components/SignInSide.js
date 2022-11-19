import {React} from 'react';
import { Drawer } from '@mui/material';

import SignInForm from './SignInForm';


function SignInSide({anchor, toggled, setToggled}) {

    return (
        <Drawer 
        anchor={anchor} 
        open={toggled}
        onClose={() => setToggled(false)}>
            <SignInForm afterSignInSuccess={() => {setToggled(false)}}/>
        </Drawer>
    );
}

export default SignInSide;