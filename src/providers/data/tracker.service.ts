import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class TrackerService {

    private basePath = "wari";
    constructor() { }

    getAllToLimit(numberItems) {
        var promise = new Promise((resolve, reject) => {
            firebase.database().ref(this.basePath).limitToFirst(numberItems).on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(element => {
                    let item = element.val();
                    item.key = element.key;
                    returnArr.push(item);
                });
                resolve(returnArr);
            }, err => reject(err))
        });
        return promise;
    }

    getAll() {
        var promise = new Promise((resolve, reject) => {
            firebase.database().ref(this.basePath).on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(element => {
                    let item = element.val();
                    item.key = element.key;
                    returnArr.push(item);
                });
                resolve(returnArr);
            }, err => reject(err))
        });
        return promise;
    }
    
    getTraking(latiude: number, longitude: number) {
        const error: number = 0.5;
        var promise = new Promise((resolve, reject) => {
            firebase.database().ref(this.basePath).on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(element => {
                    let item = element.val();
                    item.key = element.key;
                    const coordenadas = item.coordenadas;
                    let flag = false;
                    coordenadas.forEach(d => {
                        if (((d.latitud - error) <= latiude && latiude <= (d.latitud + error)) && ((d.logitud - error) <= longitude && longitude <= (d.logitud + error))) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        returnArr.push(item);
                    }
                });
                resolve(returnArr);
            }, err => reject(err))
        });
        return promise;
    }

    getByKey(key: string) {
        var promise = new Promise((resolve, reject) => {
            firebase.database().ref(this.basePath + '/' + key).on("value", (snapshot) => {
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
}

