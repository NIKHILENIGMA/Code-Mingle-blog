import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '@/config/app.config'
import { InternalServerError, NotFoundError } from '@/utils/Errors'
import { StandardError } from '@/utils/Errors/StandardError'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { CreateOAuthUserPayload, OAuthRepository, UpdateOAuthUserPayload } from '../../features/users/repository/PrismaOAuthRepository'

interface GoogleTokenExchangeResponse {
    access_token: string
    expires_in: number
    scope: string
    token_type: string
    id_token: string
    refresh_token?: string
}

interface GoogleDecodedTokenPayload {
    iss: string
    azp: string
    aud: string
    sub: string
    email: string
    email_verified: boolean
    at_hash: string
    name: string
    picture: string
    given_name: string
    family_name: string
    iat: number
    exp: number
}

class GoogleService {
    constructor(private oAuthRepository: OAuthRepository) {
        this.oAuthRepository = oAuthRepository
    }

    public async exchangeGoogleCodeForToken(code: string): Promise<GoogleTokenExchangeResponse> {
        try {
            if (!code) {
                throw new NotFoundError('Authorization code does not provided')
            }

            const { data }: { data: GoogleTokenExchangeResponse } = await axios.post(
                'https://oauth2.googleapis.com/token',
                new URLSearchParams({
                    client_id: GOOGLE_CLIENT_ID,
                    client_secret: GOOGLE_CLIENT_SECRET,
                    redirect_uri: GOOGLE_REDIRECT_URI,
                    grant_type: 'authorization_code',
                    code
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            return data
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(
                    `An unexpected error occurred while exchanging the code for a token, potential reason can be: ${error.message}`,
                    'exchangeGoogleCodeForToken'
                )
            }

            throw new InternalServerError('An unexpected error while exchanging the code for a token', (error as Error).message)
        }
    }

    public decodeGoogleJWTToken(token: GoogleTokenExchangeResponse) {
        const jwtPayload: GoogleDecodedTokenPayload = jwtDecode(token.id_token)
        if (!jwtPayload || !jwtPayload.email) {
            throw new NotFoundError('Invalid JWT token or email not found in the token')
        }

        return jwtPayload
    }

    public async createUserWithOAuth(payload: CreateOAuthUserPayload) {
        try {
            const user = await this.oAuthRepository.createOAuthUser(payload)
            if (!user) {
                throw new NotFoundError('User not found or could not be created with OAuth data')
            }

            return user
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(
                    `An unexpected error occurred while creating the user with OAuth data: ${error.message}`,
                    'createUserWithOAuth'
                )
            }

            throw new InternalServerError(
                `An unexpected error occurred while creating the user with OAuth data: ${(error as Error).message}`,
                'createUserWithOAuth'
            )
        }
    }

    public async updateUserWithOAuth(payload: UpdateOAuthUserPayload) {
        try {
            const updatedUser = await this.oAuthRepository.updateUserWithOAuth(payload)
            if (!updatedUser) {
                throw new NotFoundError('User not found or could not be updated with OAuth data')
            }

            return updatedUser


        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(
                    `An unexpected error occurred while updating the user with OAuth data: ${error.message}`,
                    'updateUserWithOAuth'
                )
            }

            throw new InternalServerError(
                `An unexpected error occurred while updating the user with OAuth data: ${(error as Error).message}`,
                'updateUserWithOAuth'
            )
        }
    }
}

export const googleService = new GoogleService(OAuthRepository)

// const userExist = await this.userRepository.getUserByEmail(jwtPayload.email)

//                 if (userExist) {
//                     const user = await this.userRepository.update(userExist.id, {
//                         authProvider: 'GOOGLE',
//                         providerId: jwtPayload.sub,
//                         providerAccessToken: token.access_token,
//                         providerRefreshToken: token.refresh_token,
//                         providerTokenExpiry: new Date(jwtPayload.exp),
//                         verifiedEmail: true,
//                         lastLoginAt: new Date()
//                     })

//                     const payload = {
//                         id: user.id,
//                         firstName: user.firstName!,
//                         lastName: user.lastName!,
//                         email: user.email,
//                         username: user.username,
//                         profileImage: user.profileImage !== null ? user.profileImage : jwtPayload.picture,
//                         roleId: user.roleId!,
//                         verifiedEmail: user.verifiedEmail,
//                         lastLoginAt: user.lastLoginAt!
//                     }

//                     const userRolePermissions = await this.userRepository.getUserPermissions(user.roleId!)
//                     if (!userRolePermissions) {
//                         throw new DatabaseError('Database error occurred while fetching user permissions')
//                     }

//                     // Generate access and refresh tokens with user permissions
//                     const tokens = await this.getTokens(user, userRolePermissions)
//                     if (!tokens) {
//                         throw new InternalServerError('Error generating tokens')
//                     }

//                     // Create session
//                     const sessionPayload = {
//                         userId: user.id,
//                         accessToken: tokens.accessToken,
//                         refreshToken: tokens.refreshToken
//                     }

//                     // Create session in the database
//                     await this.sessionRepository.createSession(sessionPayload)

//                     const response: UserLogin = {
//                         user: payload,
//                         tokens
//                     }

//                     return {
//                         response
//                     }
//                 } else {
//                     // Get role by name
//                     const role = await this.roleRepository.getRoleByName(ROLE.USER)
//                     if (!role) {
//                         throw new NotFoundError('User role not found')
//                     }

//                     // Create a new user with the Google account details
//                     const userName: string = generateUniqueUsername(jwtPayload.given_name)
//                     const newUser = await this.userRepository.create({
//                         firstName: jwtPayload.given_name,
//                         lastName: jwtPayload.family_name,
//                         username: userName,
//                         email: jwtPayload.email,
//                         roleId: role.id,
//                         lastLoginAt: new Date()
//                     })

//                     // Get the user permissions for the new user
//                     const userRolePermissions = await this.userRepository.getUserPermissions(newUser.roleId!)
//                     if (!userRolePermissions) {
//                         throw new DatabaseError('Database error occurred while fetching user permissions')
//                     }

//                     // Generate access and refresh tokens with user permissions
//                     const tokens = await this.getTokens(newUser, userRolePermissions)
//                     if (!tokens) {
//                         throw new InternalServerError('Error generating tokens')
//                     }

//                     // Create session
//                     const sessionPayload = {
//                         userId: newUser.id,
//                         accessToken: tokens.accessToken,
//                         refreshToken: tokens.refreshToken
//                     }

//                     // Create session in the database
//                     await this.sessionRepository.createSession(sessionPayload)

//                     // Prepare the response
//                     const response: UserLogin = {
//                         user: {
//                             id: newUser.id,
//                             firstName: newUser.firstName!,
//                             lastName: newUser.lastName!,
//                             email: newUser.email,
//                             username: newUser.username,
//                             profileImage: newUser.profileImage!,
//                             roleId: newUser.roleId!,
//                             verifiedEmail: newUser.verifiedEmail,
//                             lastLoginAt: newUser.lastLoginAt!
//                         },
//                         tokens: {
//                             accessToken: tokens.accessToken,
//                             refreshToken: tokens.refreshToken
//                         }
//                     }

//                     return {
//                         response
//                     }
//                 }
