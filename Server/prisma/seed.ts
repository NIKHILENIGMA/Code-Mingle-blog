import { PrismaClient, Resource, ActionType } from '@prisma/client'
import { logger } from '../src/utils/logger/index'

const prisma = new PrismaClient()

/**
 * Seed the database with initial roles and permissions.
 * This script creates three roles (ADMIN, MODERATOR, USER) and assigns permissions to them.
 *
 */
async function main() {
    // Clean up existing data if needed
    await prisma.rolePermission.deleteMany({})
    await prisma.permission.deleteMany({})
    await prisma.role.deleteMany({})

    // Create Roles
    logger.info('Creating roles...')

    const adminRole = await prisma.role.create({
        data: {
            name: 'ADMIN',
            displayName: 'Administrator',
            description: 'Full system access with all permissions'
        }
    })

    const moderatorRole = await prisma.role.create({
        data: {
            name: 'MODERATOR',
            displayName: 'Moderator',
            description: 'Can moderate content but with limited permissions'
        }
    })

    const userRole = await prisma.role.create({
        data: {
            name: 'USER',
            displayName: 'User',
            description: 'Standard user with basic permissions'
        }
    })

    logger.info('Roles created successfully.')

    // Create Permissions
    logger.info('Creating permissions...')

    // --------------- POST Permissions ---------------
    const createPostPerm = await prisma.permission.create({
        data: {
            name: 'CREATE_POST',
            description: 'Ability to create posts',
            resource: Resource.POST,
            actions: ActionType.CREATE
        }
    })

    const readPostPerm = await prisma.permission.create({
        data: {
            name: 'READ_POST',
            description: 'Ability to read posts',
            resource: Resource.POST,
            actions: ActionType.READ
        }
    })

    const updatePostPerm = await prisma.permission.create({
        data: {
            name: 'UPDATE_POST',
            description: 'Ability to update posts',
            resource: Resource.POST,
            actions: ActionType.UPDATE
        }
    })

    const deletePostPerm = await prisma.permission.create({
        data: {
            name: 'DELETE_POST',
            description: 'Ability to delete posts',
            resource: Resource.POST,
            actions: ActionType.DELETE
        }
    })

    // --------------- COMMENT Permissions ---------------
    const createCommentPerm = await prisma.permission.create({
        data: {
            name: 'CREATE_COMMENT',
            description: 'Ability to create comments',
            resource: Resource.COMMENT,
            actions: ActionType.CREATE
        }
    })

    const readCommentPerm = await prisma.permission.create({
        data: {
            name: 'READ_COMMENT',
            description: 'Ability to read comments',
            resource: Resource.COMMENT,
            actions: ActionType.READ
        }
    })

    const updateCommentPerm = await prisma.permission.create({
        data: {
            name: 'UPDATE_COMMENT',
            description: 'Ability to update comments',
            resource: Resource.COMMENT,
            actions: ActionType.UPDATE
        }
    })

    const deleteCommentPerm = await prisma.permission.create({
        data: {
            name: 'DELETE_COMMENT',
            description: 'Ability to delete comments',
            resource: Resource.COMMENT,
            actions: ActionType.DELETE
        }
    })

    // --------------- REPLY Permissions ---------------
    const createReplyPerm = await prisma.permission.create({
        data: {
            name: 'CREATE_REPLY',
            description: 'Ability to create replies',
            resource: Resource.REPLY,
            actions: ActionType.CREATE
        }
    })

    const readReplyPerm = await prisma.permission.create({
        data: {
            name: 'READ_REPLY',
            description: 'Ability to read replies',
            resource: Resource.REPLY,
            actions: ActionType.READ
        }
    })

    const updateReplyPerm = await prisma.permission.create({
        data: {
            name: 'UPDATE_REPLY',
            description: 'Ability to update replies',
            resource: Resource.REPLY,
            actions: ActionType.UPDATE
        }
    })

    const deleteReplyPerm = await prisma.permission.create({
        data: {
            name: 'DELETE_REPLY',
            description: 'Ability to delete replies',
            resource: Resource.REPLY,
            actions: ActionType.DELETE
        }
    })

    // --------------- ADMIN_PANEL Permissions ---------------
    await prisma.permission.create({
        data: {
            name: 'ACCESS_ADMIN_PANEL',
            description: 'Ability to access admin panel',
            resource: Resource.ADMIN_PANEL,
            actions: ActionType.READ
        }
    })

    // --------------- REPORT Permissions ---------------
    const createReportPerm = await prisma.permission.create({
        data: {
            name: 'CREATE_REPORT',
            description: 'Ability to create reports',
            resource: Resource.REPORT,
            actions: ActionType.CREATE
        }
    })

    const readReportPerm = await prisma.permission.create({
        data: {
            name: 'READ_REPORT',
            description: 'Ability to read reports',
            resource: Resource.REPORT,
            actions: ActionType.READ
        }
    })

    const updateReportPerm = await prisma.permission.create({
        data: {
            name: 'UPDATE_REPORT',
            description: 'Ability to update reports',
            resource: Resource.REPORT,
            actions: ActionType.UPDATE
        }
    })

    const deleteReportPerm = await prisma.permission.create({
        data: {
            name: 'DELETE_REPORT',
            description: 'Ability to delete reports',
            resource: Resource.REPORT,
            actions: ActionType.DELETE
        }
    })

    // --------------- ALL Resources Permission (Admin only) ---------------
    const allResourcePerm = await prisma.permission.create({
        data: {
            name: 'MANAGE_ALL',
            description: 'Ability to perform any action on any resource',
            resource: Resource.ALL,
            actions: ActionType.CREATE // We'll use CREATE as a convention for full access
        }
    })

    logger.info('Permissions created successfully.')

    // Assign permissions to roles
    logger.info('Assigning permissions to roles...')

    // --------------- ADMIN Role Permissions ---------------
    // Admin gets the special MANAGE_ALL permission
    await prisma.rolePermission.create({
        data: {
            roleId: adminRole.id,
            permissionId: allResourcePerm.id
        }
    })

    // --------------- MODERATOR Role Permissions ---------------
    // Can READ all resources
    await prisma.rolePermission.createMany({
        data: [
            { roleId: moderatorRole.id, permissionId: readPostPerm.id },
            { roleId: moderatorRole.id, permissionId: readCommentPerm.id },
            { roleId: moderatorRole.id, permissionId: readReplyPerm.id },
            { roleId: moderatorRole.id, permissionId: readReportPerm.id }
        ]
    })

    // Can DELETE posts, comments, and replies (but not users)
    await prisma.rolePermission.createMany({
        data: [
            { roleId: moderatorRole.id, permissionId: deletePostPerm.id },
            { roleId: moderatorRole.id, permissionId: deleteCommentPerm.id },
            { roleId: moderatorRole.id, permissionId: deleteReplyPerm.id }
        ]
    })

    // Can manage reports
    await prisma.rolePermission.createMany({
        data: [
            { roleId: moderatorRole.id, permissionId: createReportPerm.id },
            { roleId: moderatorRole.id, permissionId: updateReportPerm.id },
            { roleId: moderatorRole.id, permissionId: deleteReportPerm.id }
        ]
    })

    // --------------- USER Role Permissions ---------------
    // Can CREATE posts, comments, replies, and reports
    await prisma.rolePermission.createMany({
        data: [
            { roleId: userRole.id, permissionId: createPostPerm.id },
            { roleId: userRole.id, permissionId: createCommentPerm.id },
            { roleId: userRole.id, permissionId: createReplyPerm.id },
            { roleId: userRole.id, permissionId: createReportPerm.id }
        ]
    })

    // Can READ posts, comments, replies, and other user profiles
    await prisma.rolePermission.createMany({
        data: [
            { roleId: userRole.id, permissionId: readPostPerm.id },
            { roleId: userRole.id, permissionId: readCommentPerm.id },
            { roleId: userRole.id, permissionId: readReplyPerm.id }
        ]
    })

    // Can UPDATE their own posts, comments, and replies (ownership check will be in application logic)
    await prisma.rolePermission.createMany({
        data: [
            { roleId: userRole.id, permissionId: updatePostPerm.id },
            { roleId: userRole.id, permissionId: updateCommentPerm.id },
            { roleId: userRole.id, permissionId: updateReplyPerm.id }
        ]
    })

    // Can DELETE their own posts, comments, and replies (ownership check will be in application logic)
    await prisma.rolePermission.createMany({
        data: [
            { roleId: userRole.id, permissionId: deletePostPerm.id },
            { roleId: userRole.id, permissionId: deleteCommentPerm.id },
            { roleId: userRole.id, permissionId: deleteReplyPerm.id }
        ]
    })

    logger.info('Role permissions assigned successfully.')

    logger.info('Seeding completed successfully!')
}

main().catch((e) => {
    logger.error(e)
    prisma
        .$disconnect()
        .then(() => {
            process.exit(1)
        })
        .catch((disconnectError) => {
            logger.error('Error during disconnection:', disconnectError)
            process.exit(1)
        })
})
