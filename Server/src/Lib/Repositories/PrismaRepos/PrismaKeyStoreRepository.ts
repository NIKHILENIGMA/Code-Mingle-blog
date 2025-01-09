import prisma from '../../database/PrismaConnection'
import { KeyStore } from '../../Models/KeyStore'
import { IKeyStoreRepository } from '../Interfaces/IKeyStore'

export class PrismaKeyStoreRepository implements IKeyStoreRepository {
    /**
     * Creates a new key store entry in the database.
     *
     * @param {KeyStore} data - The key store data to be created.
     * @returns {Promise<KeyStore>} A promise that resolves to the created key store.
     * @throws {ApiError} Throws an error if there is an issue while creating the key store.
     */
    public async create(keyStore: Partial<KeyStore>): Promise<KeyStore> {
        const payload = {
            userId: keyStore.userId as string,
            accessKey: keyStore.accessKey as string,
            refreshKey: keyStore.refreshKey as string
        }

        const createdStore = await prisma.keyStore.create({
            data: payload
        })

        return createdStore
    }

    public async update(where: { id: number }, data: Partial<KeyStore>): Promise<KeyStore | null> {
        const keyStore = await prisma.keyStore.update({
            where: where,
            data
        })

        return keyStore
    }

    public async delete(where: { id: number }): Promise<void> {
        await prisma.keyStore.delete({
            where: where
        })
    }

    public async findKeyStoreByUserId(userId: string): Promise<KeyStore | null> {
        const store = await prisma.keyStore.findFirst({
            where: {
                userId
            }
        })

        return store
    }

    public async findKeyStoreByAccessKey(accessTokenKey: string): Promise<KeyStore | null> {
        const store = await prisma.keyStore.findFirst({
            where: {
                accessKey: accessTokenKey
            }
        })

        return store
    }

    public async findKeyStoreByIdAndRefreshKey(userId: string, refreshTokenKey: string): Promise<KeyStore | null> {
        const store = await prisma.keyStore.findUnique({
            where: {
                userId: userId,
                refreshKey: refreshTokenKey
            }
        })

        return store
    }

    public async deleteKeyStoreByRefreshKey(refreshTokenKey: string): Promise<void> {
        await prisma.keyStore.delete({
            where: {
                refreshKey: refreshTokenKey
            }
        })
    }
}
