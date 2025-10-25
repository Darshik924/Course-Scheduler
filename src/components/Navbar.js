import React from 'react';

export default function Navbar() {
    const handleAboutClick=()=>{
        alert("This is a Course Scheduler \n created by Darshik Ladhe");
    }
    return (
        <div>
            <div className="nav">
                <div className="navop">
                    <div className="h"><a className="home" href='/'>Home</a></div>
                    <div className="ab" onClick={handleAboutClick}>About</div>
                    <div className="mode">Change Mode</div>
                </div>
                <div className="search">
                    <button className="btn">Search</button>
                    <input type="text" className="t" placeholder='Search Here'/>
                </div>
            </div>
        </div>
    )
}
