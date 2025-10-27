import React, {useState,useCallback} from 'react';
import {useSession,useSupabaseClient} from '@supabase/auth-helpers-react';
import {DndProvider,useDrag,useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Calendar,dateFnsLocalizer} from "react-big-calendar";
import {format,parse,startOfWeek,getDay} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Main({courses}){

  const session=useSession();
  const supabase=useSupabaseClient();

  const locales={"en-US":enUS};
  const localizer=dateFnsLocalizer({
    format,
    parse,
    startOfWeek:()=>startOfWeek(new Date(),{weekStartsOn:1}),
    getDay,
    locales,
  });
  const ItemTypes={COURSE:"course"};

  const [events,setEvents]=useState([]);
  const Courses=courses.map((c,i)=>({id:i+1,title:c}));

  const handleDrop=(course,slotInfo)=>{
    const newEvent={
      title:course.title,
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setEvents((prev)=>{
    const newEvents = [];
    for (let i=0;i<prev.length;i++) {
      newEvents.push(prev[i]);
    }
    newEvents.push(newEvent);
    return newEvents;
    })
  };

  const DroppableCalendar=({events})=>{
    const [{canDrop,isOver},drop]=useDrop(()=>({
      accept:ItemTypes.COURSE,
      drop:(item, monitor)=>{
        console.log(item.course)
      },
      collect:(monitor)=>({
        isOver:!!monitor.isOver(),
        canDrop:!!monitor.canDrop(),
      }),
    }));

    const handleSelectSlot=useCallback(
      ({start,end})=>{
        const lastDrag=window.lastDraggedCourse;
        if(lastDrag){
          handleDrop(lastDrag,{start,end});
          window.lastDraggedCourse=null;
        }else{
          alert("Drag a course first, then select a time slot!");
        }
      },
      []
    );

    return (
      <div ref={drop} style={{ height: 500 }}>
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          style={{
            backgroundColor:"#7bbdff",
            height: 500,
            border:canDrop ? "2px dashed #4f46e5":"none",
          }}
        />
      </div>
    );
  };

  
  async function googleSignIn() {
    const {error}= await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        scopes:'https://www.googleapis.com/auth/calendar',
      },
    });
    if(error){
      alert("Error logging in with Google");
      console.log(error);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  const TrackableCourseCard=({course})=>{
    const [{isDragging},drag]=useDrag(()=>({
      type:ItemTypes.COURSE,
      item:{course},
      collect:(monitor)=>({
        isDragging:!!monitor.isDragging(),
      }),
      end:(item) => {
        if(item){ 
          window.lastDraggedCourse = item.course;
        }
      },
    }));
    return (
      <div
        ref={drag}
        style={{
          padding:"10px",
          margin:"5px 0",
          backgroundColor:"#4f46e5ff",
          color:"white",
          borderRadius:"8px",
          cursor:"grab",
          opacity:isDragging ? 0.5 : 1,
        }}
      >
        {course.title}
      </div>
    );
  };

  return (
    <>
      <br /><br />
      <div>
        {session ? (
          <>
            <DndProvider backend={HTML5Backend}>
              <div style={{display:"flex",gap:"20px",padding:"20px"}}>
                <div
                  style={{
                    width:"200px",
                    background:"#f1f5f9",
                    padding:"10px",
                    borderRadius:"8px",
                  }}
                >
                  {Courses.map((course)=>(
                    <TrackableCourseCard key={course.id} course={course} />
                  ))}
                </div>

                <div style={{flex:1}}>
                  <DroppableCalendar events={events} />
                </div>
              </div>
            </DndProvider>

            <div style={{textAlign:"center",marginTop:"20px"}}>
              <button className="btn3" onClick={signOut}>Sign out</button>
            </div>
          </>
        ):(
          <div style={{textAlign:"center"}}>
            <button className="btn3" onClick={googleSignIn}>Sign In with Google</button>
          </div>
        )}
      </div>
      <br /><br />
    </>
  );
}