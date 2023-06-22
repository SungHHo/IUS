import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';
import Adver from './Adver';
import MapView from './MapView'
import Restaurant from './Restaurant';

import "../../styles/MainView.css";

const DEFAULT_DISTANCE = 300;

function MainView() {
  const mainRef = useRef(null);
  const { latitude, longitude } = useParams();
  const [openMap, setOpenMap] = useState(false);
  const [query, setQuery] = useState('');
  const [restaurantList, setRestaurantList] = useState([]); 
  const [selectRestaurant, setSelectRestaurant] = useState();
  const [openRestaurant, setOpenRestaurant] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    setRestaurantList([]);
    const getNearestRestaurant = async () => {
      const response = await fetch(`http://localhost:3030/api/restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          x: 35.9071971,
          y: 128.613,
          distance: DEFAULT_DISTANCE
        })
      });
      const data = await response.json();

      return data;
    }

    if (openMap) setSelectRestaurant(undefined);

    getNearestRestaurant().then(data => setRestaurantList(data));
  }, [query, openMap, selectRestaurant, openRestaurant, selectRestaurant]);

  return (
    <main ref={mainRef} id="main">
      <section className='search-container'>
        <SearchBar setQuery={setQuery} />
      </section>

      <section className="middle-container">
        <div>근처의 식당들입니다.</div>
        <div onClick={() => setOpenMap(!openMap)} className="map-icon">
          <img src="map.png" alt=""/>
        </div>
      </section>

      <section className='list-container'>
        <RestaurantList
          restaurantList={restaurantList}
          setSelectRestaurant={setSelectRestaurant}
          setOpenRestaurant={setOpenRestaurant}
        />
      </section>

      <section className='ad-container'>
        <Adver />
      </section>

      <div ref={overlayRef} className={"overlay " + (openMap ? "open map" : "" + (openRestaurant ? "open restaurant" : ""))} >
        {openMap && 
          <MapView 
          // latitude={latitude ?? 37.541}
          // longitude={longitude ?? 126.986}
          latitude={latitude ?? 35.9071971} 
          longitude={longitude ?? 128.613}
          radius={DEFAULT_DISTANCE} 
          restaurantList={restaurantList}  
          />
        }

        {selectRestaurant && <Restaurant selectRestaurant={selectRestaurant} />}

        <div className={'blur' + ((openMap || openRestaurant)? "active" : "")}></div>

        <div onClick={() => {
          setOpenMap(false);
          setOpenRestaurant(false);
        }} className='close-btn'>닫기</div>
      </div>
    </main>
  )
}

export default MainView

// {/* 
// />

// <Adver />

// {/* <div class="ovrelay">


//   <Restaurant data={selectRestaurant} />
// </div> */}}