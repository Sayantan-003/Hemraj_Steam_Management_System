import React, { useState, useEffect } from 'react';

const New_Alpha_Form = ({ onDataChange = () => {} }) => {
  const [formData, setFormData] = useState({
    date: '',
    numOperators: '',
    operators: []
  });

  const [processType, setProcessType] = useState('');
  const [shiftHours, setShiftHours] = useState([]);

  // Alpha process data state - organized by shift and process type
  const [processData, setProcessData] = useState({
    NEUTRALIZER: {
      A: { neutralizer1: '', neutralizer2: '', neutralizer3: '' },
      B: { neutralizer1: '', neutralizer2: '', neutralizer3: '' },
      C: { neutralizer1: '', neutralizer2: '', neutralizer3: '' }
    },
    REACTOR: {
      A: { reactorA: '', reactorB: '' },
      B: { reactorA: '', reactorB: '' },
      C: { reactorA: '', reactorB: '' }
    },
    SEPARATOR: {
      A: { separator: '' },
      B: { separator: '' },
      C: { separator: '' }
    }
  });

  const [washingTankData, setWashingTankData] = useState({
    A: '',
    B: '',
    C: ''
  });

  const shiftNameOptions = {
    '8': ['Shift A', 'Shift B', 'Shift C'],
    '12': [
      'Shift A + Shift B(1/2)',
      'Shift B + Shift C(1/2)',
      'Shift C + Shift A(1/2)',
      'Shift A(1/2) + Shift B',
      'Shift B(1/2) + Shift C',
      'Shift C(1/2) + Shift A',
    ],
    '16': ['Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A'],
    '24': ['Shift A + Shift B + Shift C'],
  };

  const getShiftSubparts = (shiftName) => {
    if (shiftName === 'Shift A + Shift B(1/2)' || shiftName === 'Shift A(1/2) + Shift B' || shiftName === 'Shift A + Shift B') return ['Shift A', 'Shift B'];
    if (shiftName === 'Shift B + Shift C(1/2)' || shiftName === 'Shift B(1/2) + Shift C' || shiftName === 'Shift B + Shift C') return ['Shift B', 'Shift C'];
    if (shiftName === 'Shift C + Shift A(1/2)' || shiftName === 'Shift C(1/2) + Shift A' || shiftName === 'Shift C + Shift A') return ['Shift C', 'Shift A'];
    if (shiftName === 'Shift A + Shift B + Shift C') return ['Shift A', 'Shift B', 'Shift C'];
    if (['Shift A', 'Shift B', 'Shift C'].includes(shiftName)) return [shiftName];
    return [];
  };

  const handleShiftHourChange = (index, value) => {
    const updated = [...shiftHours];
    updated[index] = value;
    setShiftHours(updated);

    // Reset shift name when shift hours change
    setFormData(prev => {
      const newOperators = [...prev.operators];
      if (newOperators[index]) {
        newOperators[index] = { ...newOperators[index], shiftHours: value, shiftName: '', shifts: [] };
      }
      return { ...prev, operators: newOperators };
    });
  };

  const handleOperatorChange = (index, field, value) => {
    setFormData(prev => {
      const newOperators = [...prev.operators];
      newOperators[index] = { ...newOperators[index], [field]: value };
      
      // Update shifts when shift name changes
      if (field === 'shiftName' && value) {
        const shiftSubparts = getShiftSubparts(value);
        newOperators[index].shifts = shiftSubparts.map(shiftName => {
          const shiftLetter = shiftName.split(' ')[1]; // Extract A, B, or C
          return {
            shiftName,
            processes: {
              NEUTRALIZER: {
                neutralizer1: parseFloat(processData.NEUTRALIZER[shiftLetter].neutralizer1) || 0,
                neutralizer2: parseFloat(processData.NEUTRALIZER[shiftLetter].neutralizer2) || 0,
                neutralizer3: parseFloat(processData.NEUTRALIZER[shiftLetter].neutralizer3) || 0
              },
              REACTOR: {
                reactorA: parseFloat(processData.REACTOR[shiftLetter].reactorA) || 0,
                reactorB: parseFloat(processData.REACTOR[shiftLetter].reactorB) || 0
              },
              SEPARATOR: {
                separator: parseFloat(processData.SEPARATOR[shiftLetter].separator) || 0
              }
            },
            washingTank: parseFloat(washingTankData[shiftLetter]) || 0
          };
        });
      }
      
      return { ...prev, operators: newOperators };
    });
  };

  const handleNumOperatorChange = (value) => {
    const num = parseInt(value);
    const newOperators = Array(num).fill(null).map((_, idx) => 
      formData.operators[idx] || { name: '', shiftHours: '', shiftName: '', shifts: [] }
    );
    
    setFormData(prev => ({
      ...prev,
      numOperators: value,
      operators: newOperators
    }));

    setShiftHours(Array(num).fill(''));
  };

  const handleProcessDataChange = (processTypeKey, shift, processKey, value) => {
    setProcessData(prev => ({
      ...prev,
      [processTypeKey]: {
        ...prev[processTypeKey],
        [shift]: {
          ...prev[processTypeKey][shift],
          [processKey]: value
        }
      }
    }));
  };

  const handleWashingTankChange = (shift, value) => {
    setWashingTankData(prev => ({ ...prev, [shift]: value }));
  };

  const handleDateChange = (value) => {
    setFormData(prev => ({ ...prev, date: value }));
  };

  // Update parent whenever formData or process data changes
  useEffect(() => {
    // Update operators with latest process data
    const updatedOperators = formData.operators.map(operator => {
      if (operator.shiftName) {
        const shiftSubparts = getShiftSubparts(operator.shiftName);
        const shifts = shiftSubparts.map(shiftName => {
          const shiftLetter = shiftName.split(' ')[1]; // Extract A, B, or C
          return {
            shiftName,
            processes: {
              NEUTRALIZER: {
                neutralizer1: parseFloat(processData.NEUTRALIZER[shiftLetter].neutralizer1) || 0,
                neutralizer2: parseFloat(processData.NEUTRALIZER[shiftLetter].neutralizer2) || 0,
                neutralizer3: parseFloat(processData.NEUTRALIZER[shiftLetter].neutralizer3) || 0
              },
              REACTOR: {
                reactorA: parseFloat(processData.REACTOR[shiftLetter].reactorA) || 0,
                reactorB: parseFloat(processData.REACTOR[shiftLetter].reactorB) || 0
              },
              SEPARATOR: {
                separator: parseFloat(processData.SEPARATOR[shiftLetter].separator) || 0
              }
            },
            washingTank: parseFloat(washingTankData[shiftLetter]) || 0
          };
        });
        return { ...operator, shifts };
      }
      return operator;
    });

    const outputData = {
      date: formData.date,
      processType,
      operators: updatedOperators.map(op => ({
        name: op.name,
        shiftHours: parseInt(op.shiftHours) || 0,
        shifts: op.shifts || []
      }))
    };

    onDataChange(outputData);
  }, [formData, processData, washingTankData, processType, onDataChange]);

  const renderOperatorFields = () => {
    const operatorFields = [];
    for (let i = 0; i < Number(formData.numOperators); i++) {
      const currentShiftHour = shiftHours[i] || '';
      const shiftNameOptions = getShiftNameOptions(currentShiftHour);

      operatorFields.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Operator Name</label>
            <select 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.operators[i]?.name || ''}
              onChange={(e) => handleOperatorChange(i, 'name', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Ramesh Kumar">Ramesh Kumar</option>
              <option value="Suresh Patel">Suresh Patel</option>
              <option value="Vinod Singh">Vinod Singh</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
            <select
              value={currentShiftHour}
              onChange={(e) => handleShiftHourChange(i, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select</option>
              <option value="8">8 Hours</option>
              <option value="12">12 Hours</option>
              <option value="16">16 Hours</option>
              <option value="24">24 Hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift Name</label>
            <select 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.operators[i]?.shiftName || ''}
              onChange={(e) => handleOperatorChange(i, 'shiftName', e.target.value)}
              disabled={!currentShiftHour}
            >
              <option value="">Select</option>
              {shiftNameOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return operatorFields;
  };

  const getShiftNameOptions = (hour) => {
    return shiftNameOptions[hour] || [];
  };

  const renderProcessTypeSection = () => {
    switch (processType) {
      case 'NEUTRALIZER':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Process Values for Neutralizer Tanks</h3>
            {['A', 'B', 'C'].map((shift) => (
              <div key={shift} className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium text-gray-700">Neutralizer Tank {num} Value</label>
                      <input 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                        type="text"
                        value={processData.NEUTRALIZER[shift][`neutralizer${num}`]}
                        onChange={(e) => handleProcessDataChange('NEUTRALIZER', shift, `neutralizer${num}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'REACTOR':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Process Values for Reactor Tanks</h3>
            {['A', 'B', 'C'].map((shift) => (
              <div key={shift} className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Reactor-A', 'Reactor-B'].map((name, idx) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700">Process Value of {name}</label>
                      <input 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                        type="text"
                        value={processData.REACTOR[shift][idx === 0 ? 'reactorA' : 'reactorB']}
                        onChange={(e) => handleProcessDataChange('REACTOR', shift, idx === 0 ? 'reactorA' : 'reactorB', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'SEPARATOR':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Process Values for Separator Tanks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['A', 'B', 'C'].map((shift) => (
                <div key={shift}>
                  <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
                  <label className="block text-sm font-medium text-gray-700">Process Value of Separator</label>
                  <input 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                    type="text"
                    value={processData.SEPARATOR[shift].separator}
                    onChange={(e) => handleProcessDataChange('SEPARATOR', shift, 'separator', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Alpha Section</h2>

      {/* Date and Operator Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Operator Present</label>
          <select
            value={formData.numOperators}
            onChange={(e) => handleNumOperatorChange(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      {/* Operator Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Operator Details</h3>
        {renderOperatorFields()}
      </div>

      {/* Process Type Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Process Type Entries</h3>
        <select 
          value={processType} 
          onChange={(e) => setProcessType(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4"
        >
          <option value="">Select</option>
          <option value="NEUTRALIZER">NEUTRALIZER (Neutralizer Tanks)</option>
          <option value="REACTOR">REACTOR (Reactor Tanks)</option>
          <option value="SEPARATOR">SEPARATOR (Separator Tanks)</option>
        </select>
        {renderProcessTypeSection()}
      </div>

      {/* Process Values for Washing Tank */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Process Values for Washing Tank</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['A', 'B', 'C'].map((shift) => (
            <div key={shift}>
              <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
              <label className="block text-sm font-medium text-gray-700">Process Value of Washing Tank</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={washingTankData[shift]}
                onChange={(e) => handleWashingTankChange(shift, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New_Alpha_Form;