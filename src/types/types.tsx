export interface cardInterface {
    title: string
    description: string
    type: string
    item: itemInterface | null
    image: string,
    weight: number
}

export interface itemInterface {
    title: string
    description: string
    image: string
    weight?: number
}

export interface gameState {
    tableName: string;
    playerName: string;
    role: string
    items: itemInterface[]
}

export interface chatItem {
    userID: string,
    name: string,
    message: string
}

export interface chatRoom {
    id: string,
    name: string,
    description?: string,
    dateCreated: Date,
    lastUsed: Date,
    creator: string,
    owners?: string[],
    members?: string[],
    password?: string,
}

export interface Toast {
    mode?: "mute" | "verbose"
    successMode?: "mute" | "verbose"
    errorMode?: "mute" | "verbose"
    successTitle?: string
    successBody?: string
    successStatus?: "error" | "info" | "warning" | "success"
    errorTitle?: string
    errorFallBack?: string
    errorStatus?: "error" | "info" | "warning" | "success"
}