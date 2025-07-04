// src/components/GooglePlacesInput.js
import React, { useEffect, useRef } from 'react';

const GooglePlacesInput = ({ value, onPlaceSelected }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = 'google-maps-new-places';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBkWEHcVFLbR428h5CwvWxJU8G2xIYIcqM&libraries=places&v=weekly`;
      script.async = true;
      script.onload = () => {
        initAutocomplete();
      };
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      const autocompleteEl = document.createElement('gmp-place-autocomplete');
      autocompleteEl.setAttribute('placeholder', 'Enter location');
      autocompleteEl.setAttribute('style', 'width: 100%; height: 40px; padding: 8px; font-size: 16px;');

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(autocompleteEl);

      autocompleteEl.addEventListener('gmp-placeautocomplete-placeview', (event) => {
        const place = event.detail;
        const address = place?.formattedAddress || place?.displayName || '';
        onPlaceSelected(address);
      });
    }
  }, [onPlaceSelected]);

  return <div ref={containerRef} />;
};

export default GooglePlacesInput;
