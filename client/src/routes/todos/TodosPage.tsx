import fetchTodos from "@/components/hooks/fetchTodos";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Target Date</TableHead>
                        <TableHead>Done</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((data: Todo) => (
                        <TableRow key={data.id}>
                            <TableCell>{data.title}</TableCell>
                            <TableCell>{data.description}</TableCell>
                            <TableCell>{data.targetDate}</TableCell>
                            <TableCell>{data.done.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </main>
    )
}