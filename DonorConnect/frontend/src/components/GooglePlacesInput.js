import React, { useEffect, useRef } from 'react';

<<<<<<< HEAD
const GooglePlacesInput = ({ value, onPlaceSelected }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Maps JavaScript API not loaded.');
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment'],
      componentRestrictions: { country: 'KE' }
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const address = place?.formatted_address || place?.name || '';
      onPlaceSelected(address);
=======
const loadGoogleMapsScript = (callback) => {
  const existingScript = document.getElementById('google-maps-script');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkWEHcVFLbR428h5CwvWxJU8G2xIYIcqM&libraries=places';
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

const GooglePlacesInput = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!window.google || !inputRef.current) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'], // restricts to addresses
        componentRestrictions: { country: 'ke' }, // optional: restrict to Kenya
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (!place || !place.formatted_address) return;
        onPlaceSelected(place.formatted_address);
      });
>>>>>>> 1acb2ba4904282f0985557fa0c94710981613e89
    });
  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
<<<<<<< HEAD
      placeholder="Search hospitals in Kenya"
      defaultValue={value}
=======
      placeholder="Enter a location"
>>>>>>> 1acb2ba4904282f0985557fa0c94710981613e89
      style={{
        width: '100%',
        height: '40px',
        padding: '8px',
        fontSize: '16px',
<<<<<<< HEAD
        marginBottom: '1rem'
=======
        marginBottom: '1rem',
>>>>>>> 1acb2ba4904282f0985557fa0c94710981613e89
      }}
    />
  );
};

export default GooglePlacesInput;
