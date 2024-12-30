import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth, // Inject AngularFireAuth service for authentication
    private db: AngularFirestore,  // Inject AngularFirestore service for Firestore database operations
    private utilsSvc: UtilsService // Inject utility service for common operations
  ) { }

  // ------Auth------

  // Method to log in a user
  login(user: User){
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  // Method to sign up a new user
  signUp(user: User){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  // Method to update the user's profile
  async updateUser(user: any){
    const currentUser = await this.auth.currentUser;
    if (currentUser) {
      return currentUser.updateProfile(user);
    }
  }

  // Method to get the authentication state
  getAuthState(){
    return this.auth.authState;
  }

  // Method to sign out the user
  async signOut(){
    await this.auth.signOut();
    this.utilsSvc.routerLink('/auth'); // Redirect to the authentication page
    localStorage.removeItem('user');   // Remove user data from local storage
  }

  // ------Firestore Database------

  // Method to get a sub-collection from Firestore
  getSubCollection(path: string, subcollectionName: string){
    return this.db.doc(path).collection(subcollectionName).valueChanges({idField: 'id'});
  }

  // Method to add an object to a sub-collection in Firestore
  addToSubCollection(path: string, subcollectionName: string, object: any){
    return this.db.doc(path).collection(subcollectionName).add(object);
  }

  // Method to update a document in Firestore
  updateDocument(path: string, object: any){
    return this.db.doc(path).update(object);
  }

  // Method to delete a document from Firestore
  deleteDocument(path: string){
    return this.db.doc(path).delete();
  }

}