
export function generateUniqueUsername(): string {
    const nouns: string[] = ['analyst', 'architect', 'director', 'engineer', 'manager', 'consultant', 'strategist', 'developer', 'advisor', 'specialist']
    const words: string[] = ['user', 'guest']
    const noun: string = nouns[Math.floor(Math.random() * nouns.length)]
    const word: string = words[Math.floor(Math.random() * words.length)]
    const randomString: string = Math.random().toString(36).substring(2, 10)
    const time: number = new Date().getMilliseconds()

    return `${word}_${noun}_${randomString}_${time}` // e.g. user_analyst_k8j2m1p0_123 or guest_architect_j5h3k2l1_456
}
