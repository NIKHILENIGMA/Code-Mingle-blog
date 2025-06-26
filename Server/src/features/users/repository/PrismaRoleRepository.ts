import prisma from '@/config/prisma.config'
import { DatabaseError } from '@/utils/Errors'
import { Role } from '@prisma/client'

export interface IRoleRepository {
    createRole(name: string, description?: string): Promise<Role>
    updateRole(roleId: string, name?: string, description?: string): Promise<Role>
    deleteRole(roleId: string): Promise<Role>
    getRoleById(roleId: string): Promise<Role | null>
    getRoleByName(roleName: string): Promise<Role | null>
}

export class PrismaRoleRepository implements IRoleRepository {
    public async createRole(name: string, description?: string): Promise<Role> {
        try {
            const newRole = await prisma.role.create({
                data: {
                    name,
                    description,
                    displayName: name.charAt(0).toUpperCase() + name.slice(1) // Capitalize the first letter
                }
            })

            return newRole
        } catch (error) {
            throw new DatabaseError(`Error creating role: ${(error as Error).message}`, 'PrismaRoleRepository.createRole')
        }
    }

    public async updateRole(roleId: string, name?: string, description?: string): Promise<Role> {
        try {
            return await prisma.role.update({
                where: { id: roleId },
                data: {
                    name,
                    description,
                    displayName: name ? name.charAt(0).toUpperCase() + name.slice(1) : undefined // Capitalize the first letter
                }
            })
        } catch (error) {
            throw new DatabaseError(`Error updating role: ${(error as Error).message}`, 'PrismaRoleRepository.updateRole')
        }
    }

    public async deleteRole(roleId: string): Promise<Role> {
        try {
            return await prisma.role.delete({
                where: { id: roleId }
            })
        } catch (error) {
            throw new DatabaseError(`Error deleting role: ${(error as Error).message}`, 'PrismaRoleRepository.deleteRole')
        }
    }

    public async getRoleById(roleId: string): Promise<Role | null> {
        if (!roleId) {
            throw new DatabaseError('Role ID cannot be empty', 'PrismaRoleRepository.getRoleById')
        }

        try {
            return await prisma.role.findUnique({
                where: { id: roleId }
            })
        } catch (error) {
            throw new DatabaseError(`Error fetching role by ID: ${(error as Error).message}`, 'PrismaRoleRepository.getRoleById')
        }
    }

    public async getRoleByName(roleName: string): Promise<Role | null> {
        if (!roleName) {
            throw new DatabaseError('Role name cannot be empty', 'PrismaRoleRepository.getRoleByName')
        }

        try {
            return prisma.role.findUnique({
                where: { name: roleName }
            })
        } catch (error) {
            throw new DatabaseError(`Error fetching role by name: ${(error as Error).message}`, 'PrismaRoleRepository.getRoleByName')
        }
    }
}
