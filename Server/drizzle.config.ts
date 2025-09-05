import { defineConfig } from 'drizzle-kit'
import { appConfig } from '@/config' // Envi

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: appConfig.DATABASE_URL!,
    },
    verbose: true, // Enable verbose logging,
    strict: true, // Enable strict mode to catch potential issues
})
