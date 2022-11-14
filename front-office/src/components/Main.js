import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Review from './Review';

function Main({ reviews, title }) {

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                py: 3,
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Divider />
            {reviews.map((review) => (
                <Review key={review.id} {...review} />
            ))}
        </Grid>
    );
}



export default Main;