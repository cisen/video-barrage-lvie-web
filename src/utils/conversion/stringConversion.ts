export const liveKeyDesensitization = (key: string) :string => {
    const str = key.slice(0, 8) + "****" + key.slice(key.length - 4);
    return str
}