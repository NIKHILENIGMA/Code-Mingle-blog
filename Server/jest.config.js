/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__test__/**/*.test.ts'],
    transform: {
        '^.+\.tsx?$': ['ts-jest', {}]
    },
    modulePathIgnorePatterns: ['dist', 'node_modules']
}
