export interface IUser
{
    email: string;
    name: string;
}

export type User = IUser | null | undefined;