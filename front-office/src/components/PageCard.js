import React from "react";
import { Card, CardContent, CardMedia, CardActions, Button } from "@mui/material";

function PageCard({ id, img, href, children }) {
    return (
        <Card id={id}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                image={img}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                {children}
            </CardContent>
            <CardActions>
                <Button href={href}>Page Link</Button>
            </CardActions>
        </Card>
    );
}


export default PageCard;