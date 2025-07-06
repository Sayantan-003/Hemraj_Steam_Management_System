import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react';

//Css import
import './App.css'

//Component Import
import Navbar from "../src/components/navbar/Navbar.jsx";
import DateSelector from '../src/components/DateSelector/DateSelector.jsx';
import SolventReport1 from './components/SolventReport/SolventReport1.jsx';
import PerpReport from './components/PrepReport/PrepReport.jsx'
import Footer from './components/Footer/Footer.jsx';

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
     <PerpReport/>
     <SolventReport1 />
     <Footer/>
     </BrowserRouter>
  );
}

export default App
