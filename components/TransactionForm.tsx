'use client'
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button'; // Import shadcn's Button component
import { Input } from '@/components/ui/input'; // Import shadcn's Input component
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'; // Import shadcn's Dropdown component

interface Transaction {
  id: string;
  description: string;
  amount: string; 
  category: string;
  type: string;
  date: string;
}

export default function TransactionForm({ onAddTransaction }: { onAddTransaction: (transaction: Transaction) => void }) {
  const [form, setForm] = useState<Transaction>({ id: '', description: '', amount: '', category: '', type: 'expense', date: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTransaction({ ...form, id: Date.now().toString() }); // Ensure id is a string
    setForm({ id: '', description: '', amount: '', category: '', type: 'expense', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <Input
        type="text"
        name="description"
        value={form.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
        className="border p-2 m-2 w-40"
      />
      <Input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleInputChange}
        placeholder="Amount"
        required
        className="border p-2 m-2 w-20"
      />
      <Input
        type="text"
        name="category"
        value={form.category}
        onChange={handleInputChange}
        placeholder="Category (e.g., Food, Transport)"
        required
        className="border p-2 m-2 w-30s"
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="border p-2 m-2">{form.type}</DropdownMenuTrigger> {/* Display current type */}
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setForm({ ...form, type: 'expense' })}>Expense</DropdownMenuItem> {/* Set type to expense */}
          <DropdownMenuItem onClick={() => setForm({ ...form, type: 'income' })}>Income</DropdownMenuItem> {/* Set type to income */}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button type="submit" className="bg-blue-500 text-white p-2">Add</Button>
    </form>
  );
}
