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