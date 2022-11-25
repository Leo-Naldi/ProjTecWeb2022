import React, { useState } from "react";
import { IconButton, Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTheme } from "@emotion/react";


function AnimalCard({ id, name, img, type, age, onClick, onRemove }) {

    const theme = useTheme();
    const [style, setStyle] = useState({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 2,
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            ':hover': {
                boxShadow: 20,
            },
        },
    });
    const [selected, setSelected] = useState(false);

    const clickCard = (e) => {

        if (selected) {
            setStyle({
                ...style,
                border: 0,
            });
        }
        else {
            setStyle({
                ...style,
                border: 3,
                borderColor: 'primary.dark',
            });
        }

        setSelected(!selected);
    }

    return (
        <Card id={id}
            sx={style}
            onClick={clickCard}
        >
            {<CardMedia
                component="img"
                image={img}
                alt="random"/>}
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