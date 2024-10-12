import { useQuery } from "@tanstack/react-query";

async function queryFunction() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/users/${userId}/todos`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    });

    const data = response.json();

    return data;
}

export default function fetchTodos() {
    
    const { data } = useQuery({
        queryKey: ['todos'],
        queryFn: queryFunction
    });

    return data;
}