export type School = {
    id: string
    name: string
    category: string
    location: { latitude: number; longitude: number }
    address?: string
    photoUri?: string
    website?: string
    phone?: string
}
