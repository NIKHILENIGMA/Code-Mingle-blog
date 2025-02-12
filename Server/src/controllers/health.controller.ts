import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ApiResponse } from '../utils/ApiResponse'
import { responseMessage } from '../constant/'

const { HEALTH_CHECK } = responseMessage


// eslint-disable-next-line @typescript-eslint/require-await
const healthCheck = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    
     return ApiResponse(req, res, HEALTH_CHECK.code, HEALTH_CHECK.message, true)
})

export default { healthCheck }
