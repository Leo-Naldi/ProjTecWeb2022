import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link, CardActions } from '@mui/material';


function FeaturedPage({ title, description, image, imageText, linkText, href }) {

    return (
        <Grid item xs={12} md={6}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {description}
                        </Typography>
                        <CardActions>
                            <Link variant="subtitle1" href={href}>
                                {linkText}
                            </Link>
                        </CardActions>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={image}
                        alt={imageText}
                    />
                </Card>
        </Grid>
    );
}

export default FeaturedPage;