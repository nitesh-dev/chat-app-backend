export interface Chat {
    sender: number,
    receiver: number,
    message: string
}

export function repeat(n, callback: (i: number) => void) {
    for (let i = 0; i < n; i++) {
        callback(i)
    }
}
