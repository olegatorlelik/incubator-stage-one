import { Router } from 'express';
import { HTTP_STATUSES } from '../../../constants';
import TestingRepositories from '../repositories';

const router = Router();
const testingRepository = new TestingRepositories();

/**
 * Clear all from db
 */
router.delete('/all-data', (req, res) => {
  testingRepository.clearData();

  res.status(HTTP_STATUSES.NO_CONTENT_204).send();
});

export default router;
