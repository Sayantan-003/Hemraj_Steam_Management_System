import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react';

//Css import
import './App.css'

//Component Import
import Navbar from "../src/components/navbar/Navbar.jsx";
import DateSelector from '../src/components/DateSelector/DateSelector.jsx';
import SolventReport1 from './components/SolventReport/SolventReport1.jsx';
import PrepReport from './components/PrepReport/PrepReport.jsx';
import Footer from './components/Footer/Footer.jsx';
import DeGummingAndBleachingoSectionReport from './components/RefineryReport/DeGummingAndBleachingSectionReport.jsx';
import AlphaSectionReport from './components/RefineryReport/AlphaSectionReport.jsx';
import DeWaxingSectionReport from './components/RefineryReport/DeWaxingSectionReport.jsx';
import DEOSectionReport from './components/RefineryReport/DEOSectionReport.jsx';
// import RefineryTotalProduction from '../src/components/RefineryReport/RefineryTotalProduction.jsx';

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (data) => {
     console.log('Selected:', data);
  };

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="h-60 mt-6 pt-1 rounded-0.5xl bg-linear-to-r from to-blue-100 to bg-blue-50 flex items-center justify-center rounded-ms">
       <DateSelector onChange={handleDateChange} />
     </div>
     <PrepReport/>
     <SolventReport1/>
     <DeGummingAndBleachingoSectionReport/>
     <AlphaSectionReport/>
     <DeWaxingSectionReport/>
     <DEOSectionReport/>
     <Footer/>
     </BrowserRouter>
  );
}
export default App
