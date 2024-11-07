import { IKeyStoreRepository } from '../Interfaces/IKeyStore'
import { KeyStore } from '../../Models/KeyStore'
import prisma from '../../Databases/PrismaConfig'


export class PrismaKeyStoreRepository implements IKeyStoreRepository {
    async create(keyStore: KeyStore): Promise<KeyStore> {
        return await prisma.keyStore.create({ data: keyStore })
    }

    async getById(id: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findUnique({ where: { id } })
    }

    async getAll(): Promise<KeyStore[]> {
        return await prisma.keyStore.findMany()
    }

    async update(id: string, keyStore: KeyStore): Promise<KeyStore | null> {
        return await prisma.keyStore.update({ where: { id }, data: keyStore })
    }

    async delete(id: string): Promise<void> {
        await prisma.keyStore.delete({ where: { id } })
    }

    async findByUserId(userId: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findFirst({ where: { userId } })
    }

    async findByAccessTokenKey(accessTokenKey: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findFirst({ where: { accessTokenKey } })
    }

    async findByRefreshTokenKey(refreshTokenKey: string): Promise<KeyStore | null> {
        return await prisma.keyStore.findFirst({ where: { refreshTokenKey } })
    }
}