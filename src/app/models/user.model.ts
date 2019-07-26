import { ProfileEnum } from "../enums/profile.enum";

export class UserModel {
    id: string;
    email: string;
    pass: string;
    name: string;
    identType: string;
    ident: string;
    lastname: string;
    address: string;
    phone: string;
    profile: ProfileEnum;
    state: boolean;

    constructor(
        key?: string,
        email?: string,
        pass?: string,
        name?: string,
        identType?: string,
        ident?: string,
        lastname?: string,
        address?: string,
        phone?: string,
        profile?: ProfileEnum,
        state?: boolean
    ) { }
}