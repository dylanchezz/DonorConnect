import React, { useEffect, useRef } from 'react';

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
    });
  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter a location"
      style={{
        width: '100%',
        height: '40px',
        padding: '8px',
        fontSize: '16px',
        marginBottom: '1rem',
      }}
    />
  );
};

export default GooglePlacesInput;
