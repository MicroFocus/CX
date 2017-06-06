export class RegistrationInfo {
    name: string;
    famName: string;
    jobTitle: string;
    email: string;
    birthDate: Date;
    location: Object;
    zip: string;
    salut: string;
}

export interface RegistrationService {
    getRegistrationInfo(): RegistrationInfo;
}
