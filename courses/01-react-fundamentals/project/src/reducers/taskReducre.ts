import type { Task } from '../components/TaskList'

export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'
export const SET_TASKS = 'SET_TASKS'

export type TaskAction =
    | {
        type: 'ADD_TASK'
        payload: Task
    }
    | {
        type: 'UPDATE_TASK'
        payload: {
            id: string | number
            title: string
            description: string
            priority: string
        }
    }
    | {
        type: 'DELETE_TASK'
        payload: string | number
    }
    | {
        type: 'TOGGLE_TASK'
        payload: string | number
    }
    | {
        type: 'SET_TASKS'
        payload: Task[]
    }

export function taskReducer(
    state: Task[],
    action: TaskAction
): Task[] {
    switch (action.type) {
        // Add a new task
        case 'ADD_TASK':
            return [...state, action.payload]

        // Update an existing task
        case 'UPDATE_TASK':
            return state.map((task) =>
                task.id === action.payload.id
                    ? {
                        ...task,
                        title: action.payload.title,
                        description: action.payload.description,
                        priority: action.payload.priority,
                    }
                    : task
            )

        // Delete a task
        case 'DELETE_TASK':
            return state.filter(
                (task) => task.id !== action.payload
            )

        // Toggle task completion
        case 'TOGGLE_TASK':
            return state.map((task) =>
                task.id === action.payload
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )

        case 'SET_TASKS':
            return action.payload

        default:
            return state
    }
}