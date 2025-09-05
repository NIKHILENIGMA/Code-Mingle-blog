import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool, PoolConfig } from 'pg'
import * as schema from '@/db/schema'
import { DATABASE_URL, PG_IDLE_TIMEOUT_MS } from '@/config/db.config'
import { logger } from '@/utils/logger'

const poolConfig: PoolConfig = {
    connectionString: DATABASE_URL,
    max: 20, // set max pool size
    idleTimeoutMillis: Number.isFinite(PG_IDLE_TIMEOUT_MS) ? PG_IDLE_TIMEOUT_MS : 3000, // set idle timeout
    connectionTimeoutMillis: 2000 // set connection timeout
}

const pool = new Pool(poolConfig)

// Initialize the database connection
export const db = drizzle(pool, { schema })

// Export types for use through out
export type Database = typeof db

process.on('SIGINT', () => {
    pool.end()
        .then(() => process.exit(0))
        .catch((err) => {
            logger.error('Error closing database pool:', err)
            process.exit(1)
        })
})
