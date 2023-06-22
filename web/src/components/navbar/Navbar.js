import React from 'react'

import styles from "./Navbar.module.css";

function Navbar({ setPageId, pageId }) {
  const mapIconClickListener = () => {
    if (pageId !== "map") {
      setPageId("map");
    }
    else {
      setPageId("main");
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logoMap} onClick={mapIconClickListener}>
        <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.6429 5.41516C18.2679 5.41516 9.78572 12.6027 9.78572 23.7187C9.78572 30.8169 15.2545 39.1652 26.1697 48.7634C26.9732 49.4777 28.3348 49.4777 29.1384 48.7634C40.0313 39.1652 45.5 30.8169 45.5 23.7187C45.5 12.6027 37.0179 5.41516 27.6429 5.41516ZM18.0223 28.8303C20.6786 26.7544 24.0045 25.5044 27.6429 25.5044C31.2813 25.5044 34.6071 26.7544 37.2634 28.8303C35.3438 32.1562 31.7723 34.433 27.6429 34.433C23.5134 34.433 19.942 32.1562 18.0223 28.8303ZM27.6429 14.3437C30.0982 14.3437 32.1072 16.3527 32.1072 18.808C32.1072 21.2634 30.0982 23.2723 27.6429 23.2723C25.1875 23.2723 23.1786 21.2634 23.1786 18.808C23.1786 16.3527 25.1875 14.3437 27.6429 14.3437Z" fill="white"/>
        </svg>
      </div>
        
      <div className={styles.logoWrapper}>
          <img src="logo.png" alt='logo-png'/>
      </div>

      <div className={styles.searchWrapper}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.755 14.255H14.965L14.685 13.985C15.665 12.845 16.255 11.365 16.255 9.755C16.255 6.165 13.345 3.255 9.755 3.255C6.165 3.255 3.255 6.165 3.255 9.755C3.255 13.345 6.165 16.255 9.755 16.255C11.365 16.255 12.845 15.665 13.985 14.685L14.255 14.965V15.755L19.255 20.745L20.745 19.255L15.755 14.255ZM9.755 14.255C7.265 14.255 5.255 12.245 5.255 9.755C5.255 7.265 7.265 5.255 9.755 5.255C12.245 5.255 14.255 7.265 14.255 9.755C14.255 12.245 12.245 14.255 9.755 14.255Z" fill="black"/>
        </svg>
      </div>
    </nav>
  )
}

export default Navbar