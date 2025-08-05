import { Permission } from '@/features/users/authentication/auth.types'

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


// const permissions = [
//     {
//         id: 'cmbp8xnku0003i1hgbuyhhuxx',
//         name: 'CREATE_POST',
//         resource: 'POST',
//         actions: 'CREATE'
//     },
//     {
//         id: 'cmbp8xnla0007i1hgs7zg6rds',
//         name: 'CREATE_COMMENT',
//         resource: 'COMMENT',
//         actions: 'CREATE'
//     },
//     {
//         id: 'cmbp8xnlk000bi1hguzg6obhb',
//         name: 'CREATE_REPLY',
//         resource: 'REPLY',
//         actions: 'CREATE'
//     },
//     {
//         id: 'cmbp8xnlv000gi1hgtuo6fqx9',
//         name: 'CREATE_REPORT',
//         resource: 'REPORT',
//         actions: 'CREATE'
//     },
//     {
//         id: 'cmbp8xnl10004i1hgsypmej3d',
//         name: 'READ_POST',
//         resource: 'POST',
//         actions: 'READ'
//     },
//     {
//         id: 'cmbp8xnlc0008i1hg84jyubzf',
//         name: 'READ_COMMENT',
//         resource: 'COMMENT',
//         actions: 'READ'
//     },
//     {
//         id: 'cmbp8xnlm000ci1hgay148htw',
//         name: 'READ_REPLY',
//         resource: 'REPLY',
//         actions: 'READ'
//     },
//     {
//         id: 'cmbp8xnl60005i1hgjrilof1s',
//         name: 'UPDATE_POST',
//         resource: 'POST',
//         actions: 'UPDATE'
//     },
//     {
//         id: 'cmbp8xnlg0009i1hgrh3k9fv1',
//         name: 'UPDATE_COMMENT',
//         resource: 'COMMENT',
//         actions: 'UPDATE'
//     },
//     {
//         id: 'cmbp8xnlo000di1hg5yu23wi7',
//         name: 'UPDATE_REPLY',
//         resource: 'REPLY',
//         actions: 'UPDATE'
//     },
//     {
//         id: 'cmbp8xnl80006i1hgbsilsivn',
//         name: 'DELETE_POST',
//         resource: 'POST',
//         actions: 'DELETE'
//     },
//     {
//         id: 'cmbp8xnli000ai1hg4qfzn6e6',
//         name: 'DELETE_COMMENT',
//         resource: 'COMMENT',
//         actions: 'DELETE'
//     },
//     {
//         id: 'cmbp8xnlq000ei1hgfgja9icp',
//         name: 'DELETE_REPLY',
//         resource: 'REPLY',
//         actions: 'DELETE'
//     }
// ]

// "permissions": {
//   "POST": ["CREATE", "READ", "UPDATE", "DELETE"],
//   "COMMENT": ["CREATE", "READ", "UPDATE", "DELETE"],
//   "REPLY": ["CREATE", "READ", "UPDATE", "DELETE"],
//   "REPORT": ["CREATE"]
// }