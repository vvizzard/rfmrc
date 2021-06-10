import React, { createRef, Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON, ImageOverlay } from 'react-leaflet'
import { Icon } from "leaflet"
import History from './History'
import Footer from './Footer'
import json from '../regions/regions.json'

export default class Carte extends Component {

  constructor(props) {
    super(props);

    this.mapRef = createRef();
    // this.mapCenter = props.center!=null?props.center:[-6.82349, 39.26951];
    // this.mapZoom = props.zoom!=null?props.zoom:4;

    this.mapDateRef = createRef();
    this.mapTypeRef = createRef();

    this.state = {
      regions: null,
      regionLayerReferences: null,
      focused: false,
      focusedRegionIndex: null,
      fire:[],
      tiles:{
        url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      isSatellite: false
    }
  }

  toSatellite() {
    let sat = this.state.isSatellite;
    const newTiles = !sat ? {
      url:"https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaGFyaWUiLCJhIjoiY2p0cXlubW83MGEyNjRkbDgwYjgzbHpyMCJ9.I_05xIIXbm5EqhqSXTDbJQ",
      attribution:'© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
    }:{
      url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
    this.setState({
      tiles:newTiles,
      isSatellite:!sat
    })
  }

  convertCoordinateLong(lng) {
    return lng * 20037508.34 / 180;
  }

  convertCoordinateLat(lat) {
    const y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    return y * 20037508.34 / 180;
  }

  handleMapMouseOver(index) {
    const element = this.state.regionLayerReferences[index];
    const layer = element.current.leafletElement;

    if(!this.state.focused || this.state.focusedRegionIndex != index) {
      layer.setStyle({
        color: '#4a83ec',
        weight: 0.25,
        fillColor: "#1a1d62",
        fillOpacity: 0.5,
      });
    }
  }

  handleMapMouseOut(index) {
    const element = this.state.regionLayerReferences[index];
    const layer = element.current.leafletElement;

    if(!this.state.focused || this.state.focusedRegionIndex != index) {
      layer.setStyle({
        color: '#4a83ec',
        weight: 0.25,
        fillColor: "#1a1d62",
        fillOpacity: 0,
      });
    }
  }

  focusOnRegion(index) {

    this.setState({
      focused: true,
      focusedRegionIndex: index
    });

    for (let i = 0; i < this.state.regionLayerReferences.length; i++) {
      const element = this.state.regionLayerReferences[i];
      const layer = element.current.leafletElement;
      if(index==i) {
        const map = this.mapRef.current.leafletElement;
        map.fitBounds(layer.getBounds());
      }
    }
  }

  makeFireOverlayLink(bonds) {
    var date = this.mapDateRef.current.value;
    console.log(date);
    var type = this.mapTypeRef.current.value;
    console.log(type);
    if(!date) date = "2020-01-01";
    const imageLink = "https://firms2.modaps.eosdis.nasa.gov/wms/key/e3d03a47a3a71938a8c82e4b13aadad7/?REQUEST=GetMap"
        +"&layers="+type
        +"&TIME="+date+"/"+date+"&WIDTH=1024&HEIGHT=512&BBOX="
        +this.convertCoordinateLong(bonds._southWest.lng)+","
        +this.convertCoordinateLat(bonds._southWest.lat)+","
        +this.convertCoordinateLong(bonds._northEast.lng)+","
        +this.convertCoordinateLat(bonds._northEast.lat)+"&SRS=EPSG:3857";
    return imageLink;
  }

  updateFireOverlay() {
    const map = this.mapRef.current.leafletElement;
    const bounds = map.getBounds();
    const imageLink = this.makeFireOverlayLink(bounds);

    // To prevent some bug and lag of rendering, this is the best way I tryed
    const temp = this.state.fire;
    const newFire = {
      link:imageLink,
      bounds:bounds,
      ref: createRef()
    };
    temp.push(newFire);
    this.setState({fire:temp});
    
    if(this.state.fire[this.state.fire.length-2]) {
      this.state.fire[this.state.fire.length-2].ref.current.leafletElement.remove(); // Remove it from the map 
      // console.log("niampy");
      // console.log(this.state.fire);
    }
    // if(this.state.fire.length > 3) {
    //   const temp2 = this.state.fire;
    //   temp2.splice(0, 2);
    //   temp2.push(newFire)
    //   this.setState({fire:temp2});
    //   console.log("efa niala");
    //   console.log(this.state.fire);
    // }
  }

  
  render() {
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
  
    // Regions and countries layer
    const layerStyle = {
      color: '#4a83ec',
      opacity:0.2,
      weight: 0.25,
      fillColor: "#1a1d62",
      fillOpacity: 0,
    };
    const layers = [];
    const refs = [];

    for (let i = 0; i < json.length; i++) {
      const reference = createRef();
      refs.push(reference);

      layers.push(
        <GeoJSON 
          ref={reference}
          key={"geojson"+i} 
          data={json[i]} 
          style={() => (layerStyle)}
          onmouseover={() => {
            this.handleMapMouseOver(i)
          }}
          onmouseout={() => {
            this.handleMapMouseOut(i)
          }}
          onclick={() => {
            this.focusOnRegion(i);
          }}
        >
        </GeoJSON>
      ); 
    }
    this.state.regions= layers;
    this.state.regionLayerReferences= refs;

    return (
      <div>
        {/* <History link={histories} title="Carte" /> */}
        <div className="content titled-content map">
          <section className="carte">
            <div className="row">
              <div className="col-md-12 map-div">
                <div className="menu">
                  <div className="form-group">
                    <label htmlFor="date_fire">Date : </label>
                    <input ref={this.mapDateRef} type="date" id="date_fire" className="form-control" placeholder="Rechercher"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="type_fire">Type : </label>
                    <select ref={this.mapTypeRef} id="type_fire" className="form-control">
                      <option value="fires_modis">MODIS</option>
                      <option value="fires_terra">TERRA</option>
                      <option value="fires_aqua">AQUA</option>
                      <option value="fires_viirs">VIIRS</option>
                      <option value="fires_viirs_snpp">VIIRS_SNPP</option>
                      <option value="fires_viirs_noaa20">VIIRS_NOAA20</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input onChange={()=>{this.toSatellite()}} type="checkbox" id="is_satellite" /><label htmlFor="is_satellite">. Satellite</label>
                  </div>
                  <button onClick={()=>{this.updateFireOverlay()}} className="btn btn-primary">Lancer</button>
                </div>
                <Map center={this.props.center} zoom={this.props.zoom} ref={this.mapRef}>
                  <TileLayer
                    url={this.state.tiles.url}
                    attribution={this.state.tiles.attribution}
                  />
                  {this.state.fire.map((layer, idx) => 
                    <ImageOverlay
                      key={"image_"+ idx}
                      url={layer.link}
                      bounds={layer.bounds}
                      ref={layer.ref}
                    />
                  )}
                  {this.state.regions}
                </Map>
              </div>
            </div>
          </section>
          {/* <Footer /> */}
        </div>
      </div>
    );

  }
}