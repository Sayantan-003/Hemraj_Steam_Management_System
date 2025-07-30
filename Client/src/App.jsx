import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// CSS import
import './App.css';

// Layout / feature components
import Navbar from "./components/navbar/Navbar.jsx";
import DateSelector from './components/DateSelector/DateSelector.jsx';
import SolventReport from './components/SolventReport/SolventReport.jsx';
import PrepReport from './components/PrepReport/PrepReport.jsx';
import Footer from './components/Footer/Footer.jsx';
import DeGummingAndBleachingoSectionReport from './components/RefineryReport/DeGummingAndBleachingSection/DeGummingAndBleachingSectionReport.jsx';
import AlphaSectionReport from './components/RefineryReport/AlphaSection/AlphaSectionReport.jsx';
import DeWaxingSectionReport from './components/RefineryReport/DeWaxingSection/DeWaxingSectionReport.jsx';
import DEOSectionReport from './components/RefineryReport/DEOSection/DEOSectionReport.jsx';

//New Form Pages
import NewPerpFormPage from './pages/new_PrepFormPage.jsx'
import NewSolventFormPage from './pages/new_SolventFormPage.jsx'
import NewRefineryFormPage from './pages/new_RefineryFormPage.jsx'

//Old Form Pages 
import PerpFormPage from './pages/PrepFormPage.jsx';
import SolventFormPage from './pages/SolventFormPage.jsx';
import RefineryFormPage from './pages/RefineryFormPage.jsx';



//Error Pages
import NotFound404 from './components/ErrorPages/NotFound404.jsx'
import InternalServer500 from './components/ErrorPages/InternalServer500.jsx'; // ← NEW





const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="h-60 mt-6 pt-1 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center rounded-md">
                <DateSelector onChange={handleDateChange} />
              </div>
              <PrepReport />
              <SolventReport />
              <DeGummingAndBleachingoSectionReport />
              <AlphaSectionReport />
              <DeWaxingSectionReport />
              <DEOSectionReport />
            <Footer />
            </>
          }
        />
        
        {/*OLD Form Pages */}
        <Route path= "/prep-form" element={<PerpFormPage />} />
        <Route path= "/solvent-form" element={<SolventFormPage />} />
        <Route path= "/refinery-form" element={<RefineryFormPage />} />

        {/*New Form Pages */}
        <Route path = "/new-prep-form" element={<NewPerpFormPage />}/>
        <Route path = "/new-solvent-form" element={<NewSolventFormPage />}/>
        <Route path = "/new-refinery-form" element={<NewRefineryFormPage />}/>
        
        {/*Error Pages */}
        <Route path = '*' element={<NotFound404/>} />
        <Route path="/500" element={<InternalServer500 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
