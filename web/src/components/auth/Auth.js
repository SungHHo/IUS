import React, { useState } from 'react'

import styles from "./Auth.module.css";
import env from '../../utils/var';

function Auth({ setAuth, setPageId }) {
    const [modeSignIn, setModeSignIn] = useState(true);
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');
    const [wrongMessage, setWrongMessage] = useState('');

    const submitListener = (e) => {
        e.preventDefault();

        let API_CALL = env.API_URL;
        if (modeSignIn) API_CALL += "/login";
        else API_CALL += "/register";

        fetch(API_CALL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                pw: pw,
                nickname: nickname
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!modeSignIn) {
                if ("failed" in data) {
                    setWrongMessage(data.msg);
                }
                else if ("success" in data) {
                    setModeSignIn(true);
                }
            }
            else {
                if ("failed" in data) {
                    setWrongMessage(data.msg);
                }
                else {
                    const { token } = data;
                    localStorage.setItem("token", token);
                    setAuth(true);
                    setPageId("main");
                }
            }
        });

    }

  return (
    <div className={styles.container}>
        <div className={styles.blur}></div>
        
        <div className={styles.iconContainer}>
            <img src="logo.png" alt="logo" />
        </div>

        <div className={styles.formContainer}>
            <h1 className={modeSignIn ? styles.loginIn : styles.loginUp}>Login</h1>

            <form onSubmit={submitListener}>
                {modeSignIn === false && 
                <div className={styles.inputContainer}>
                    <label htmlFor="nickname">Nickname</label>
                    <input className={styles.input} name='nickname' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>}
                <div className={styles.inputContainer}>
                    <label htmlFor="id">ID</label>
                    <input className={styles.input} name='id' type="text" placeholder="daebob" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                
                <div className={styles.inputContainer}>
                    <label htmlFor="pw">Password</label>
                    <input className={styles.input} name='pw' type="password" placeholder="******" value={pw} onChange={(e) => setPw(e.target.value)} />
                </div>
                
                <div className={styles.buttonContainer}>
                    {wrongMessage && <p className={styles.error}>{wrongMessage}</p>}

                    <button type='submit' className={modeSignIn ? styles.buttonIn : styles.buttonUp}>
                        {modeSignIn ? "Sign In" : "Sign Up"}
                    </button>

                    <p onClick={() => setModeSignIn(!modeSignIn)} className={modeSignIn ? styles.modeUp : styles.modeIn}>
                        {modeSignIn ? "Want to Sign Up?" : "Go Sign In"}
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Auth