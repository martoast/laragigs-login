export interface User {
    readonly uuid: string,
    readonly email: string,
    readonly email_verified_at: Date,
    readonly created_at: Date,
    readonly updated_at: Date
}