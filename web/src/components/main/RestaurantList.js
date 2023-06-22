import React from 'react'

import "../../styles/RestaurantList.css";

function RestaurantList({ 
  restaurantList, 
  setSelectRestaurant,
  setOpenRestaurant
}) {
  return (
    <div id="resrestaurant-list">
      <ul>
        {restaurantList.map((restaurant, index) => 
          <li key={index} onClick={() => {
            setSelectRestaurant(restaurant);
            setOpenRestaurant(true);
          }}>
            <div className="thumbnail">
              <img src={restaurant.img} alt={`${restaurant.name}-thumbnail`}/>
            </div>
            <div className="text-container">
              <h3 className='name'>{restaurant.name}</h3>
              <p className='star'>5.0/{restaurant.star}</p>
              <p className='address'>{restaurant.address}</p>
            </div>
            <div></div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default RestaurantList