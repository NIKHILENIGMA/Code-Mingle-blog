// policies/policyRules.static.ts
type Role = 'ADMIN' | 'USER' | 'MODERATOR' | 'GUEST'
type Actions = 'READ' | 'WRITE' | 'DELETE' | 'UPDATE' | 'SHOW'  
type Resources = 'POST' | 'COMMENT' | 'USER' | 'ADMIN_PANEL' | '*'


export interface ABACRule {
    role: Role // e.g., 'USER', 'MODERATOR', 'ADMIN'
    resource: Resources // e.g., 'post', 'user', '*'
    actions: Actions[] // e.g., ['create', 'read', 'edit', 'delete']
    condition: string // condition string evaluated using DSL (e.g. "user.id === resource.authorId")
}

export const policyRules: ABACRule[] = [
    // 🔒 ADMIN: Full access to all resources and actions
    {
        role: 'ADMIN',
        resource: '*',
        actions: ['READ', 'WRITE', 'DELETE', 'UPDATE', 'SHOW'],
        condition: 'true'
    },

    // 🔒 MODERATOR: Full access to post moderation, not users
    {
        role: 'MODERATOR',
        resource: 'POST',
        actions: ['READ', 'WRITE', 'DELETE'],
        condition: 'true'
    },

    // 👤 USER: Can create and read any post
    {
        role: 'USER',
        resource: 'POST',
        actions: ['WRITE', 'READ'],
        condition: 'true'
    },

    // 👤 USER: Can edit/delete only their own post
    {
        role: 'USER',
        resource: 'POST',
        actions: ['UPDATE', 'DELETE'],
        condition: 'user.id === resource.authorId'
    }

    // 👤 USER: Cannot manage other users, so no rule on 'user' resource
    // Add additional user-specific conditions as needed
]
