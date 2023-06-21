import "../styles/Register.css";
import NavBar from "./NavBar";

export default function Register() {
    return (
        <>
            <NavBar/>
            <div className="register_container">
                <h2>로그인</h2>
                
                <div class="outBox">
                    <div class="inputBox">
                        <input onChange={e => {
                            if (!e.target.value == '')
                                e.target.parentNode.parentNode.classList.add("existence");
                            else 
                                e.target.parentNode.parentNode.classList.remove("existence");
                        }} type="text" id="id" name=""/>
                        <label for="id">아이디를 입력해주세요.</label>
                    </div>
                </div>

                <div className="outBox">
                    <div class="inputBox">
                            <input onChange={e => { 
                                if (!e.target.value == '')
                                    e.target.parentNode.parentNode.classList.add("existence");
                                else 
                                    e.target.parentNode.parentNode.classList.remove("existence");
                            }} type="text" id="pw" name=""/>
                        <label for="pw">비밀번호를 입력해주세요.</label>
                    </div>
                </div>
            </div>
        </>
    );
};