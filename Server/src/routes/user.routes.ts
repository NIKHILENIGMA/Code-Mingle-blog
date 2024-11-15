import express from 'express'
import { createUser } from '../controllers/user.controller'
// import logger from '../utils/logger';

const router = express.Router()

router.route('/create').post(createUser);



export default router
