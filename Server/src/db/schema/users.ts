import { sql } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { generateUniqueUsername } from './../../utils/generateUsername'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const userStatusEnum = pgEnum('user_status', ['active', 'inactive', 'banned', 'pending'])

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    username: varchar('username', { length: 255 })
        .notNull()
        .unique()
        .$default(() => sql`${generateUniqueUsername()}`),
    bio: text('bio'),
    status: userStatusEnum('status').notNull().default('active'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
})

// Explicitly type the schema to avoid unsafe error assignments
export const insertUserSchema = createInsertSchema(users) as z.ZodObject<{
    id: z.ZodOptional<z.ZodString>
    email: z.ZodString
    firstName: z.ZodString
    lastName: z.ZodString
    username: z.ZodOptional<z.ZodString>
    bio: z.ZodOptional<z.ZodString>
    status: z.ZodOptional<z.ZodEnum<['active', 'inactive', 'banned', 'pending']>>
    createdAt: z.ZodOptional<z.ZodDate>
    updatedAt: z.ZodOptional<z.ZodDate>
}>
export const selectUserSchema = createSelectSchema(users) as z.ZodObject<{
    id: z.ZodString
    email: z.ZodString
    firstName: z.ZodString
    lastName: z.ZodString
    username: z.ZodOptional<z.ZodString>
    bio: z.ZodOptional<z.ZodString>
    status: z.ZodOptional<z.ZodEnum<['active', 'inactive', 'banned', 'pending']>>
    createdAt: z.ZodOptional<z.ZodDate>
    updatedAt: z.ZodOptional<z.ZodDate>
}>

// Custom validation schemas
export const createUserSchema = insertUserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type CreateUser = z.infer<typeof createUserSchema>
