import { NextFunction, Response } from 'express'
import prisma from '@/config/prisma.config'
import { AsyncHandler, ApiError, resourceResolvers } from '@/utils'
import { logger } from '@/utils/logger/index'
import { User } from '@/Lib/Models/User'
import { ENUMS } from '@/types'
import jexl from 'jexl'
import { responseMessage } from '@/constant'
import { ProtectedRequest } from '@/types/extended/app-request'

const { ACCESS_DENIED, NOT_FOUND, METHOD_FAILED } = responseMessage

/**
 * Middleware to check if a user has permission to perform specific actions on a resource
 * @param actions - The type of action being performed (WRITE, READ, UPDATE, DELETE)
 * @param resource - The resource being accessed (POST, COMMENT, USER, ADMIN_PANEL, ALL, REPORT)
 * @returns An async middleware function that validates permissions
 * @throws {ApiError} 401 - If user is not authenticated
 * @throws {ApiError} 404 - If the requested resource is not found
 * @throws {ApiError} 403 - If user does not have required permissions
 */

export const checkPermission = (actions: ENUMS.ACTION, resource: ENUMS.RESOURCE) => {
    return AsyncHandler(async (req: ProtectedRequest, _: Response, next: NextFunction): Promise<void> => {
        const user = req?.user as User
        if (!user) {
            return ApiError(new Error('Unauthenticated user please login!'), req, next, 401)
        }
        const resourceId: string = req.params.id
        let resourceData: { authorId?: string } | null = null

        const fetchResource = resourceResolvers[resource as keyof typeof resourceResolvers]
        
        // Check if the resource is abstract (like ADMIN_PANEL) and doesn't require an ID
        if (fetchResource && typeof fetchResource === 'function') {
            const fetchedResource = await fetchResource(resourceId)
            req.resource = fetchedResource
            resourceData = fetchedResource ? { authorId: (fetchedResource as { authorId: string }).authorId } : null

            // If the resource is not found and it's not an abstract resource, return an error
            if (!resourceData && resource !== ENUMS.RESOURCE.ADMIN_PANEL && resource !== ENUMS.RESOURCE.ALL) {
                return ApiError(new Error(NOT_FOUND(`${resource} not found`).message), req, next, NOT_FOUND().code)
            }
        }

        const policies = await prisma.policy.findMany({
            where: {
                role: user.role as ENUMS.ROLE,
                actions: { has: actions }
            }
        })

        // the context object is used to evaluate the policy conditions
        const context = {
            user: {
                id: user.id
            },
            resource: {
                authorId: resourceData && 'authorId' in resourceData ? resourceData.authorId : undefined
            }
        }

        // Check if the user has any policies
        if (!policies || policies.length === 0) {
            return ApiError(new Error(METHOD_FAILED('Policies not found!').message), req, next, METHOD_FAILED().code)
        }

        // Check if the user has permission to perform the action on the resource
        try {
            const isAllowed: boolean = policies.some((policy) => {
                return (
                    policy.role === user.role &&
                    policy.actions.includes(actions) &&
                    policy.resource === resource &&
                    jexl.evalSync(policy.condition, context)
                )
            })
            // If the user doesn't have permission, return an error
            if (!isAllowed) {
                return ApiError(new Error(ACCESS_DENIED(resource).message), req, next, ACCESS_DENIED().code)
            }
        } catch (error) {
            logger.error('Error evaluating policy condition:', error)
            return ApiError(new Error(METHOD_FAILED('Error evaluating policy condition').message), req, next, METHOD_FAILED().code)
        }

        
        // If the user has permission, proceed to the next middleware or route handler
        next()
    })
}
