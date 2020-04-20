export interface Events {
    common?: {
        attributes: {
            service: string,
            hostname: string,
            environment?: string
        }
    },
    logs: Entry[]
}

export interface Entry {
    timestamp: number;
    message: string;
    service?: string;
    hostname?: string;
}