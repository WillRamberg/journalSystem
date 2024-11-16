import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Diagnosis from './Diagnosis';
import Messages from './Messages';
import Patientinfo from './Patient-info';
import Patientindex from './Patient-Index';
import PatientManagement from './Patient-Manage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/Diagnosis" element={<Diagnosis />}/>
        <Route path="/Messages" element={<Messages />}/>
        <Route path="/Patient-Info" element={<Patientinfo />}/>
        <Route path="/Patient-Index" element={<Patientindex />}/>
        <Route path="/Patient-Manage/:userId" element={<PatientManagement/>}/>
      </Routes>
    </Router>
  );
};

export default App;