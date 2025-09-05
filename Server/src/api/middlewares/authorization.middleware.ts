import { Request, Response, NextFunction } from 'express'
import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/utils/Errors'
import { authorizationService } from '../services/authorization.service'
import { Action, Resource, RESOURCE_ID_PARAMS, ResourceDataMap } from '@/features/authentication/auth.types'

/**
 * Creates an authorization middleware that verifies user permissions for specific resource actions.
 *
 * This middleware performs the following authorization checks:
 * 1. Verifies user authentication
 * 2. Validates user has required permissions for the resource type and action
 * 3. Retrieves and validates the requested resource exists
 * 4. For POST and COMMENT resources, ensures user owns the resource
 * 5. Stores resource data in the request object for downstream use
 *
 * @param resourceType - The type of resource being accessed (e.g., 'POST', 'COMMENT')
 * @param action - The action being performed on the resource (e.g., 'read', 'write', 'delete')
 * @returns Express middleware function that handles authorization logic
 *
 * @throws {UnauthorizedError} When user is not authenticated
 * @throws {ForbiddenError} When user lacks required permissions or is not the resource owner
 * @throws {NotFoundError} When resource ID is missing from params or resource doesn't exist
 *
 * @example
 * ```typescript
 * router.delete('/posts/:postId', authorization('POST', 'delete'), deletePost);
 * router.put('/comments/:commentId', authorization('COMMENT', 'update'), updateComment);
 * ```
 *
 */
export const authorization = (resourceType: Resource, action: Action) => {
    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            // Extract user ID from the authenticated request
            const userId = req.user?.id
            if (!userId) {
                return next(new UnauthorizedError('User not authenticated.'))
            }

            // Extract the resource ID from route parameters using the predefined parameter mapping
            // Example: for 'POST' resource, looks for 'postId' in req.params
            const resourceId: string = req.params[RESOURCE_ID_PARAMS[resourceType]]
            if (!resourceId) {
                return next(new NotFoundError(`Resource ID for ${resourceType} not found in request parameters.`))
            }

            // Get user's role-based permissions from the request (set by previous middleware)
            const permissions = req.rolePermissions
            if (!permissions || !authorizationService.checkPermission(permissions, resourceType.toLowerCase(), action)) {
                return next(new ForbiddenError(`You do not have permission to ${action} on ${resourceType.toLowerCase()}.`))
            }

            // Allow read and create actions without further checks
            if (action === 'read' || action === 'create') return next()

            // Initialize resourceData object on request if it doesn't exist
            if (!req.resourceData) {
                req.resourceData = {}
            }

            // Fetch the resource data from the database
            const resourceData = await authorizationService.getResourceById(resourceType, resourceId)
            if (!resourceData) {
                return next(new NotFoundError(`Resource ${resourceType} not found.`))
            }

            // Store the resource data in the request object for downstream use
            ;(req.resourceData as Record<string, ResourceDataMap[typeof resourceType]>)[resourceType.toLowerCase()] = resourceData

            // Verify ownership for POST and COMMENT resources
            if (!authorizationService.verifyOwnership(resourceType, resourceData, userId)) {
                return next(
                    new ForbiddenError(`You do not have permission to ${action} this ${resourceType.toLowerCase()} because you are not the owner.`)
                )
            }

            // Authorization successful, proceed to next middleware/controller
            next()
        } catch (error) {
            // Pass any unexpected errors to Express error handler
            next(error)
        }
    }
}
