/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJtc3Ryb20iLCJhIjoiY2swbDU4eWtpMHE5NTNucG54MDF6bzB5MCJ9.P3iAVjwudDuRL6iOKFwCuQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/armstrom/ck0l5cbxv6wfu1ck0sapajpwt',
  scrollZoom: false
  //   center: [-118.113491, 34.111745],
  //   zoom: 10,
  //   intractive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create Marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p> `)
    .addTo(map);

  // Extends map bounds  to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
