import React from "react";
import { Typography, Box } from "@mui/material";


export function ErrorMessage({ errorMessage }){

    return (
        <Box
        sx={{
            border: 2,
            borderColor: 'error.dark',
            borderRadius: 3,
            margin: 1,
            padding: 2,
            bgcolor: 'error.light',
        }}>
            <Typography sx={{ 
                color: 'common.black',
             }}>
                {errorMessage}
            </Typography>
        </Box>
    );
}

export default ErrorMessage;