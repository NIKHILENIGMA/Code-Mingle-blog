import { Request, Response } from 'express'

/**
 * The `notFound` function sends a 404 status with a message indicating that the requested resource was
 * not found.
 * @param {Request} _ - the underscore `_` is used as a placeholder for the `Request` parameter. This is a common convention in JavaScript and TypeScript to indicate that the parameter is not being used within the function body. It's a way to acknowledge that the parameter exists but is intentionally not being used.
 * 
 * @param {Response} res - The `res` parameter in the code snippet refers to the response object that is used to send a response back to the client making the request. In this case, it is being used to set the status code to 404 (Not Found) and send a JSON response with an error message indicating that
 */

export const notFound = (req: Request, res: Response): void => {
    res.status(404).json({
        error: {
            code: 404,
            message: 'The requested resource was not found',
            request: {
                method: req.method,
                url: req.originalUrl
            }
        }
    });
}
