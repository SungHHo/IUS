import React, { useEffect, useRef, useState } from 'react'
import Auth from './auth/Auth';

import "../styles/SideBar.css";


function SideBar ({ openSideBar }) {
    const sideBarRef = useRef();
    const [auth, setAuth] = useState();

    const animate = () => {      
      if (openSideBar) {
        sideBarRef.current.classList.add('open');
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
          <li className='signIn' onClick={openAuth}>sign in</li>
        </ul>

        {auth ?? <></>}
      </section>
    )
}

export default SideBar;
