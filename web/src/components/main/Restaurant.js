import React, { useEffect, useRef } from 'react'

import "../../styles/Restaurant.css";

function Restaurant({ selectRestaurant }) {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(selectRestaurant.x, selectRestaurant.y);
    const mapOptions = {
      center: location,
      scaleControl: true,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [selectRestaurant]);
  return (
    <section id="select-restaurant">
      <img src={selectRestaurant?.thumbnailUrl} alt="thmubnail"/>

      <div class="text-container">
        <h1>{selectRestaurant?.name}</h1>
        <p>{selectRestaurant?.address}</p>
      </div>
      
      <section>
      <div 
          id="map" 
          ref={mapElement}
          style={{ width: "100%", height: "100%"  }}
        />
      </section>
    </section>
  )
}

export default Restaurant