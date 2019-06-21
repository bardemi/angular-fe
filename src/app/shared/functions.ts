export const toBase64 = (username: string, password: string) =>
    window.btoa(`${username}:${password}`)
