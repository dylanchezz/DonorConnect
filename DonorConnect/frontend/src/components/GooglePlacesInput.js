// src/components/GooglePlacesInput.js
import React, { useEffect, useRef } from 'react';

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
    });
  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search hospitals in Kenya"
      defaultValue={value}
      style={{
        width: '100%',
        height: '40px',
        padding: '8px',
        fontSize: '16px',
        marginBottom: '1rem'
      }}
    />
  );
};

export default GooglePlacesInput;
