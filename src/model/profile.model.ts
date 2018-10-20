export interface ProfileModel {
    uid: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    displayName?: string;
    photo?: File;
}