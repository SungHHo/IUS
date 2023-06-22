import { useState } from "react";
import "../styles/Register.css";

const URL = "http://localhost:3030/api/register";

export default function Register() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const submitListener = (e) => {
        e.preventDefault();

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                pw: pw
            })
        })
        .then(res => res.json())
        .then(data => {

        });
    }

    return (
        <form onSubmit={submitListener}>
            <div className="register_container">
                <h2>로그인</h2>
                
                <div className="outBox">
                    <div className="inputBox">
                        <input onChange={e => {
                            if (!e.target.value === '')
                                e.target.parentNode.parentNode.classList.add("existence");
                            else 
                                e.target.parentNode.parentNode.classList.remove("existence");

                            setId(e.target.value);
                        }} type="text" id="id" name=""/>
                        <label for="id">아이디를 입력해주세요.</label>
                    </div>
                </div>

                <div className="outBox">
                    <div className="inputBox">
                            <input onChange={e => { 
                                if (!e.target.value == '')
                                    e.target.parentNode.parentNode.classList.add("existence");
                                else 
                                    e.target.parentNode.parentNode.classList.remove("existence");

                                setPw(e.target.value);
                            }} type="text" id="pw" name=""/>
                        <label for="pw">비밀번호를 입력해주세요.</label>
                    </div>
                </div>
            </div>
        </form>
    );
};