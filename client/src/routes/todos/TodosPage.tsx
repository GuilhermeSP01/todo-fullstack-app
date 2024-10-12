import fetchTodos from "@/components/hooks/fetchTodos";
import { Button } from "@/components/ui/button";

interface Todo {
    id: number
    title: string
    description: string
    targetDate: string
    done: boolean
}

export default function TodosPage() {

    const data = fetchTodos();

    function handleClick() {
        console.log(data);
    }

    return (
        <main>
            <Button onClick={handleClick}> Todos </Button>

            <ul>
                {data?.map((data: Todo) => (
                    <li key={data.id}>
                        {data.title}, {data.description}, {data.targetDate}, {data.done.toString()}
                    </li>
                ))}
            </ul>
        </main>
    )
}