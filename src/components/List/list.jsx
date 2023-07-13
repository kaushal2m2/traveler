import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Menu, Card } from '@material-ui/core';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';

import PlaceDetails from '../PlaceDetails/placedetails';

import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating, weatherData }) => {
    const classes = useStyles();

    const [elRef, setelRefs] = useState([])

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRef[i] || createRef());
        //setelRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
        setelRefs(refs);
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant='h4'>
                Restaurants, Hotels, and Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
                <>
                    <Grid container className={classes.weather}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select value={type} onChange={(e) => setType(e.target.value)}>
                                <MenuItem value='restaurants'>Restaurants</MenuItem>
                                <MenuItem value='hotels'>Hotels</MenuItem>
                                <MenuItem value='attractions'>Attractions</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Rating</InputLabel>
                            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={3}>Above 3.0</MenuItem>
                                <MenuItem value={4}>Above 4.0</MenuItem>
                                <MenuItem value={4.5}>Above 4.5</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.container} >
                            <CloudOutlinedIcon color='primary' fontSize='large' />
                            <Typography variant='subtitle2'>{weatherData?.current?.temp_f}ºF</Typography>
                        </div>
                    </Grid>

                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid ref={elRef[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRef[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
}

export default List;