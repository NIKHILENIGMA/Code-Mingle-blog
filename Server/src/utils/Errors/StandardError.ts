/**
 * Base class for all standard HTTP errors
 * Extends the built-in Error class with additional HTTP status code and serialization capabilities
 */
export abstract class StandardError extends Error {
    constructor(public message: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    }
    public abstract StatusCode: number
    public abstract serialize(): { message: string; field?: string }[]
}

