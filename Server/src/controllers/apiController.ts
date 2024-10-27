import { Request, Response } from 'express'
import logger from '../utils/logger'

interface IApiRequest {
    id: string
    name: string
}

export const apiController = () => {
    return {
        get: (req: Request, res: Response) => {
            const { id, name } = req.body as IApiRequest

            logger.info('GET request to the homepage', id, name)
            res.json({
                message: {
                    msg: 'GET request to the homepage',
                    id,
                    name
                }
            })
        },
        post: (_: Request, res: Response) => {
            logger.error('POST request to the homepage')
            res.json({
                message: 'POST request to the homepage'
            })
        }
    }
}
