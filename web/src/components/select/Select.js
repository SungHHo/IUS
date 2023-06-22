import React from 'react'

import styles from "./Select.module.css";
import env from '../../utils/var';

function Select({
  selectRestarant
}) {
  return (
    <div className={styles.container}>
      <div className={styles.blur}></div>

      <div className={styles.thumbnailContainer}>
        <img src={selectRestarant?.img ?? env.dummy_image_url} alt="thumbnail" />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.overlay}></div>

        <section className={styles.wrapper}>
          <div className={styles.infoContainer}>
            <h1 className={styles.header}>{selectRestarant.name}</h1>

            <h3 className={styles.phone}>{selectRestarant.phone}</h3>
            <h3 className={styles.address}>{selectRestarant.address}</h3>
          </div>

          <section id="select-menus">
            <h1>메뉴들</h1>
            {/* <ul>
              {selectRestarant.menu?.map((menu, idx) => (
                <li key={`menu-${idx}`}>
                  {menu}
                </li>
              ))}
            </ul> */}
            <img className={styles.image} src="https://cdn.discordapp.com/attachments/1120924891441549374/1121557332938211408/IMG_2917.png"/>
          </section>

          <section>
            <h1>댓글들</h1>

            <ul>
              {selectRestarant.comment?.map((comment, idx) => (
                <li key={`comments-${idx}`}>
                  {comment}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </div>
  )
}

export default Select