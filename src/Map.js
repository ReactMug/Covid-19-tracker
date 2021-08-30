import React from 'react'
import { MapContainer, TileLayer, } from 'react-leaflet'
import './Map.css';
import 'leaflet/dist/leaflet.css'
import { showDataOnMap } from './util';
const Map = (props) => {
    return (
        <div className='map'>
            <MapContainer
                key={`${props.center[0]}-${props.center[1]}`}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                center={props.center} zoom={props.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> 
                {showDataOnMap(props.countries,props.casesType)}       
            </MapContainer>
        </div>
    )
}

export default Map
