import React, { useState } from 'react'

import styles from "./Comment.module.css";
import env from '../../utils/var';

const Comment = ({ selectRestarant, setPageId }) => {
  const [message, setMessage] = useState('');

  const submitListener = (e) => {
    e.preventDefault();

    fetch(`${env.API_URL}/add_review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? ''
      },
      body: JSON.stringify({
        name: selectRestarant.name,
        address: selectRestarant.address,
        content: message
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.blur}></div>

      <div className={styles.iconContainer}>
          <img src="logo.png" alt="logo" />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.thumbnailContainer}>
          <img src={selectRestarant.img ?? env.dummy_image_url} alt='thumbnail'/>
          <h1>{selectRestarant.name}</h1>
        </div>

        <form onSubmit={submitListener}>
          <div className={styles.inputContainer}>
              <label htmlFor="message">Message</label>
              <input className={styles.input} name='message' type="text" placeholder="댓글 남기기" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.submit}>댓글 남기기</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Comment