import { IPromise } from 'angular';

export interface UserConfig {
    userDN: string;
    ldapProfile: string;
    userID: string;
    userEmailAddress: string;
    passwordLastModifiedTime: string;
}

export interface SsprService {
    getGeneratedPasswords(): IPromise<string[]>;
    readUserConfig(username: string, password: string): IPromise<UserConfig>;
}
