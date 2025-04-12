import express from 'express';

import { generateCombinations } from '../controllers/combinations.js';
const router = express.Router();

router.post('/combinations', generateCombinations);

export { router };
