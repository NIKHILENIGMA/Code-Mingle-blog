// import { IKeyStoreRepository } from '../Interfaces/IKeyStore'
import { KeyStore } from '../../Models/KeyStore'
import { PrismaClient } from '@prisma/client'
import { ApiError } from '../../../utils/ApiError'
import { IGenericsRepository } from '../Interfaces/IGenericsRepository'
const prisma = new PrismaClient()

export class PrismaKeyStoreRepository implements IGenericsRepository<KeyStore> {
    public async create(data: KeyStore): Promise<KeyStore> {
        try {
            const store = await prisma.keyStore.create({
                data
            })

            return store
        } catch (error) {
            throw new ApiError(500, 'Error while creating key store Error : ' + (error as Error)?.message)
        }
    }

    async getById(id: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findUnique({ where: { id: parseInt(id) } })
    }

    async getAll(): Promise<KeyStore[]> {
        return await prisma.keyStore.findMany()
    }

    async update(id: string, keyStore: KeyStore): Promise<KeyStore | null> {
        return await prisma.keyStore.update({ where: { id: parseInt(id) }, data: keyStore })
    }

    async delete(id: string): Promise<void> {
        await prisma.keyStore.delete({ where: { id: parseInt(id) } })
    }

    async findByUserId(userId: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findFirst({ where: { userId } })
    }

    async findByAccessTokenKey(accessKey: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findFirst({ where: { accessKey } })
    }

    async findByRefreshTokenKey(refreshKey: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findFirst({ where: { refreshKey } })
    }
}
