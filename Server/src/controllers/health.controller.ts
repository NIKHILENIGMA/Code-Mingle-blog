import { Request, Response } from 'express'
import AsyncHandler from '../utils/AsyncHandler'
import { ApiResponse } from '../utils/ApiResponse'



// eslint-disable-next-line @typescript-eslint/require-await
const healthCheck = AsyncHandler(async (_: Request, res: Response): Promise<void> => {
    
     res.status(200).json(new ApiResponse(200, 'success', 'Health check is successful'))
})

export default { healthCheck }
