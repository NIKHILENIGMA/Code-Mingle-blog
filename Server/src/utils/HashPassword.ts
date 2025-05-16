import argon2 from 'argon2'
import { ARGON_MEMORY_COST, ARGON_PARALLELISM, ARGON_TIME_COST } from '@/config/app.config'

export async function hashedPassword(password: string): Promise<string> {
    // Hash password
    const hashOptions = {
        type: argon2.argon2id, // Use Argon2id (recommended)
        memoryCost: ARGON_MEMORY_COST, // 64MB RAM usage
        timeCost: ARGON_TIME_COST, // 3 iterations
        parallelism: ARGON_PARALLELISM // Parallelism factor
    }

    return await argon2.hash(password, hashOptions)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    // Compare password
    return await argon2.verify(hashedPassword, password)
}
