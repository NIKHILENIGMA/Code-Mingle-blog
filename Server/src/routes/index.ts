import express from 'express';
import userRoutes from './userRoutes';


const router = express.Router();

router.use('/api/v1/user', userRoutes);


export default router;
