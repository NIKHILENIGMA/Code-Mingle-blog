import { z } from 'zod'


export const createActivitySchema = z.object({
    activity: z.string().min(1, 'Activity is required'),
    duration: z.number().min(1, 'Duration is required'),
    date: z.string().min(1, 'Date is required')
})

export const updateActivitySchema = z.object({
    activity: z.string().min(1, 'Activity is required'),
    duration: z.number().min(1, 'Duration is required'),
    date: z.string().min(1, 'Date is required')
})

export const deleteActivitySchema = z.object({
    id: z.string().min(1, 'Id is required')
})

export const getActivitySchema = z.object({
    id: z.string().min(1, 'Id is required')
})