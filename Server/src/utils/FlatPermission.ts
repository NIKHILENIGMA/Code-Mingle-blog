import { Permission } from '@/features/authentication/auth.types'

export type FlattenedPermissions = Record<string, string[]>

export function flatPermissions(permissions: Permission[]): FlattenedPermissions {
    const result: FlattenedPermissions = {}
    for (const perm of permissions) {
        const { resource, actions } = perm
        if (!result[resource]) {
            result[resource] = []
        }

        if (!result[resource].includes(actions)) {
            result[resource].push(actions)
        }
    }

    return result
}
