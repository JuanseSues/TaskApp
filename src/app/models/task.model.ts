// Define the Task interface which represents a task in the application
export interface Task {
    id: string,          // Unique identifier for the task
    title: string,       // Title of the task
    description: string, // Description of the task
    items: Item[]        // Array of items associated with the task
}

// Define the Item interface which represents an item within a task
export interface Item {
    name: string,        // Name of the item
    completed: boolean   // Boolean indicating whether the item is completed
}