import React,{useState,useEffect} from 'react';

export default function Start({onSubmit}) {
    const [color,setColor]=useState('red');
    const [isTextarea,setisTextarea]=useState(false);
    const [isButton,setisButton]=useState(false);
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            setColor(prevColor=>(prevColor==='red'?'blue':'red'));
        },1300);
        return ()=>clearInterval(intervalId);
    },[]);
    const handleStartClick=()=>{
        setisTextarea(true);
        setisButton(true);
    };

    const [courseText,setcourseText]=useState('');
    const hanldeTextareaChange=(event)=>{
        setcourseText(event.target.value);
    }
    const handleCourseSubmit=()=>{
        onSubmit(courseText);
    }
    
    return (
        <>
            <div>
                <div className="st">
                    <div className="startHead">
                        <h1>Get Started With Your Courses</h1>
                    </div>
                    <div className="st-btn">
                        <h2 style={{ color: color }}>Click Here --</h2>
                        <div className="button"><button className="btn2" onClick={handleStartClick}>Start</button></div>
                    </div>
                    <div className="courselist">
                        {isTextarea && (<textarea className="input" rows="5" cols="70" onChange={hanldeTextareaChange} placeholder='Type all your courses Here with a space between each Enter 7 courses compulsory'/>)}
                        {isButton && (<button className="submit" onClick={handleCourseSubmit}>Submit</button>)}
                    </div>
                </div>
            </div>
        </>
    );
}




