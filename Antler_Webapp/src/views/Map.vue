<template>
  <div class="GMap"/>
</template>


<script>
import MarkerClusterer from '@google/markerclusterer';
import axios from 'axios';

import gmapsInit from '../utils/gmaps';

const places = [];

export default {
	name: "GMap",

	methods: {

		async loadItems() {
			var response = await axios.get(this.$HostName + "/list/DEVICE?token=" + this.$AdminToken);
      response.data.forEach(element => {
        var place = {
          lat: element.latitude,
          lng: element.longitude,
          id: element.id,
          hostName: element.hostName,
          deviceName: element.deviceName,
          status: element.status
        }
        if (place.lat != null) {
          places.push({
            place
          });
        }
			});
		}
	},

	async mounted() {
		try {

			await this.loadItems();
			var socket = require("../../socket/websocket.js").socket;

			socket.on("device-disconnected",(message)=>{
        this.loadItems();
      })
      socket.on("new-connection",(message)=>{
        this.loadItems();
      })

			const google = await gmapsInit();

			const geocoder = new google.maps.Geocoder();
			const map = new google.maps.Map(this.$el);

			geocoder.geocode({ address: "Lebanon" }, (results, status) => {
				if (status !== "OK" || !results[0]) {
					throw new Error(status);
				}
				map.setCenter(results[0].geometry.location);
				map.fitBounds(results[0].geometry.viewport);
			});

			const markerClickHandler = (marker) => {
				map.setZoom(13);
				map.setCenter(marker.getPosition());
			};

			//  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      

  
      var pin = {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
          path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
          anchor: new google.maps.Point(12,17),
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "white",
          scale: 2
      };

      var markers = []; 

      places.forEach((place) => {
        var place = place.place;
        var location  = new google.maps.LatLng(place.lat, place.lng);

        if(place.status == 0) {
          pin.fillColor = "#FF0000";
        } else {
          pin.fillColor = "#00FF00";
        }
				const marker = new google.maps.Marker({ 
          position: location,
          title: place.id,
          icon: pin,
          visible: true
        });

        marker.description = new google.maps.InfoWindow({
          content:"Device Name: " + place.deviceName + "<br>Host: " + place.hostName + "<br>Status: " + place.status
        });
        google.maps.event.addListener(marker, 'click', function(){
          this.description.setPosition(this.getPosition());
          this.description.open(map);
        });

        marker.setMap(map);
        markers.push(marker);
      });

			// eslint-disable-next-line no-new
			new MarkerClusterer(map, markers, {
				imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	},

};

</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.GMap {
  width: 100vw;
  height: 100vh;
}
</style>