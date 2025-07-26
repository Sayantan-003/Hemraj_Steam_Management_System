function calculateDeoFattyProduction({ shiftHours, shiftName, shiftData, calibrationFactor }) {
  const Fattycal = parseFloat(calibrationFactor);

  if (shiftHours === '8') {
    const shift = shiftName.trim();
    return parseFloat(shiftData[shift]?.dipGap || 0) * cal;

  } else if (shiftHours === '12') {
    const [shiftA, shiftB] = shiftName.split('+').map(s => s.trim());
    const dipA = parseFloat(shiftData[shiftA]?.dipGap || 0);
    const dipB = parseFloat(shiftData[shiftB]?.dipGap || 0);
    return dipA * cal + (dipB * cal) / 2;

  } else if (shiftHours === '16') {
    const [shiftA, shiftB] = shiftName.split('+').map(s => s.trim());
    const dipA = parseFloat(shiftData[shiftA]?.dipGap || 0);
    const dipB = parseFloat(shiftData[shiftB]?.dipGap || 0);
    return dipA * cal + dipB * cal;

  } else if (shiftHours === '24') {
    const shifts = shiftName.split('+').map(s => s.trim());
    let total = 0;
    shifts.forEach(shift => {
      const dip = parseFloat(shiftData[shift]?.dipGap || 0);
      total += dip * cal;
    });
    return total;
  }

  return 0;
}



function calculateDeoSTProduction({ shiftHours, shiftName, shiftData, calibrationFactor }) {
  const STcal = parseFloat(calibrationFactor);

  if(shiftHours == '8'){
    const shift = shiftName.trim = 
  }
}




module.exports = calculateDeoProduction;
