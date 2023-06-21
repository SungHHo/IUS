import { useState } from "react";
import "../styles/Navbar.css"

export default function NavBar({ setOpenSideBar }) {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        const toggle = !active;
        setActive(toggle);
        setOpenSideBar(toggle);
    }

    return (
        <nav>
            <div className="nav-top">
                <div></div>
                <div onClick={clickHandler} className={"icon-container " + (active ? "active" : "")}>
                    <div className="menu-icon-top"></div>
                    <div className="menu-icon-middle"></div>
                    <div className="menu-icon-bottom"></div>
                </div>
            </div>
            <div className="logo">
                <img src="logo.png"></img>
            </div>
        </nav> 
    );
}