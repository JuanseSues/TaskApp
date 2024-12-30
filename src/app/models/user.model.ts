// Define the User interface which represents a user in the application
export interface User {
    uid: string,        // Unique identifier for the user
    name: string,       // Name of the user
    email: string,      // Email address of the user
    password?: string,  // Optional password for the user
}