import React, { useState } from "react";


// 2️⃣ Example events
// const events = [
//   {
//     title: "Team Meeting",
//     allDay: true,
//     start: new Date(2025, 9, 24),
//     end: new Date(2025, 9, 24),
//   },
//   {
//     title: "Project Deadline",
//     start: new Date(2025, 9, 25, 10, 0),
//     end: new Date(2025, 9, 25, 12, 0),
//   },
// ];

const MyCalendar = () => {
//   const [myEvents, setMyEvents] = useState(events);

  return (
    <div className="CALEN">
      

      <div style={{ height: 500, margin: "0 2rem" }}>
        <Calendar
          localizer={localizer}
        //   events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
