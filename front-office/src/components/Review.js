import React from "react";
import { Typography } from "@mui/material";


function Review({ id, date, user, text }){
    return (
        <div>
            <Typography gutterBottom component="h2" sx={{mt: 1}}>
                {user}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
                {text}
            </Typography>
        </div>
    );
}

export default Review;