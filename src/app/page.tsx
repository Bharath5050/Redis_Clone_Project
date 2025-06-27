
"use client";

import { useState } from "react";
import { KeyForgeLogo } from "@/components/key-forge-logo";
import { AddKeyForm } from "@/components/add-key-form";
import { KeyValueTable } from "@/components/key-value-table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type KeyValue = {
  key: string;
  value: string;
};

export default function Home() {
  const [data, setData] = useState<KeyValue[]>(() => [
    { key: "welcome-message", value: "Hello from KeyForge! This is a sample value. Try adding your own data, or edit this one." },
    { key: "magic-number", value: "42" },
    { key: "api-endpoint", value: "https://api.example.com/data" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const addOrUpdateItem = (formData: KeyValue) => {
    const existingIndex = data.findIndex((item) => item.key === formData.key);
    
    setData(currentData => {
        if (existingIndex > -1) {
          const newData = [...currentData];
          newData[existingIndex] = formData;
          toast({ title: "Key Updated", description: `The key "${formData.key}" has been updated.` });
          return newData;
        } else {
          toast({ title: "Key Added", description: `The key "${formData.key}" has been added.` });
          return [formData, ...currentData];
        }
    });
  };

  const deleteItem = (keyToDelete: string) => {
    setData(currentData => currentData.filter((item) => item.key !== keyToDelete));
    toast({ variant: "destructive", title: "Key Deleted", description: `The key "${keyToDelete}" has been deleted.` });
  };
  
  const filteredData = searchTerm
    ? data.filter(item => 
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main className="container mx-auto max-w-7xl p-4 md:p-8">
        <header className="mb-10 flex flex-col items-center text-center">
          <KeyForgeLogo />
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A simple interface for your key-value store, inspired by Redis and powered by AI.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <aside className="lg:col-span-2">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Add / Update Key</CardTitle>
                  <CardDescription>Provide a pair. Existing keys are overwritten.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AddKeyForm onAddOrUpdate={addOrUpdateItem} />
                </CardContent>
              </Card>
            </div>
          </aside>
          <section className="lg:col-span-3">
             <Card>
              <CardHeader>
                <CardTitle>Stored Data</CardTitle>
                <CardDescription>Browse, search, and manage your entries.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search by key or value..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="font-code"
                />
                <KeyValueTable data={filteredData} onDelete={deleteItem} />
              </CardContent>
            </Card>
          </section>
        </div>

        <footer className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>Built with Next.js, ShadCN/UI, and Genkit AI.</p>
        </footer>
      </main>
    </div>
  );
}
