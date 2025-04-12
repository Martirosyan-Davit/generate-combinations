import { DatabaseService } from '../services/db.service.js';
import { catchAsync } from '../utils/error-handler.js';
import { validateInput } from '../utils/validator.js';

export const generateCombinations = catchAsync(async (req, res) => {
  const validatedData = validateInput(req.body);
  const { items, length } = validatedData;

  const { responseId, combinations } = await DatabaseService.saveCombinationResult(items, length);

  res.status(201).json({
    status: 'success',
    data: {
      id: responseId,
      combinations,
    },
  });
});
