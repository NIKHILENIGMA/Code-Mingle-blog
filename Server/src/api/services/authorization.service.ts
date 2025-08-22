import { NotFoundError } from '@/utils/Errors'
import prisma from '@/config/db.config'
import { FlattenedPermissions } from '@/utils/FlatPermission'
import { PrismaCommentRepository } from '@/Lib/Repositories/PrismaRepos/PrismaCommentRepository'
import { Action, Resource, ResourceDataMap } from '@/features/users/authentication/auth.types'

/**
 * Service for handling authorization logic related to user permissions and resource ownership.
 * 
 * This service provides methods to check user permissions, verify resource ownership,
 * and retrieve resources by their ID, ensuring that users can only perform actions they are authorized for.
 * 
 */

class AuthorizationService {
    private commentRepository: PrismaCommentRepository
    constructor() {
        this.commentRepository = new PrismaCommentRepository()
    }

    /**
     * Checks if a specific action is permitted for a given resource.
     * 
     * @param permissions - The flattened permissions object containing all user permissions
     * @param resource - The resource key to check permissions for
     * @param action - The specific action to verify permission for
     * @returns True if the action is permitted for the resource, false otherwise
     * 
     * @example
     * ```typescript
     * const hasPermission = checkPermission(userPermissions, 'users', 'read');
     * if (hasPermission) {
     *   User can read users
     * }
     * ```
     */
    public checkPermission(permissions: FlattenedPermissions, resource: keyof FlattenedPermissions, action: Action): boolean {
        return permissions[resource]?.includes(action) ?? false
    }

    /**
     * Verifies ownership of a resource by checking if the current user owns the specified resource.
     * 
     * This method performs additional ownership validation for POST and COMMENT resources,
     * ensuring that users can only modify resources they own, beyond basic role permissions.
     * For other resource types, ownership verification always passes.
     * 
     * @param resource - The type of resource being accessed (e.g., 'POST', 'COMMENT')
     * @param resourceData - The data object containing resource information, potentially including userId
     * @param userId - The ID of the user attempting to access the resource
     * @returns True if the user owns the resource or ownership check is not required, false otherwise
     * 
     * @example
     * ```typescript
     * const isOwner = verifyOwnership('POST', { userId: '123', title: 'My Post' }, '123');
     *  Returns true - user owns the post
     * 
     * const isNotOwner = verifyOwnership('POST', { userId: '456', title: 'Other Post' }, '123');
     *  Returns false - user does not own the post
     * ```
     */
    public verifyOwnership(resource: Resource, resourceData: ResourceDataMap[Resource], userId: string): boolean {
        // Additional ownership check for POST and COMMENT resources
        // Ensures users can only modify resources they own (beyond role permissions)
        if (resource === 'POST' || resource === 'COMMENT') {
            if ('userId' in resourceData && resourceData.userId !== userId) {
                return false
            }
        }

        return true
    }
    
    /**
     * Retrieves a resource by its ID based on the resource type.
     * 
     * @template T - The resource type that extends Resource
     * @param resource - The type of resource to retrieve ('comment', 'post', or 'user')
     * @param resourceId - The unique identifier of the resource
     * @returns A promise that resolves to the resource data mapped to the specified type
     * @throws {NotFoundError} When the resource with the given ID is not found
     * @throws {NotFoundError} When the resource type is not supported
     */
    public async getResourceById<T extends Resource>(resource: Resource, resourceId: string): Promise<ResourceDataMap[T]> {
        switch (resource.toLowerCase()) {
            case 'comment': {
                const comment = await this.commentRepository.findCommentById(resourceId)
                if (!comment) {
                    throw new NotFoundError(`Comment with ID ${resourceId} not found.`)
                }

                return comment as ResourceDataMap[T]
            }
            case 'post': {
                const post = await prisma.post.findUnique({
                    where: {
                        id: resourceId
                    }
                })
                if (!post) {
                    throw new NotFoundError(`Post with ID ${resourceId} not found.`)
                }
                return post as ResourceDataMap[T]
            }
            case 'user': {
                const user = await prisma.user.findUnique({
                    where: {
                        id: resourceId
                    }
                })
                if (!user) {
                    throw new NotFoundError(`User with ID ${resourceId} not found.`)
                }
                return user as ResourceDataMap[T]
            }
            default:
                throw new NotFoundError(`Resource ${resource} not found.`)
        }
    }
}

export const authorizationService = new AuthorizationService()
