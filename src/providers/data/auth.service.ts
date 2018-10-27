import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthService {
    private basePath = "profile";
    private sessionPath = "session";

    constructor(private afAuth: AngularFireAuth, private googlePlus: GooglePlus) { }

    signIn(data) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
                .catch(err => reject(err));
        });
    }

    nativeGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            return this.googlePlus.login({
                'webClientId': '958166775358-8md4aqaht81u64jmq6tm5rrl1u0cckj9.apps.googleusercontent.com',
                'offline': true
            }).then(res => {
                const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
                firebase.auth().signInWithCredential(firecreds)
                    .then(success => { resolve(success); })
                    .catch(error => {
                        reject(error);
                    });
            });
        });
    }

    webGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            this.afAuth.auth.signInWithPopup(provider)
                .then(success => { resolve(success); })
                .catch(error => {
                    reject(error);
                });
        });
    }

    signUp(data) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
                .catch(err => reject(err));
        });
    }

    resetPassword(email: string) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
                .catch(err => reject(err));;
        });
    }

    logout() {
        return new Promise<any>((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut()
                resolve();
            }
            else {
                reject();
            }
        });
    }

    createUser(data: any) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref(this.basePath).child(uuid()).set(data)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
                .catch(err => reject(err));
        });
    }

    getProfile(key: string) {
        var promise = new Promise((resolve, reject) => {
            firebase.database().ref(this.basePath).orderByChild("email").equalTo(key).on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(element => {
                    let item = element.val();
                    item.key = element.key;
                    returnArr.push(item);
                });
                resolve(returnArr[0]);
            }, err => reject(err))
        });
        return promise;
    }


    addSession(data: any) {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref(this.sessionPath).child(uuid()).set(data)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
                .catch(err => reject(err));
        });
    }

    getSession() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                resolve(user);
            }, err => reject(err));
        });
    }
}
