import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Classes from './components/Classes';
import Course from './components/Course';
import Dashboard from './components/Dashboard';
import RegisterClass from './components/registers/RegisterClass';
import RegisterCourse from './components/registers/RegisterCourse';
import RegisterStudent from './components/registers/RegisterStudent';
import RegisterTeacher from './components/registers/RegisterTeacher';
import Student from './components/Student';
import Teacher from './components/Teacher';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path="/course/register" element={<RegisterCourse />} />
            <Route path='/teacher/register' element={<RegisterTeacher />}/>
            <Route path='/class/register' element={<RegisterClass />}/>
            <Route path='/student/register' element={<RegisterStudent />}/>
            <Route path='/student/' element={<Student />}/>
            <Route path='/course/' element={<Course />}/>
            <Route path='/class/' element={<Classes />}/>
            <Route path='/teacher/' element={<Teacher />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
