import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/header';
import List from './components/List/list';
import Map from './components/Map/map';

function rmblank(data) {
    if (data) {
        let ret = [];
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            if (data[i].name != null) {
                ret.push(data[i]);
            }
        }
        return ret;
    }
    return data;

}

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState({});

    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filterPlaces = places?.filter((place) => place.rating >= rating)
        setFilteredPlaces(filterPlaces);
    }, [rating])

    useEffect(() => {
        console.log(coordinates, bounds);

        if (bounds && bounds.sw && bounds.ne) {
            setIsLoading(true);
            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data));
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    //console.log(data);
                    //console.log(filterPlaces(data));

                    setPlaces(rmblank(data));
                    setFilteredPlaces([]);
                    setIsLoading(false);
                    //setPlaces(data);
                });
        }
    }, [bounds, type]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        weatherData={weatherData}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>

        </>
    );
}

export default App;