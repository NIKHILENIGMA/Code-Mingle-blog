import { Request, Response } from 'express'

/**
 * Handles 404 Not Found errors by sending a JSON response with error details
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {void} - Returns nothing, sends JSON response
 */
export const notFound = (req: Request, res: Response): void => {
    res.status(404).json({
        error: {
            code: 404,
            message: 'The requested resource was not found',
            request: {
                ip: req.ip,
                params: req.params || {},
                query: req.query || {},
                method: req.method || 'unknown',
                url: req.originalUrl,
                userAgent: req.get('user-agent') || 'unknown',
            }
        }
    });
}
