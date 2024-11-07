import { genSalt, hash, compare } from 'bcrypt'

/**
 * The function HashedPassword hashes a given password using a salt generated with a specified number
 * of rounds.
 * @param {string} password - The `HashedPassword` function takes a `password` parameter of type
 * string. This password will be hashed using a salt generated with a specified number of rounds.
 * @returns The `HashedPassword` function is returning the hashed password after hashing the input
 * password using a salt generated with a specified number of rounds.
 */
async function HashedPassword(password: string): Promise<string> {
    // Hash password
    const saltRounds = process.env.HASH_PASSWORD_SALT ? parseInt(process.env.HASH_PASSWORD_SALT) : 10
    
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}


/**
 * The function `ComparePassword` asynchronously compares a plain text password with a hashed password.
 * @param {string} password - The `password` parameter is a string that represents the plain text
 * password that the user entered.
 * @param {string} hashedPassword - The `hashedPassword` parameter is a string that represents the
 * hashed version of a password. 
 * @returns The `ComparePassword` function is returning a promise that resolves to the result of
 * comparing the provided `password` with the `hashedPassword`. The comparison is done using the
 * `compare` function, which is likely a function that compares the plain text password with the hashed
 * password to check if they match.
 */
async function ComparePassword(password: string, hashedPassword: string): Promise<boolean> {
    // Compare password
    return await compare(password, hashedPassword)
}

export { HashedPassword, ComparePassword }
