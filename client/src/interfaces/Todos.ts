export interface TodoProps {
    completed: boolean;
    createdAt: string;
    createdBy: string;
    description: string;
    name: string;
    __V: number;
    _id: string;
}

export interface TodosProps {
    todos: Array<TodoProps>;
}
