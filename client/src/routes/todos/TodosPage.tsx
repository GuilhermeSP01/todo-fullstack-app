import fetchTodos from "@/components/hooks/fetchTodos";
import { Button } from "@/components/ui/button";

export default function TodosPage() {

    const data = fetchTodos();

    function handleClick() {
        console.log(data);
    }

    return (
        <main>
            <Button onClick={handleClick}> Todos </Button>
        </main>
    )
}