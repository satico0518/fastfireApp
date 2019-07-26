import { LocationModel } from "./location.model";

export class CustomerModel {
    name: string;
    brand: string;
    identType: string;
    ident: string;
    contact: string;
    email: string;
    address: string;
    phone: string;
    locaciones: LocationModel;
    state: boolean;
    plans: Array<any>;
    icon: string;

    constructor(
        name?: string,
        identType?: string,
        ident?: string,
        contact?: string,
        email?: string,
        address?: string,
        phone?: string,
        locaciones?: LocationModel,
        brand?: string,
        state?: boolean,
        plans?: Array<any>,
        icon?: string
    ) {}
}