import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import React, {FunctionComponent, useState} from "react";
import styles from './Maps.module.css';

const center = {
  lat: 48.14549,
  lng: 17.11313
};

const handleDirectionsClick = () => {
  const destination = 'Church of St. Ladislaus Špitálska, 811 08 Staré Mesto, Slovakia';
  const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  window.open(url, '_blank');
};

const Map: FunctionComponent = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setTimeout(() => {
    setIsMapLoaded(true);
    }, 1000)
  };

  return (
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_MAPS_KEY}`}>
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={18}
        onLoad={handleMapLoad}
      >
        {isMapLoaded ?
          <div className={styles.infoContainer}>
            <div className={styles.verticalLine}/>
            <div className={styles.infoText}>
              <h1>Church of St. Ladislaus</h1>
              <p>Špitálska, 811 08 Staré Mesto, Slovakia</p>
            </div>

            <button className={styles.directionsButton} onClick={handleDirectionsClick}>
              <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <img className="activity__link_arrow" style={{width: 18, height: 14}} src='/img/arrow.png' alt='arrow'/>
                <img src={'/img/church.png'} alt={'directions'}/>
              </div>

              <p>Directions</p>

            </button>
          </div>
          : null}
        <Marker position={center}/>
      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
