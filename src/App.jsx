import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import Dashbord from './pages/Dashbord/Dashbord.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/chat/Chat.jsx';
import PageNotFound from './components/Erorr/Types/PageNotFound.jsx';
import About from './pages/About/About.jsx'
import AddStudent from './pages/AddStudent/AddStudent.jsx';
import AddTeacher from './pages/AddTeacher/AddTeacher.jsx';
import AddDeputy from './pages/AddDeputy/AddDeputy.jsx';
import EditUser from './pages/EditUser/EditUser.jsx';
import AddClass from './pages/AddClass/AddClass.jsx';
import EditSchoolInfo from './pages/EditSchoolInfo/EditSchoolInfo.jsx';
import FeildList from './components/FeildList/FeildList.jsx';


import EditSchool from "./pages/EditSchool/EditSchool.jsx";
import AboutSchool from './components/AboutSchool/AboutSchool.jsx';


import StudentList from './components/StudentList/StudentList.jsx';
import Teacher from './components/Teachers/Teacher.jsx';
import Members from './components/Members/Members.jsx';
import Schools from './components/School/Schools.jsx';
import ErorrAccess from './components/Erorr/Types/ErorrAccess.jsx'


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
            <Route path='schools' element={<ProtectedRoute allowedRoles={['admin', 'deputy', 'principal']}>
              <Schools />
            </ProtectedRoute>} />
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
          <Route path='/EditSchoolInfo' element={<EditSchoolInfo />} />
          <Route path='/feildList' element={<FeildList />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/chat' element={<ProtectedRoute allowedRoles={['admin']}>
            <Chat />
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
