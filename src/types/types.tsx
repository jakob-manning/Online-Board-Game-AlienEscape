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
    id:string
    userID: string,
    userName: string,
    message: string,
    timeStamp?: Date,
}

export type roomID = string

export type userID = string

export interface membersDict {
    [roomID: string]: boolean;
}

export interface chatRoom {
    id: roomID,
    name: string,
    description?: string,
    dateCreated: Date,
    lastUpdated: Date,
    updatedBy: string,
    lastSeen: Date,
    creator: string,
    owners?: string[],
    members: string[],
    password?: string,
    admin?:string[],
    messages: chatItem[],
    membersRead: membersDict
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

export interface chatPayload {
    newMessage: chatItem
    room: roomID
}

export interface roomDict {
    [index: string]: chatRoom;
}

export interface userInterface {
    name: string
    email: string
    id: string
    active: boolean
}

export interface userDict {
    [index: string]: userInterface;
}