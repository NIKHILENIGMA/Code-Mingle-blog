import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { User } from '../Lib/Models/User'
import { createUserSchema } from '../schemas/user.schema'
import { z } from 'zod'
import UserServices from '../services/user.service'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'

const userServices = new UserServices()

/**
 * Creates a new user in the system.
 * @param req - The request object containing user data.
 * @returns res - The response object containing the newly created user.
 */

export const createUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = createUserSchema.parse(req.body) as User

        const { tokens, userData } = await userServices.createUser(user)

        res.status(201).json(new ApiResponse(201, { userData, tokens }))
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(new ApiError(400, error.errors.map((err) => err.message).join(', ')))
        } else {
            throw new ApiError(500, (error as Error).message)
        }
    }
})

/**
 * Updates the details of a user in the system.
 * @param req - The request object containing the user data to be updated.
 * @returns res - The response object containing the updated user.
 */

export const updateUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.body as User
        const id = req.params.id
        await userServices.updateUserDetails(id, user)
        


        res.status(200).json(new ApiResponse(200, user, id))
    } catch (error) {
        throw new ApiError(500, (error as Error).message)
    }
})
