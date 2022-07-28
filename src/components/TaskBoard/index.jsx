import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Button } from '@mui/material';


export default function TaskBoard(){

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={"Shrimp and Chorizo Paella"}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );

}