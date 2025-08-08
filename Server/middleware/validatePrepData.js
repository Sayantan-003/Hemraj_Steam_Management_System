import { z } from 'zod';

const steamEntrySchema = z.object({
  shiftName: z.string(),
  steamTotalOpen: z.number().min(0),
});

const ampereEntrySchema = z.object({
  time: z.string(),
  meridian: z.enum(['AM', 'PM']),
  totalAmpereLoad: z.number().min(0),
});

const productionSchema = z.object({
  bran21Local: z.number().min(0),
  bran20Raw: z.number().min(0),
  bran10Mota: z.number().min(0),
  poraDORB: z.number().min(0),
  valoDORB: z.number().min(0),
});

const operatorSchema = z.object({
  operatorName: z.string(),
  shiftHours: z.string(),
  shiftName: z.string(),
  steamConsumedEntries: z.array(steamEntrySchema),
  ampereLoadEntries: z.array(ampereEntrySchema),
  totalProduction: productionSchema,
});

const prepFormSchema = z.object({
  date: z.coerce.date(),
  operatorDetails: z.array(operatorSchema).min(1),
});

export const validatePrepData = (req, res, next) => {
  try {
    prepFormSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation Error', details: err.errors });
  }
};
