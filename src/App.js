import './App.css';
import React ,{useState} from 'react';
import Navbar from './components/Navbar';
import Start from './components/Start';
import Main from './components/Main';


function App() {
  const [coursesArr,setcoursesArr]=useState([]);
  const [showMain,setshowMain]=useState(false);

  const handleCourseSubmit=(courseText)=>{
    const courses=courseText.split(' ');
    setcoursesArr(courses);
    setshowMain(true);
  }
  const [value, onChange] = useState(new Date());

  return (
    <div className="App">
      <Navbar />
      <Start onSubmit={handleCourseSubmit} />
      {(showMain && <Main courses={coursesArr}/>)}
    </div>
  );
}

export default App;
