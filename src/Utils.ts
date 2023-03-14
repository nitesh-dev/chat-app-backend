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

export interface DatabaseResponse{
    status: Status,
    data: any,
    error: string
}

export enum Status{
    Ok = 200,
    Forbidden = 404,
}

export enum MessageStatus{
    NotSeen = 10,
    Seen = 11,
    NotReached = 12
}
