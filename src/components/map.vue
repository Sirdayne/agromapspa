<template lang="pug">
#map
</template>

<script>

import L from 'leaflet'
import 'leaflet-providers'
import 'leaflet/dist/leaflet.css'

import {EventBus} from '@/services/EventBus'
import http from '@/services/httpQuery.js'
import cacheLoader from '@/mixins/cacheLoader.js'

export default {
  mixins: [
    cacheLoader
  ],
  data () {
    return {
      map: null,
      leafletFields: [],
      fields: new L.FeatureGroup(),
    }
  },
  computed: {
    organization() {
      return this.$store.getters.getOrganization
    },
  },
  mounted(){
    this.initMap()
    this.getLeafletFields()
  },
  methods: {
    getLeafletFields() {
      let leafletFields = this.getCache(`leafletFields/${this.organization}`)
      if (leafletFields) {
        this.leafletFields = leafletFields
        this.drawFields()
      } else {
        this.getRemote()
      }
    },
    getRemote() {
      http.get(`/leafletFields/${this.organization}`).then(data => {
        if (data) {
          this.leafletFields = data
          this.setCache(`leafletFields/${this.organization}`, data)
          this.drawFields()
        }
      })
    },
    initMap() {
      this.drawMap()
    },
    drawMap() {
      if (this.map) this.map.remove()
      this._addLayers()
    },
    _addLayers() {
      let attribution = 'AgroStream';
      let osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: attribution});
      let satellite = L.
      tileLayer.provider('Esri.WorldImagery', {attribution: attribution});
      let baseLayers = { "Спутник": satellite, "OpenStreetMaps": osm};
      this.map = L.map('map', {editable: true, layers: [osm]}).setView([53.2858, 69.4466], 11);
      L.control.layers(baseLayers).addTo(this.map);
    },
    removeFields() {
      if (this.map) {
        this.map.removeLayer(this.fields);
      }
    },
    drawFields() {
      this.removeFields()
      this.fields = new L.FeatureGroup();
      let polygons = [];
      if (this.leafletFields && this.leafletFields.length) {
        this.leafletFields.forEach(field => {
          let latLng = JSON.parse(field.kml);
          let polygon = L.polygon(latLng, {color: '#fff', fillColor: 'rgba(0,0,0,0.5)', weight: 1, fillOpacity: 0.5})
          let thisColor = 'rgba(0,0,0,0.5)'
          polygon.label = field.fieldName;
          polygon.fieldId = field.fieldId;
          polygon.on('mouseover', function () {this.setStyle({fillColor: '#fff'})})
          polygon.on('mouseout', function () {this.setStyle({fillColor: thisColor})})
          polygon.on('click', function () {

          })
          this.fields.addLayer(polygon);
          polygons.push(polygon);
        });
        this.map.addLayer(this.fields);

        if (polygons.length) {
          this.map.setView(this.fields.getBounds().getCenter(), 11);
          this.fields.eachLayer(polygon => {
            polygon.bindTooltip(polygon.label, {
              permanent: false,
              direction: "center",
              opacity: 1,
              className: 'tooltip-transparent'
            })
          })
        }
      }
    },
  }
}
</script>

<style lang="stylus">

</style>
