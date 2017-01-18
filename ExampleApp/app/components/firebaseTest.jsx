import React, {Component} from 'react';
import * as firebase from 'firebase';

export function get1(key){
    var rootRef = firebase.database().ref().child(key).orderByKey();
    var result = '';
    rootRef.on('value', snap => {
            result = Object.keys(snap.val()).map(function(k) { return snap.val()[k] });
            //console.log(result);
            return result;
        });

    
}


export var getChild =  function(key){
    var rootRef = firebase.database().ref().child(key).orderByKey();
    var result = '';
    rootRef.on('value', snap => {
            result = Object.keys(snap.val()).map(function(k) { return snap.val()[k] });
            //console.log(result);
            return result;
          });
  }

    