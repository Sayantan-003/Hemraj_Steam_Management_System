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
import DeGummingSectionReport from './components/RefineryReport/DeGummingSection';
import RefineryTotalProduction from './components/RefineryReport/RefineryTotalProduction';

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (data) => {
     console.log('Selected:', data);
  };

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="h-60 mt-6 pt-1 rounded-0.5xl bg-gray-100 flex items-center justify-center">
       <DateSelector onChange={handleDateChange} />
     </div>
     <PrepReport/>
     <SolventReport1/>
     <DeGummingSection/>
     <RefineryTotalProduction/>
     <Footer/>
     </BrowserRouter>
  );
}

export default App
