import axios from "axios";
import React, { createRef, Component } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  ImageOverlay,
} from "react-leaflet";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
// import json from '../regions/regions.json'

class Carte extends Component {
  constructor(props) {
    super(props);

    this.mapRef = createRef();
    // this.mapCenter = props.center!=null?props.center:[-6.82349, 39.26951];
    // this.mapZoom = props.zoom!=null?props.zoom:4;

    this.mapDateRef = createRef();
    this.mapTypeRef = createRef();

    this.state = {
      year: "2016",
      month: "01",
      regions: null,
      regionLayerReferences: null,
      focused: false,
      focusedRegionIndex: null,
      fire: [],
      tiles: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      },
      isSatellite: false,
      feuxGeoJson: "",
      // part1: "",
      // part2: "",
      // part3: "",
      // part4: "",
      // part5: "",
      // part6: "",
      // part7: "",
      // part8: "",

      fireGeoJson: [],
    };

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }

  handleMonthChange(e) {
    this.setState({ month: e.target.value });
  }

  toSatellite() {
    let sat = this.state.isSatellite;
    const newTiles = !sat
      ? {
          url: "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFjaGFyaWUiLCJhIjoiY2p0cXlubW83MGEyNjRkbDgwYjgzbHpyMCJ9.I_05xIIXbm5EqhqSXTDbJQ",
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        }
      : {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        };
    this.setState({
      tiles: newTiles,
      isSatellite: !sat,
    });
  }

  convertCoordinateLong(lng) {
    return (lng * 20037508.34) / 180;
  }

  convertCoordinateLat(lat) {
    const y =
      Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
    return (y * 20037508.34) / 180;
  }

  handleMapMouseOver(index) {
    const element = this.state.regionLayerReferences[index];
    const layer = element.current.leafletElement;

    if (!this.state.focused || this.state.focusedRegionIndex != index) {
      layer.setStyle({
        color: "#4a83ec",
        weight: 0.25,
        fillColor: "#1a1d62",
        fillOpacity: 0.5,
      });
    }
  }

  handleMapMouseOut(index) {
    const element = this.state.regionLayerReferences[index];
    const layer = element.current.leafletElement;

    if (!this.state.focused || this.state.focusedRegionIndex != index) {
      layer.setStyle({
        color: "#4a83ec",
        weight: 0.25,
        fillColor: "#1a1d62",
        fillOpacity: 0,
      });
    }
  }

  focusOnRegion(index) {
    for (let i = 0; i < this.state.regionLayerReferences.length; i++) {
      const element = this.state.regionLayerReferences[i];
      const layer = element.current.leafletElement;
      if (index == i) {
        layer.setStyle({
          color: "#5d4037",
          weight: 2,
          opacity: 1,
          fillColor: "#1a1d62",
          fillOpacity: 0,
        });
        const map = this.mapRef.current.leafletElement;
        map.fitBounds(layer.getBounds());
      } else {
        layer.setStyle({
          color: "#4a83ec",
          weight: 0.25,
          fillColor: "#1a1d62",
          fillOpacity: 0,
        });
      }
    }
    this.setState({
      focused: true,
      focusedRegionIndex: index,
    });
  }

  makeFireOverlayLink(bonds) {
    var date = this.mapDateRef.current.value;
    console.log(date);
    var type = this.mapTypeRef.current.value;
    console.log(type);
    if (!date) date = "2020-01-01";
    const imageLink =
      "https://firms2.modaps.eosdis.nasa.gov/wms/key/e3d03a47a3a71938a8c82e4b13aadad7/?REQUEST=GetMap" +
      "&layers=" +
      type +
      "&TIME=" +
      date +
      "/" +
      date +
      "&WIDTH=1024&HEIGHT=512&BBOX=" +
      this.convertCoordinateLong(bonds._southWest.lng) +
      "," +
      this.convertCoordinateLat(bonds._southWest.lat) +
      "," +
      this.convertCoordinateLong(bonds._northEast.lng) +
      "," +
      this.convertCoordinateLat(bonds._northEast.lat) +
      "&SRS=EPSG:3857";
    return imageLink;
  }

  updateFireOverlay() {
    const map = this.mapRef.current.leafletElement;
    const bounds = map.getBounds();
    const imageLink = this.makeFireOverlayLink(bounds);

    // To prevent some bug and lag of rendering, this is the best way I tryed
    const temp = this.state.fire;
    const newFire = {
      link: imageLink,
      bounds: bounds,
      ref: createRef(),
    };
    temp.push(newFire);
    this.setState({ fire: temp });

    if (this.state.fire[this.state.fire.length - 2]) {
      this.state.fire[
        this.state.fire.length - 2
      ].ref.current.leafletElement.remove(); // Remove it from the map
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

  // handleUpdateFireGeojson(test) {
  //   this.setState({
  //     feuxGeoJson: "",
  //     part1: "",
  //     part2: "",
  //     part3: "",
  //     part4: "",
  //     part5: "",
  //     part6: "",
  //     part7: "",
  //     part8: "",
  //   });
  //   if(test == "") test = "test";
  //   var feux = test;
  //   const map = this.mapRef.current.leafletElement;
  //   const bounds = map.getBounds();
  //   console.log('map.getZoom():');
  //   console.log(map.getZoom());
  //   if(map.getZoom() > 6) {
  //     axios.get('http://app.rfmrc-ea.org/api/geojson/'+feux+'/'
  //       +bounds._southWest.lng+'/'+bounds._northEast.lng+'/'
  //       +bounds._southWest.lat+'/'+bounds._northEast.lat
  //     ).then(result => {
  //       this.setState({
  //         feuxGeoJson : <GeoJSON
  //           key={"feux"}
  //           data={result.data.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 1,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 0.75,
  //           })}
  //         />
  //       });
  //       console.log("geojson");
  //       console.log(this.state.feuxGeoJson);
  //     })
  //   } else {
  //     this.getGeoJson(feux, 42.5, 46.5, -14.3, -11.3).then(result=>{
  //       this.setState({
  //         part1 : <GeoJSON
  //           key={"feux_11"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 42.5, 46.5, -17.3, -14.3).then(result=>{
  //       this.setState({
  //         part2 : <GeoJSON
  //           key={"feux_12"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 42.5, 46.5, -20.3, -17.3).then(result=>{
  //       this.setState({
  //         part3 : <GeoJSON
  //           key={"feux_13"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 42.5, 46.5, -26, -20.3).then(result=>{
  //       this.setState({
  //         part4 : <GeoJSON
  //           key={"feux_14"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 46.5, 51, -14.3, -11.3).then(result=>{
  //       this.setState({
  //         part5 : <GeoJSON
  //           key={"feux_15"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 46.5, 51, -17.3, -14.3).then(result=>{
  //       this.setState({
  //         part6 : <GeoJSON
  //           key={"feux_16"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 46.5, 51, -20.3, -17.3).then(result=>{
  //       this.setState({
  //         part7 : <GeoJSON
  //           key={"feux_17"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //     this.getGeoJson(feux, 46.5, 51, -26, -20.3).then(result=>{
  //       this.setState({
  //         part8 : <GeoJSON
  //           key={"feux_18"}
  //           data={result.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //     });
  //   }
  // }

  async getFire() {
    this.setState({
      fireGeoJson: [],
    });
    var test = this.props.region === "ea" ? "east-africa/" : "Madagascar/";
    test += this.state.month != null ? this.state.month + "_" : "";
    test += this.state.year;

    if (test == "") test = "test";
    var feux = test;

    const map = this.mapRef.current.leafletElement;
    const bounds = map.getBounds();

    console.log("map.getZoom():");
    console.log(map.getZoom());

    const temp = await this.actuallyGetFire(feux, bounds, map);

    if(this.props.region === "ea") {
      var test = "kenya/";
      test += this.state.month != null ? this.state.month + "_" : "";
      test += this.state.year;

      if (test == "") test = "test";
      var feux = test;

      const map = this.mapRef.current.leafletElement;
      const bounds = map.getBounds();

      console.log("map.getZoom():");
      console.log(map.getZoom());

      this.actuallyGetFire(feux, bounds, map);
    }

    // if(map.getZoom() > 6) {
    // 20 is the max request call we allow
  }

  async actuallyGetFire(feux, bounds, map) {
    axios
      .get("http://app.rfmrc-ea.org/api/check_geojson/" + feux)
      .then((result) => {
        var limite = 20;
        var range = Math.round(result.data / limite);

        console.log("Limite_before : " + limite);
        console.log("range_before : " + range);
        console.log("number : " + result.data);

        if (result.data > 0 && result.data < limite) {
          limite = result.data;
          range = 1;
        }

        console.log("Limite_after : " + limite);
        console.log("range_after : " + range);

        var debut = 0;
        var fin = 0;
        for (let index = 0; index < limite; index++) {
          fin = debut + range;
          this.getGeoJson(
            feux,
            bounds._southWest.lng,
            bounds._northEast.lng,
            bounds._southWest.lat,
            bounds._northEast.lat,
            debut,
            fin
          ).then((result) => {
            var temp = this.state.fireGeoJson;
            var weight = 1;
            if (map.getZoom > 8 && map.getZoom < 13) {
              weight = 3;
            }
            temp.push({
              key: feux + "_" + debut + "_" + fin + "_" + index,
              data: result.features,
              color: "red",
              weight: weight,
              opacity: 0.75,
              fillColor: "red",
              fillOpacity: 1,
            });
            this.setState({ fireGeoJson: temp });
            console.log(this.state.fireGeoJson);
          });
          debut = fin;
        }
      });
  }

  handleForecast(test) {
    this.setState({
      fireGeoJson: [],
    });
    if (test == "") test = "test";

    // Date
    var date = this.mapDateRef.current.value;
    console.log(date);
    if (!date) date = "2020-01-01";

    const map = this.mapRef.current.leafletElement;
    const bounds = map.getBounds();
    console.log("map.getZoom():");
    console.log(map.getZoom());
    this.getGeoJsonForecast("1", 42.5, 46.5, -14.3, -11.3).then((result) => {
      var temp = this.state.fireGeoJson;
      temp.push({
        key: "feux_11",
        data: result.features,
        color: "gray",
        weight: 1,
        opacity: 1,
        fillColor: "gray",
        fillOpacity: 0.3,
      });
      this.setState({ fireGeoJson: temp });
    });
    this.getGeoJsonForecast("2", 42.5, 46.5, -17.3, -14.3).then((result) => {
      var temp = this.state.fireGeoJson;
      temp.push({
        key: "feux_12",
        data: result.features,
        color: "green",
        weight: 1,
        opacity: 1,
        fillColor: "green",
        fillOpacity: 0.3,
      });
      this.setState({ fireGeoJson: temp });
    });
    this.getGeoJsonForecast("3", 42.5, 46.5, -20.3, -17.3).then((result) => {
      var temp = this.state.fireGeoJson;
      temp.push({
        key: "feux_13",
        data: result.features,
        color: "yellow",
        weight: 1,
        opacity: 1,
        fillColor: "yellow",
        fillOpacity: 0.3,
      });
      this.setState({ fireGeoJson: temp });
    });
    this.getGeoJsonForecast("4", 42.5, 46.5, -26, -20.3).then((result) => {
      var temp = this.state.fireGeoJson;
      temp.push({
        key: "feux_14",
        data: result.features,
        color: "orange",
        weight: 1,
        opacity: 1,
        fillColor: "orange",
        fillOpacity: 0.3,
      });
      this.setState({ fireGeoJson: temp });
    });
    this.getGeoJsonForecast("5", 46.5, 51, -14.3, -11.3).then((result) => {
      var temp = this.state.fireGeoJson;
      temp.push({
        key: "feux_15",
        data: result.features,
        color: "red",
        weight: 1,
        opacity: 1,
        fillColor: "red",
        fillOpacity: 0.3,
      });
      this.setState({ fireGeoJson: temp });
    });
  }

  async getGeoJson(
    feux,
    long_so,
    long_ne,
    lat_so,
    lat_ne,
    fileStart = null,
    fileLimit = null
  ) {
    try {
      var url =
        "http://app.rfmrc-ea.org/api/geojson/" +
        feux +
        "/" +
        long_so +
        "/" +
        long_ne +
        "/" +
        lat_so +
        "/" +
        lat_ne;
      if (fileLimit != null) url += "/" + fileStart + "/" + fileLimit;
      const response = await axios({
        method: "get",
        url: url,
      });
      return await Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getGeoJsonForecast(feux, long_so, long_ne, lat_so, lat_ne) {
    // Date
    var date = this.mapDateRef.current.value;
    console.log(date);
    if (!date) date = "2020-01-01";
    var dateTemp = date.split("-");
    date = dateTemp[1] + "_" + dateTemp[2] + "_" + dateTemp[0];

    try {
      const response = await axios({
        method: "get",
        url:
          "http://app.rfmrc-ea.org/api/forecast_geojson/FWI_" +
          date +
          "/" +
          feux +
          ".geojson",
      });
      return await Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // getGeoJson() {
  //   return axios.get('http://app.rfmrc-ea.org/api/geojson/'+feux+'/'
  //       +bounds._southWest.lng+'/'+bounds._northEast.lng+'/'
  //       +bounds._southWest.lat+'/'+bounds._northEast.lat
  //     ).then(result => {
  //       this.setState({
  //         // big
  //         feuxGeoJson : <GeoJSON
  //           key={"feux"}
  //           data={result.data.features}
  //           style={() => ({
  //             color: 'red',
  //             weight: 3,
  //             opacity: 1,
  //             fillColor: "red",
  //             fillOpacity: 1,
  //           })}
  //         />
  //       });
  //       console.log("geojson");
  //       console.log(this.state.feuxGeoJson);
  //     })
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.type == "4") {
      this.state.month = null;
    }

    if (this.state.regions === null && this.props.regionJson) {
      console.log(this.props.regionJson);

      const layerStyle = {
        color: "#4a83ec",
        opacity: 0.2,
        weight: 0.25,
        fillColor: "#1a1d62",
        fillOpacity: 0,
      };

      this.props.regionJson.then((data) => {
        const layers = [];
        const refs = [];

        for (let i = 0; i < data.length; i++) {
          const reference = createRef();
          refs.push(reference);

          layers.push(
            <GeoJSON
              ref={reference}
              key={"geojson" + i}
              data={data[i]}
              style={() => layerStyle}
              onmouseover={() => {
                this.handleMapMouseOver(i);
              }}
              onmouseout={() => {
                this.handleMapMouseOut(i);
              }}
              onclick={() => {
                this.focusOnRegion(i);
              }}
            ></GeoJSON>
          );
        }
        this.setState({
          regions: layers,
          regionLayerReferences: refs,
        });
      });
    }
  }

  render() {
    const histories = [
      {
        classe: "",
        link: "/",
        name: "Accueil",
        hide: "",
      },
      {
        classe: "active",
        link: "#",
        name: "Carte",
        hide: "hidden",
      },
    ];

    var menu = "";

    if (this.props.type == "1") {
      menu = (
        <div className="menu">
          <div className="form-group">
            <label htmlFor="date_fire"><FormattedMessage id="date" /> </label>
            <input
              ref={this.mapDateRef}
              type="date"
              id="date_fire"
              className="form-control"
              placeholder="Rechercher"
            />
          </div>
          {/* <div className="form-group">
          <label htmlFor="type_fire">Type : </label>
          <select ref={this.mapTypeRef} id="type_fire" className="form-control">
            <option value="fires_modis">MODIS</option>
            <option value="fires_terra">TERRA</option>
            <option value="fires_aqua">AQUA</option>
            <option value="fires_viirs">VIIRS</option>
            <option value="fires_viirs_snpp">VIIRS_SNPP</option>
            <option value="fires_viirs_noaa20">VIIRS_NOAA20</option>
          </select>
        </div> */}
          <div className="form-group">
            <input
              onChange={() => {
                this.toSatellite();
              }}
              type="checkbox"
              id="is_satellite"
            />
            <label htmlFor="is_satellite">. <FormattedMessage id="satellite" /></label>
          </div>
          <button
            onClick={() => {
              this.handleForecast("test");
            }}
            className="btn btn-primary"
          >
            <FormattedMessage id="launch" />
          </button>
        </div>
      );
    } else if (this.props.type == "2") {
      menu = (
        <div className="menu">
          <div className="form-group">
            <label htmlFor="date_fire"><FormattedMessage id="date" /> </label>
            <input
              ref={this.mapDateRef}
              type="date"
              id="date_fire"
              className="form-control"
              placeholder="Rechercher"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type_fire"><FormattedMessage id="type" /> : </label>
            <select
              ref={this.mapTypeRef}
              id="type_fire"
              className="form-control"
            >
              <option value="fires_modis">MODIS</option>
              <option value="fires_terra">TERRA</option>
              <option value="fires_aqua">AQUA</option>
              <option value="fires_viirs">VIIRS</option>
              <option value="fires_viirs_snpp">VIIRS_SNPP</option>
              <option value="fires_viirs_noaa20">VIIRS_NOAA20</option>
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={() => {
                this.toSatellite();
              }}
              type="checkbox"
              id="is_satellite"
            />
            <label htmlFor="is_satellite">. <FormattedMessage id="satellite" /></label>
          </div>
          <button
            onClick={() => {
              this.updateFireOverlay();
            }}
            className="btn btn-primary"
          >
            <FormattedMessage id="launch" />
          </button>
        </div>
      );
    } else if (this.props.type == "3") {
      menu = (
        <div className="menu">
          <div className="form-group">
            <label htmlFor="type_fire"><FormattedMessage id="year" /> : </label>
            <select
              value={this.state.year}
              onChange={this.handleYearChange}
              id="type_fire"
              className="form-control"
            >
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="type_fire"><FormattedMessage id="month" /> : </label>
            <select
              value={this.state.month}
              onChange={this.handleMonthChange}
              id="type_fire"
              className="form-control"
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">Mai</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">Semptember</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={() => {
                this.toSatellite();
              }}
              type="checkbox"
              id="is_satellite"
            />
            <label htmlFor="is_satellite">. <FormattedMessage id="satellite" /></label>
          </div>
          <button
            onClick={() => {
              this.getFire();
            }}
            className="btn btn-primary"
          >
            <FormattedMessage id="launch" />
          </button>
        </div>
      );
    } else {
      menu = (
        <div className="menu">
          <div className="form-group">
            <label htmlFor="type_fire"><FormattedMessage id="year" /> : </label>
            <select
              value={this.state.year}
              onChange={this.handleYearChange}
              id="type_fire"
              className="form-control"
            >
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={() => {
                this.toSatellite();
              }}
              type="checkbox"
              id="is_satellite"
            />
            <label htmlFor="is_satellite">. <FormattedMessage id="satellite" /></label>
          </div>
          <button
            onClick={() => {
              this.getFire();
            }}
            className="btn btn-primary"
          >
            <FormattedMessage id="launch" />
          </button>
        </div>
      );
    }

    return (
      <div>
        {/* <History link={histories} title="Carte" /> */}
        <div className="content titled-content map">
          <section className="carte">
            <div className="row">
              <div className="col-md-12 map-div">
                {menu}
                <Map
                  center={this.props.center}
                  zoom={this.props.zoom}
                  ref={this.mapRef}
                >
                  <TileLayer
                    url={this.state.tiles.url}
                    attribution={this.state.tiles.attribution}
                  />
                  {this.state.fire.map((layer, idx) => (
                    <ImageOverlay
                      key={"image_" + idx}
                      url={layer.link}
                      bounds={layer.bounds}
                      ref={layer.ref}
                    />
                  ))}
                  {this.state.regions}
                  {this.state.feuxGeoJson}
                  {/* <div>
                  {this.state.part1}
                  {this.state.part2}
                  {this.state.part3}
                  {this.state.part4}
                  {this.state.part5}
                  {this.state.part6}
                  {this.state.part7}
                  {this.state.part8}
                  </div> */}
                  {this.state.fireGeoJson.map((feux) => (
                    <GeoJSON
                      key={feux.key}
                      data={feux.data}
                      style={() => ({
                        color: feux.color,
                        weight: feux.weight,
                        opacity: feux.opacity,
                        fillColor: feux.fillColor,
                        fillOpacity: feux.fillOpacity,
                      })}
                    />
                  ))}
                  {/* {this.state.fireGeoJson} */}
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
export default withRouter(Carte);