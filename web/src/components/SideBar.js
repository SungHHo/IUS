import React, { useEffect, useRef, useState } from 'react'
import Auth from './auth/Auth';

import "../styles/SideBar.css";

let stid = null;

function SideBar ({ openSideBar }) {
    const sideBarRef = useRef();
    const [auth, setAuth] = useState();

    const animate = () => {
      clearTimeout(stid);
      
      if (openSideBar) {
        stid = setTimeout(() => {
          sideBarRef.current.classList.add('open');
        }, 200);
      }
      else {
        sideBarRef.current.classList.remove('open');
      }
    };

    useEffect(() => {
      animate();
    });

    const openAuth = () => {
      const authComponent = <Auth />;
      setAuth(authComponent);
    }

    return (
      <section ref={sideBarRef} id='sidebar-container'>
        <div className='background'></div>
        <ul >
          <li onClick={openAuth}>sign in</li>
        </ul>

        {auth ?? <></>}
      </section>
    )
}

export default SideBar;
