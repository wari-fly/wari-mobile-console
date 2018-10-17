import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    signIn(data) {
        return this.afAuth.auth.signInWithEmailAndPassword(data.email,
            data.password);
    }

    signUp(data) {
      return  this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
            // .then(newUser => {
            //     firebase.database()
            //         .ref('/profile/')
            //         .child(newUser.user.uid)
            //         .set(data);
            // });
    }

    resetPassword(email: string) {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logout() {
        return this.afAuth.auth.signOut();
    }
}
