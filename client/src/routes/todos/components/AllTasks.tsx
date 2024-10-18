import fetchTodos from "@/components/hooks/fetchTodos";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Todo {
    id: number
    title: string
    description: string
    targetDate: string
    done: boolean
}



export default function AllTasks() {

    const data = fetchTodos();
    
    return(
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead> Título </TableHead>
                        <TableHead> Descrição </TableHead>
                        <TableHead> Data </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {data?.map((data: Todo) => (
                        <TableRow key={data.id} className="h-16">
                            <TableCell className="w-[5%]"></TableCell>
                            <TableCell> {data.title} </TableCell>
                            <TableCell> {data.description} </TableCell>
                            <TableCell> {data.targetDate} </TableCell>
                            <TableCell className="w-[5%]">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0"> ... </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel> Concluir </DropdownMenuLabel>
                                        <DropdownMenuLabel> Editar </DropdownMenuLabel>
                                        <DropdownMenuLabel> Deletar </DropdownMenuLabel>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    )
}