import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '@/config'
import { Credentials, OAuth2Client, type TokenPayload } from 'google-auth-library'
import { OAuthRepository } from '../../features/users/repository/PrismaOAuthRepository'
import { CreateUserByGoogleOAuthPayload, Permission } from '@/features/users/authentication/auth.types'
import { StandardError } from '@/utils/Errors/StandardError'
import { InternalServerError, NotFoundError } from '@/utils/Errors'
import { User } from '@prisma/client'
import { EUserProvider } from '@/types/common/enum.types'

interface ITokenResponse {
    access_token: string;
    refresh_token?: string;
    id_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
}


class GoogleService {
    private client: OAuth2Client
    constructor(private oAuthRepository: OAuthRepository) {
        this.oAuthRepository = oAuthRepository
        this.client = new OAuth2Client({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            redirectUri: GOOGLE_REDIRECT_URI
        })
    }

    public async exchangeGoogleCodeForToken(code: string): Promise<{
        tokens: Credentials
        userInfo: TokenPayload
    }> {
        if (!code?.trim()) {
            throw new NotFoundError('Authorization code is required and cannot be empty')
        }

        try {
            // Exchange code for tokens
            const { tokens } = (await this.client.getToken(code)) as { tokens: ITokenResponse };
            
            // Validate tokens
            if (!tokens) {
                throw new NotFoundError('No tokens received from Google')
            }

            if (!tokens.access_token) {
                throw new NotFoundError('Access token not received from Google')
            }

            if (!tokens.id_token) {
                throw new NotFoundError('ID token not received from Google')
            }

            // Verify ID token and get user info
            const userInfo: TokenPayload = await this.verifyGoogleIdToken(tokens.id_token)

            // console.log('ID token verified successfully');

            return {
                tokens,
                userInfo
            }
        } catch (error: unknown) {
            // console.error('Error in exchangeGoogleCodeForToken:', error);

            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError(
                `An unexpected error while exchanging the code for a token: ${(error as Error).message}`,
                'exchangeGoogleCodeForToken'
            )
        }
    }

    private async verifyGoogleIdToken(idToken: string): Promise<TokenPayload> {
        try {
            const client = new OAuth2Client(GOOGLE_CLIENT_ID)

            const ticket = await client.verifyIdToken({
                idToken,
                audience: GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload() // user info
            if (!payload || !payload.email) {
                throw new NotFoundError('Invalid ID token or email not found in the token')
            }

            return payload
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(
                    `An unexpected error occurred while verifying the ID token, potential reason can be: ${error.message}`,
                    'verifyGoogleIdToken'
                )
            }

            throw new InternalServerError('An unexpected error while verifying the ID token', (error as Error).message)
        }
    }

    public async createUserWithGoogleOAuth(token: CreateUserByGoogleOAuthPayload): Promise<{ user: User; permissions: Permission[] }> {
        try {
            if (!token.email) {
                throw new NotFoundError('Email not found in the token payload')
            }

            return await this.oAuthRepository.createOAuthUser(token)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError(
                `An unexpected error while creating user with Google OAuth: ${(error as Error).message}`,
                'createUserWithGoogleOAuth'
            )
        }
    }

    public async isGoogleAccountLinked(userId: string, googleId: string, provider: EUserProvider): Promise<boolean> {
        try {
            return await this.oAuthRepository.checkAccountLinked(userId, googleId, provider)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError(
                `An unexpected error occurred while checking Google account link status: ${(error as Error).message}`,
                'AuthService.isGoogleAccountLinked'
            )
        }
    }

    public async linkGoogleAccount(userId: string, code: string): Promise<void> {
        if (!userId || !code) {
            throw new NotFoundError('User ID and authorization code are required to link Google account')
        }
        try {
            await this.oAuthRepository.linkGoogleAccount(userId, code)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError(
                `An unexpected error occurred while linking Google account: ${(error as Error).message}`,
                'GoogleService.linkGoogleAccount'
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
