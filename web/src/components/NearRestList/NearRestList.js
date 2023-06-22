import React from 'react';

import styles from "./NearRustList.module.css";
import { getDistance } from '../../utils/utils';
import env from '../../utils/var';

const Tag = ({ tagName }) => <div className={styles.tag}>{tagName}</div>

const RestItem = ({ setPageId, setSelectRestaurant, restaurant }) => (
    <div className={styles.item} onClick={() => {
        setSelectRestaurant(restaurant);
        setPageId("select");
        }}>
        <div className={styles.overline}></div>

        <div className={styles.itemWrapper}>
            <div className={styles.infoContainer}>
                <div className={styles.headerContainer}>
                    <b>{restaurant.name}</b>

                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5714 15.27L16.9476 19L15.2556 11.97L20.8889 7.24L13.4706 6.63L10.5714 0L7.67222 6.63L0.253967 7.24L5.8873 11.97L4.19524 19L10.5714 15.27Z" fill="#FFAA2C"/>
                    </svg>

                    <span>{restaurant.star.toFixed(1)}/5.0</span>
                </div>

                <ul className={styles.tagList}>
                    {restaurant.tags?.map((tag, idx) => <Tag key={idx} tagName={tag} />)}
                </ul>
            </div>

            <div className={styles.thumbnail}>
                <img src={restaurant.image ?? env.dummy_image_url} alt={restaurant.name} />
            </div>
        </div>
    </div>    
)

const TermItem = ({ term }) => (
    <div className={styles.termItem}>
        <span>{(term !== -1 ? `${term}m 이내` : "멀리")}</span>
    </div>
);

function NearRestList({
    lati,
    long,
    setPageId,
    setSelectRestaurant, 
    radius, 
    restaurants
}) {
    const term = [100, 200, 300];
    let prevDistance = undefined;

  return (
    <section className={styles.container}>
        <div className={styles.section}>
            <h2 className={styles.current}>
            현재
            </h2>

            <div className={styles.distance}>
                <div>반경 <span className={styles.yellow}>{radius}m</span></div>
                <div>{"대구 "}<span className={styles.bold}>{"북구 "}</span>{"맛집"}들</div>
            </div>
        </div>

        <ul>
            {term?.map((t, idx) => {
                if (idx > 0) prevDistance = term[idx - 1];

                const head = (<TermItem key={`head-${idx}`} term={t} />);
                const result = restaurants.map((res, idx) => {
                    const distance = getDistance(res.x, res.y, lati, long);

                    if ((!prevDistance && distance < t))
                        return <RestItem setPageId={setPageId} setSelectRestaurant={setSelectRestaurant} key={idx} restaurant={res} />;
                    else if (prevDistance && distance < t && distance >= prevDistance) 
                        return <RestItem setPageId={setPageId} setSelectRestaurant={setSelectRestaurant} key={idx} restaurant={res} />;
                })
                
                if (idx === 0) prevDistance = t;
                return [head, ...result];
            })}
        </ul>
    </section>
  )
}

export default NearRestList