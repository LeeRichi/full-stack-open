import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});