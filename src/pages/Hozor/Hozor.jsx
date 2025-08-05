import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Absence from '../../components/Absence/Absence';
import Student from '../../components/Student/Student';
import { AbsenceProvider } from '../../Context/AbsenceContext'; 

export default function Hozor() {
  return (
    <div className='Dashboard'>
      <Header />
      <div className='App-Container'>
        <Sidebar />
        <div className='Main-Content'>
          <AbsenceProvider>
            <Absence />
            <Student />
          </AbsenceProvider>
        </div>
      </div>
    </div>
  );
}
