import bcrypt from 'bcrypt'
import { RepositoryFactory } from '../Lib/Repositories'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
import { ApiError } from '../utils/ApiError'
import TokenServices from './token.service'
import { User, UserDTO } from '../Lib/Models/User'

export interface Credentials {
    email: string
    password: string
}

export default class AuthService {
    private UserRepository: IUserRepository
    private tokenService: TokenServices
    

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
        this.tokenService = new TokenServices()
    }

    /**
     * This TypeScript function creates a new user, hashes their password, generates access and refresh
     * tokens, and returns the tokens along with the user data excluding the password.
     * @param {User} user - The `signupUser` function you provided is responsible for creating a new
     * user in your system. It performs the following steps:
     * @returns The function `createUser` returns an object with two properties:
     * 1. `tokens`: Contains the access token and refresh token generated for the new user.
     * 2. `userData`: Contains the user data without the password field.
     */

    public async signupUser(user: User): Promise<UserDTO> {
        const emailExists = await this.UserRepository.findByEmail(user.email)

        if (emailExists) {
            throw new ApiError(400, 'Email already exists')
        }

        // Hash password
        const hashPassword = await this.HashedPassword(user.password)

        if (!hashPassword) {
            throw new ApiError(500, 'Error occured while hashing password')
        }

        user.password = hashPassword

        // Create user
        const newUser = await this.UserRepository.create(user)

        if (!newUser) {
            throw new ApiError(404, 'Error while creating user')
        }

        // Generate tokens for user
        const tokens = await this.tokenService.generateToken(newUser.id)
        

        if (!tokens) {
            throw new ApiError(500, 'Error generating tokens')
        }

        // Return tokens and new user except password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...newUserWithoutPassword } = newUser

        return { tokens, userData: newUserWithoutPassword }
    }
    async loginUser(credentials: Credentials) {
        const user = await this.UserRepository.findByEmail(credentials.email)

        if (!user) {
            throw new ApiError(404, 'User not found')
        }

        const passwordMatch = await this.comparePassword(credentials.password, user.password)

        if (!passwordMatch) {
            throw new ApiError(401, 'Please check your credentials')
        }

        const tokens = await this.tokenService.generateToken(user.id)

        if (!tokens) {
            throw new ApiError(500, 'Error generating tokens')
        }

        return { tokens, userData: user }
    }

    /**
     * The function `HashedPassword` asynchronously hashes a given password using a salt generated with
     * a specified number of rounds.
     * @param {string} password - The `password` parameter is a string that represents the user's
     * password that needs to be hashed for security purposes.
     * @returns The `HashedPassword` function returns a Promise that resolves to a hashed password
     * string after hashing the input password using a salt generated with a specified number of
     * rounds.
     */

    private async HashedPassword(password: string): Promise<string> {
        // Hash password
        const saltRounds = process.env.HASH_PASSWORD_SALT ? parseInt(process.env.HASH_PASSWORD_SALT) : 10

        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param {string} password - Plain text password.
     * @param {string} hashedPassword - Hashed password.
     * @returns Promise<boolean> - True if passwords match, else false.
     */
    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // Compare password
        return await bcrypt.compare(password, hashedPassword)
    }
}
