// import { IKeyStoreRepository } from '../Interfaces/IKeyStore'
import { KeyStore } from '../../Models/KeyStore'
import prisma from '../../database/PrismaConnection'
import { ApiError } from '../../../utils/ApiError'
import { IKeyStoreRepository } from '../Interfaces/IKeyStore'



export class PrismaKeyStoreRepository implements IKeyStoreRepository {
    /**
     * Creates a new key store entry in the database.
     *
     * @param {KeyStore} data - The key store data to be created.
     * @returns {Promise<KeyStore>} A promise that resolves to the created key store.
     * @throws {ApiError} Throws an error if there is an issue while creating the key store.
     */
    public async create(data: Partial<KeyStore>): Promise<KeyStore> {
        try {
            const keyStore = await prisma.keyStore.findFirst({ where: { userId: data.userId } })

            if (!keyStore) {
                const store = await prisma.keyStore.create({
                    data: {
                        userId: data.userId as string,
                        accessKey: data.accessKey as string,
                        refreshKey: data.refreshKey as string   
                    }
                })

                return store
            } else {
                const store = await prisma.keyStore.update({
                    where: {
                        id: keyStore.id
                    },
                    data
                })

                return store
            }
        } catch (error) {
            throw new ApiError(500, 'Error while creatinga key store Error : ' + (error as Error)?.message)
        }
    }

    public async update(id: string, data: Partial<KeyStore>): Promise<KeyStore | null> {
        if (!id || !data) {
            return null
        }
        await Promise.resolve()
        return null
    }

    public async delete(id: string): Promise<void> {
        if (!id) {
            return
        }
        await Promise.resolve()
    }


    public async findKeyStoreByUserId(userId: string): Promise<KeyStore | null> {
        try {
            const store = await prisma.keyStore.findFirst({
                where: {
                    userId
                }
            })

            return store
        } catch (error) {
            throw new ApiError(500, 'Error while finding key store by userId Error : ' + (error as Error)?.message)
        }
    }

    public async findByAccessKey(accessTokenKey: string): Promise<KeyStore | null> {
        try {
            const store = await prisma.keyStore.findFirst({
                where: {
                    accessKey: accessTokenKey
                }
            })

            return store
        } catch (error) {
            throw new ApiError(500, 'Error while finding key store by access token key Error : ' + (error as Error)?.message)
            
        }
    }
    public async removeTokens(id: number): Promise<void> {
        try {
            await prisma.keyStore.delete({ where: { id } })
        } catch (error) {
            throw new ApiError(500, 'Error while removing keys by id Error : ' + (error as Error)?.message)
        }
    }
}
