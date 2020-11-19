import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet"
import History from './History'
import Footer from './Footer'

export default function Carte() {
  const histories = [
    {
        classe:"",
        link:"/",
        name:"Accueil",
        hide:""
    },
    {
        classe:"active",
        link:"#",
        name:"Carte",
        hide:"hidden"
    }
  ];

  const markers = [];
  for(let i = 0; i < 2; i++) {
    let first = 46.7 + i;
    let second = -77.98 - i;
    markers.push(<Marker key={'marker_'+i} position={[first, second]}  />);
  }

  return (
    <div>
      <History link={histories} title="Carte" />
      <div className="content titled-content map">
        <section className="carte">
          <div className="row">
            <div className="col-md-3 menu">
              <input type="text" className="form-control" placeholder="Rechercher"/>
            </div>
            <div className="col-md-9 map-div">
              <Map center={[-18.91368, 47.53613]} zoom={5}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers}
              </Map>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}