import React from "react";
import { IconButton, Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function AnimalCard({ id, name, type, age, onClick, onRemove }) {
    return (
        <Card id={id}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            onClick={onClick}
        >
            {/*<CardMedia
                component="img"
                image={img}
                alt="random"
    />*/}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography>
                    Age: {age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {type}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    size="medium"
                    color="inherit"
                    onClick={onRemove}>
                    <RemoveCircleIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}


export default AnimalCard;