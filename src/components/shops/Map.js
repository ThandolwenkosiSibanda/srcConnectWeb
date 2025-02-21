import React from 'react';
import GoogleMapReact from 'google-map-react';



const LocationPin = ({ text }) => (
    <div className="pin">
      {/* <Icon icon={locationIcon} className="pin-icon" /> */}

    
      <p className="pin-text">{text}</p>
    </div>
  )

const Map = ({ location, zoomLevel }) => (
    <div className="map" style={{ height: '50vh', width: '100%' }}>
      <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAJG1ijs2h0yx0ZCY21m6wlAxuCr398Wco" }}
        // defaultCenter={defaultProps.center}
        // defaultZoom={defaultProps.zoom}

        // defaultCenter={defaultProps.center}
        // defaultZoom={defaultProps.zoom}
      >



       <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={"My Text"}
        />


      </GoogleMapReact>
      </div>
    </div>
  )

  export default Map;