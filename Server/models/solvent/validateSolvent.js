const validateSolvent = (req, res, next) => {
  const { date, operatorDetails, labReport, steam, production } = req.body;

  if (!date || !operatorDetails || !labReport || !steam || !production) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!Array.isArray(operatorDetails) || operatorDetails.length === 0) {
    return res.status(400).json({ error: 'At least one operator is required' });
  }

  for (let i = 0; i < operatorDetails.length; i++) {
    const { name, shiftHour, shiftName } = operatorDetails[i];
    if (!name || !shiftHour || !shiftName) {
      return res.status(400).json({ error: `Incomplete operator data at index ${i}` });
    }
  }

  next();
};

export default validateSolvent;
