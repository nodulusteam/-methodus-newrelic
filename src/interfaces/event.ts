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
    message: string;
    timestamp?: number;
    service?: string;
    hostname?: string;
}