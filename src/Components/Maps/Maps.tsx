import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import React, {FunctionComponent} from "react";
import styles from './Maps.module.css';

const containerStyle = {
  width: '46%',
  height: '766px'
};

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

  return (
    <LoadScript googleMapsApiKey="Key">
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={18}
      >
        <div className={styles.infoContainer}>
          <div className={styles.verticalLine}/>
          <div className={styles.infoText}>
            <h1>Church of St. Ladislaus</h1>
            <p>Špitálska, 811 08 Staré Mesto, Slovakia</p>
          </div>

          <button className={styles.directionsButton} onClick={handleDirectionsClick}>
            <img src={'/img/church.png'} alt={'directions'}/>
            <p>Directions</p>
          </button>
        </div>
        <Marker position={center}/>
      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
