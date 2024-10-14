import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoneTasks from "./components/DoneTasks";
import PendingTasks from "./components/PendingTasks";
import AllTasks from "./components/AllTasks";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function TodosPage() {

    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <main className="bg-[hsl(240,6.67%,8.82%)] h-screen w-screen">
            
            <nav className="text-white flex justify-between px-12 py-6 mb-4 border-b border-[hsl(240,3.9%,15.1%)]">
                <ul className="flex gap-10">
                    <li> Logo </li>
                    <li> Home </li>
                    <li> Tarefas </li>
                </ul>
                
                <div className="flex gap-8">
                    <p> Sair </p>
                    <p> Foto </p>
                </div>
            </nav>

           <div className="w-full flex">
                <div className="w-3/4">
                    <Tabs defaultValue="pending" className="w-full px-10">

                        <div className="w-full flex justify-between mb-2">
                            <TabsList>
                                <TabsTrigger value="pending"> Pendentes </TabsTrigger>
                                <TabsTrigger value="done"> Concluídas </TabsTrigger>
                                <TabsTrigger value="all"> Todas </TabsTrigger>
                            </TabsList>

                            <Button variant="secondary" className="justify-self-end"> Adicionar Tarefa </Button>
                        </div>

                        <Card className="w-full border-[hsl(240,3.9%,15.1%)]">
                            {/* <CardHeader> Lista de tarefas </CardHeader> */}
                            {/* <CardDescription> {localStorage.getItem('username')}, essas são suas tarefas: </CardDescription> */}
                            
                            <TabsContent value="pending">
                                <PendingTasks />
                            </TabsContent>

                            <TabsContent value="done">
                                <DoneTasks />
                            </TabsContent>

                            <TabsContent value="all">
                                <AllTasks />
                            </TabsContent>
                        </Card>

                    </Tabs>
                </div>

                <Card className="w-1/4 mr-10 border-[hsl(240,3.9%,15.1%)]">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="w-fit h-fit rounded-md border text-white border-[hsl(240,3.9%,15.1%)]"/>
                </Card>
                
           </div>
        </main>
    )
}