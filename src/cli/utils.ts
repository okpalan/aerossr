export function createResource(type: string, name: string): void {
    switch (type.toLowerCase()) {
        case 'user':
            createUser(name);
            break;
        case 'project':
            createProject(name);
            break;
        case 'task':
            createTask(name);
            break;
        default:
            console.error(`Error: Unknown resource type '${type}'.`);
            process.exit(1);
    }
}

function createUser(name: string): void {
    console.log(`User '${name}' created successfully.`);
    // Add additional user creation logic here (e.g., database operations).
}

function createProject(name: string): void {
    console.log(`Project '${name}' created successfully.`);
    // Add additional project creation logic here.
}

function createTask(name: string): void {
    console.log(`Task '${name}' created successfully.`);
    // Add additional task creation logic here.
}



export function deleteResource(type: string, name: string): void {
    console.log(`Deleting ${type} named '${name}'...`);
    // Implement deletion logic here
}

export function delet