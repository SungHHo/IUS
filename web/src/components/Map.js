import { useEffect, useRef } from 'react'

import "../styles/Map.css";

const Map = ({ latitude, longitude }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
      center: location,
      zoom: 17,
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

    // naver.maps.Event.addDOMListener(mapElement.current, 'mouseup', () => {
    //   console.log("click");
    // });
  }, []);

  return <div ref={mapElement} style={{ minHeight: '400px' }} />;

  }
  
export default Map;