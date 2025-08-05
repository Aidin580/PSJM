import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import Dashbord from './pages/Dashbord/Dashbord.jsx';
import Stuinfo from './pages/Stuinfo/Stuinfo.jsx';
import Login from './pages/Login/Login.jsx';
import Record from './pages/Record/Record.jsx';
import Accounting from './pages/Accounting/Accounting.jsx';
import Meetings from './pages/Meetings/Meetings.jsx';
import Chat from './pages/chat/Chat.jsx';
import PageNotFound from './components/Erorr/Types/PageNotFound.jsx';
import WeekDayEdit from "./pages/WeekDayEdit/WeekDayEdit.jsx"
import About from './pages/About/About.jsx'
import AddStudent from './pages/AddStudent/AddStudent.jsx';
import AddTeacher from './pages/AddTeacher/AddTeacher.jsx';
import AddDeputy from './pages/AddDeputy/AddDeputy.jsx';
import EditUser from './pages/EditUser/EditUser.jsx';
import AddClass from './pages/AddClass/AddClass.jsx';

import Document from './pages/Document/Document.jsx';
import Mdocument from "./pages/Mdocument/Mdocument.jsx";
import EditSchool from "./pages/EditSchool/EditSchool.jsx";
import AboutSchool from './components/AboutSchool/AboutSchool.jsx';


import StudentList from './components/StudentList/StudentList.jsx';
import Teacher from './components/Teachers/Teacher.jsx';
import Members from './components/Members/Members.jsx';
import Week from './components/Week/Week.jsx'; 
import Graph from './components/Graph/Graph.jsx';
import ScoreRow from './components/ScoreRow/ScoreRow.jsx';
import ErorrAccess from './components/Erorr/Types/ErorrAccess.jsx'


import DocumentPart1 from './components/DocumentPart1/DocumentPart1.jsx';
import DocumentPart2 from './components/DocumentPart2/DocumentPart2.jsx';
import DocumentPart3 from './components/DocumentPart3/DocumentPart3.jsx';
import DocumentPart4 from './components/DocumentPart4/DocumentPart4.jsx';
import DocumentPart5 from './components/DocumentPart5/DocumentPart5.jsx';
import DocumentPart6 from './components/DocumentPart6/DocumentPart6.jsx';
import DocumentPart7 from './components/DocumentPart7/DocumentPart7.jsx';

import MeetingPart1 from "./components/MeetingPart1/MeetingPart1.jsx";
import MeetingPart2 from "./components/MeetingPart2/MeetingPart2.jsx";
import MeetingPart3 from "./components/MeetingPart3/MeetingPart3.jsx";
import MeetingPart4 from "./components/MeetingPart4/MeetingPart4.jsx";

import { AuthProvider } from "./Context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

import Token from "./Context/Token.jsx"
import Fetch from "./Context/FetchSchools.jsx"
import InterceptorSetup from "./Context/InterceptorSetup.jsx"

function App() {
  return (

    <AuthProvider>
      
      <Token />
      <Fetch />
      <div className="App">
        <InterceptorSetup />
        <Routes>
          <Route path="/" element={<ProtectedRoute allowedRoles={['admin', 'deputy', 'principal']}>
            <Dashbord />
          </ProtectedRoute>}>
            <Route index element={<ProtectedRoute allowedRoles={['admin', 'deputy', 'principal']}>
              <StudentList />
            </ProtectedRoute>} />
            <Route path='teachers' element={<ProtectedRoute allowedRoles={['admin', 'deputy', 'principal']}>
              <Teacher />
            </ProtectedRoute>} />
            <Route path='members' element={<ProtectedRoute allowedRoles={['admin', 'deputy', 'principal']}>
              <Members />
            </ProtectedRoute>} />
            <Route path='week' element={<ProtectedRoute allowedRoles={['admin', 'deputy', 'principal']}>
              <Week />
            </ProtectedRoute>} />
          </Route>


          <Route path="/student/:id" element={<Stuinfo />}>
            <Route index element={<Graph />} />
            <Route path='scorerow' element={<ScoreRow />} />
          </Route>

          <Route path='/Meetings/Document' element={<Mdocument />}>
            <Route index element={<MeetingPart1 />} />

            <Route path='2' element={<MeetingPart2 />} />
            <Route path='3' element={<MeetingPart3 />} />
            <Route path='4' element={<MeetingPart4 />} />
          </Route>


          <Route path='/Accounting/Document' element={<Document />}>
            <Route index element={<DocumentPart1 />} />
            <Route path='2' element={<DocumentPart2 />} />
            <Route path='3' element={<DocumentPart3 />} />
            <Route path='4' element={<DocumentPart4 />} />
            <Route path='5' element={<DocumentPart5 />} />
            <Route path='6' element={<DocumentPart6 />} />
            <Route path='7' element={<DocumentPart7 />} />
          </Route>
          <Route path='/AddClass' element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'deputy', 'principal']}>
            <AddClass />
          </ProtectedRoute>} />
          <Route path='/AddStudent' element={<AddStudent />} />
          <Route path='/AddTeacher' element={<AddTeacher />} />
          <Route path='/AddDeputy' element={<AddDeputy />} />
          <Route path='/EditUser' element={<EditUser />} />
          <Route path='/EditSchool' element={<EditSchool />} />
          <Route path='/About' element={<About />} />
          <Route path='/AboutSchool' element={<AboutSchool />} />

          <Route path='/Login' element={<Login />} />
          <Route path='/Record' element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'deputy', 'principal']}>
            <Record />
          </ProtectedRoute>} />
          <Route path='/Accounting' element={<ProtectedRoute allowedRoles={['admin', 'principal']}>
            <Accounting />
          </ProtectedRoute>} />
          <Route path='/Meetings' element={<ProtectedRoute allowedRoles={['admin', 'principal']}>
            <Meetings />
          </ProtectedRoute>} />
          <Route path='/chat' element={<ProtectedRoute allowedRoles={['admin']}>
            <Chat />
          </ProtectedRoute>} />
          <Route path='/WeekDayEdit' element={<ProtectedRoute allowedRoles={['admin', 'principal']}>
            <WeekDayEdit />
          </ProtectedRoute>} />
          <Route path='/ErorrAccess' element={<ErorrAccess />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
