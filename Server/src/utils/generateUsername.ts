export function generateUniqueUsername(name: string): string {
    const nouns: string[] = ['lion', 'rocket', 'ninja', 'owl', 'tiger']
    const noun: string = nouns[Math.floor(Math.random() * nouns.length)]
    const randomString: string = Math.random().toString(36).substring(2, 10)
    const time: number = new Date().getMilliseconds()

    return `${name}_${noun}_${randomString}_${time}`
}
