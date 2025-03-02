
export function setCurrentUser(key: string, value: string) {
    localStorage.setItem(key, value)
}

export function getCurrentUser(key: string) {
    return localStorage.getItem(key)
}

export function removeCurrentUser(key: string) {
    localStorage.removeItem(key)
}