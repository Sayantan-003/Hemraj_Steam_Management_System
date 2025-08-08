import { createPrepLog } from '../services/prep.service.js';

export const createPrepEntry = async (req, res) => {
  try {
    const data = req.body;
    const savedLog = await createPrepLog(data);
    return res.status(201).json({
      message: 'Prep form submitted successfully',
      data: savedLog
    });
  } catch (error) {
    console.error('Error creating prep entry:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
