export const corsOptions = {
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: process.env.CORS_ORIGIN,
    credentials: true
}
