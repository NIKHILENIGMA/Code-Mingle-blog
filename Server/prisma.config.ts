import path from 'path'
import { defineConfig } from 'prisma/config'
import 'dotenv-flow'

export default defineConfig({
    schema: path.join('db', 'schema.prisma'),
    migrations: {
        path: path.join('db', 'migrations'),
        seed: 'tsx db/seed.ts'
    }
})
