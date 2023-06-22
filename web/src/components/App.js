import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import NearRestList from "./NearRestList/NearRestList";
import Auth from "./auth/Auth";
import MapView from "./map-view/MapView";
import UtilButton from "./util-button/UtilButton";
import env from "../utils/var";
import Comment from "./comment/Comment";

import styles from "./App.module.css";
import Select from "./select/Select";


const getFetchedRestaurants = (
  lati,
  long,
  setRestaurants
) => 
  fetch(`${env.API_URL}/restaurant`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        x: lati,
        y: long,
        distance: env.DEFAULT_DISTANCE
    })
  })
  .then((res) => res.json())
  .then((data) => setRestaurants(data));

function App() {
  let { lati, long } = useParams();

  if (!lati) lati = 35.9071971; 
  if (!long) long = 128.613;

  /**
   * @typedef {"main" | "map" | "auth" | "form" | "select"} PageId
   * @type {[PageId, (PageId) => void]}
   */
  const [ pageId, setPageId ] = useState("main");
  const [ auth, setAuth ] = useState(localStorage.getItem("token") !== null);
  const [ restaurants, setRestaurants ] = useState([]);
  const [ selectRestarant, setSelectRestaurant ] = useState(undefined);

  useEffect(() => {
    setAuth(localStorage.getItem("token") !== null)

    getFetchedRestaurants(lati, long, setRestaurants);
  }, [auth, pageId]);

  return (
    <div className={styles.app}>
      <Navbar setPageId={setPageId} pageId={pageId} />

      <main className={styles.main}>
        {pageId === "map" && 
        <MapView
          lati={lati}
          long={long}
          radius={env.DEFAULT_DISTANCE}
          restaurants={restaurants}
          setRestaurants={setRestaurants}
        />}

        {pageId === "main" &&
        <NearRestList
          lati={lati}
          long={long}
          setPageId={setPageId}
          setSelectRestaurant={setSelectRestaurant}
          radius={env.DEFAULT_DISTANCE}
          restaurants={restaurants} 
        />}
      
      </main>

      {(selectRestarant || !auth) && <UtilButton
        auth={auth}
        setPageId={setPageId} 
        pageId={pageId}
      />}
      
      {pageId === "auth" && <Auth setAuth={setAuth} setPageId={setPageId}/>}
      {(pageId === "form")&& <Comment selectRestarant={selectRestarant} setPageId={setPageId}/>}
      {(pageId === "select") && <Select setPageId={setPageId} selectRestarant={selectRestarant} />}
    </div>
  );
}

export default App;
