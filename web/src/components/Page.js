import { useState } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import MainView from './main/MainView';

import '../styles/Page.css';

function Page() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div id="container">
      <NavBar setOpenSideBar={setOpenSideBar}/>

      <MainView />

      <SideBar openSideBar={openSideBar}/>
    </div>
  );
}

export default Page;