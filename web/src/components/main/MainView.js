import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import RestaurantList from './RestaurantList';
import Adver from './Adver';
import MapView from './MapView'
import Restaurant from './Restaurant';

import "../../styles/MainView.css";

const dummy = [];
for (let i = 0 ; i < 20 ; i++) {
  dummy.push({
    name: "마포갈매기",
    address: "서울특별시 마포구 동교동 155-27",
    thumbnailUrl: "https://taghere.s3.ap-northeast-2.amazonaws.com/642665c713b44f29ac6af697/642665c713b44f29ac6af697_1681455070923-thum.png",
    star: 4.5,
    x: 37.556602,
    y: 126.925718
  });
}

function MainView() {
  const { latitude, longitude } = useParams({ latitude: 37.541, longitude: 126.986});
  const [openMap, setOpenMap] = useState(false);
  const [query, setQuery] = useState('');
  const [restaurantList, setRestaurantList] = useState([]); 
  const [selectRestaurant, setSelectRestaurant] = useState();
  const [openRestaurant, setOpenRestaurant] = useState(false);

  useEffect(() => {
    setRestaurantList(dummy);
    // const getNearestRestaurant = async () => {
    //   const response = await fetch(`http://localhost:5000/api/v1/restaurant?query=${query}&lati=${latitude}&long=${longitude}`);
    //   const data = await response.json();

    //   return data;
    // }

    // getNearestRestaurant().then(data => setRestaurantList(data));
  }, [query, selectRestaurant]);

  return (
    <main id="main">
      <section className='search-container'>
        <SearchBar />
      </section>

      <section className="middle-container">
        <div>Hello, user!</div>
        <div class="map-icon">
          <span>Map</span>
        </div>
      </section>

      <section className='list-container'>
        <RestaurantList
          restaurantList={restaurantList}
          setSelectRestaurant={setSelectRestaurant}
        />
      </section>

      <section className='ad-container'>
        <Adver />
      </section>
    </main>
  )
}

export default MainView

// {/* 
// />

// <Adver />

// {/* <div class="ovrelay">
//   <MapView 
//     latitude={latitude}
//     longitude={longitude}
//     radius={300} 
//     restaurantList={restaurantList}  
//     />

//   <Restaurant data={selectRestaurant} />
// </div> */}}