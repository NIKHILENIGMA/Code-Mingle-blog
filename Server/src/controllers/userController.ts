import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { UserService } from '../services/UserService'
import { User } from '../Lib/Models/User'
import ApiError from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'

const userService = new UserService()


/* The `export const createUser` function is creating an endpoint for creating a new user in an Express application. Here's a breakdown of what it does: 
*/
export const createUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.body as User

        const { newUser, tokens } = await userService.createUser(user)

        res.status(201).json(
            new ApiResponse(201, {
                newUser,
                tokens
            })
        )
    } catch (error) {
        throw new ApiError(500, (error as Error).message)
    }
})

export const updateUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.body as User
        const id = req.params.id 

        const updatedUser = await userService.updateUserDetails(id, user)

        res.status(200).json(
            new ApiResponse(
                200, 
                updatedUser
            )
        )
    } catch (error) {
        throw new ApiError(500, (error as Error).message)
    }
})
