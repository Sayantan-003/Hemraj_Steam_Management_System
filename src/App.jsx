import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// CSS import
import './App.css';

// Component Import
import Navbar from "./components/navbar/Navbar.jsx";
import DateSelector from './components/DateSelector/DateSelector.jsx';
import SolventReport1 from './components/SolventReport/SolventReport1.jsx';
import PrepReport from './components/PrepReport/PrepReport.jsx';
import Footer from './components/Footer/Footer.jsx';
import DeGummingAndBleachingoSectionReport from './components/RefineryReport/DeGummingAndBleachingSectionReport.jsx';
import AlphaSectionReport from './components/RefineryReport/AlphaSectionReport.jsx';
import DeWaxingSectionReport from './components/RefineryReport/DeWaxingSectionReport.jsx';
import DEOSectionReport from './components/RefineryReport/DEOSectionReport.jsx';
import PerpFormPage from './pages/PrepFormPage.jsx';
import SolventFormPage from './pages/SolventFormPage.jsx';
import RefineryFormPage from './pages/RefineryFormPage.jsx';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="h-60 mt-6 pt-1 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center rounded-md">
                <DateSelector onChange={handleDateChange} />
              </div>
              <PrepReport />
              <SolventReport1 />
              <DeGummingAndBleachingoSectionReport />
              <AlphaSectionReport />
              <DeWaxingSectionReport />
              <DEOSectionReport />
            </>
          }
        />
        <Route path="/prep-form" element={<PerpFormPage />} />
        <Route path="/solvent-form" element={<SolventFormPage />} />
        <Route path="/refinery-form" element={<RefineryFormPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
