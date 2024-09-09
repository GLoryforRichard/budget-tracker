"use client";
import { useState, useEffect } from 'react';
import { Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import Summary from '@/components/Summary';
import IncomeExpenseChart from '@/components/IncomeExpenseChart';

export default function Home() {
  const [transactions, setTransactions] = useState<{ id: string; description: string; amount: string; category: string; type: string; date: string }[]>([]); // Change amount type to string
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions') || '{}') : [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  const addTransaction = (transaction: { id: string; description: string; amount: string; category: string; type: string; date: string }) => { // Change amount type to string
    setTransactions((prevTransactions) => [...prevTransactions, { ...transaction, id: transaction.id.toString() }]); // Ensure id is a string
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.filter((transaction) => transaction.id !== id);
      console.log('Updated Transactions:', updatedTransactions); // Debug output
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions)); // Update localStorage
      return updatedTransactions;
    });
  };

  const calculateSummary = (type: string) => {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((acc, transaction) => acc + Number(transaction.amount), 0); // Convert amount to number for calculation
  };

  const data = [
    { name: 'Current Month', income: calculateSummary('income'), expense: calculateSummary('expense') },
    // 可以添加更多数据项
  ];

  return (
    <div className="flex items-center justify-center min-h-screen"> {/* Add flexbox to center the card */}
      <Card className="w-192"> {/* Set card width to 192 */}
        <div className="flex"> {/* Use flex to arrange cards side by side */}
          {/* CARD1 */}
          <Card className="w-1/3 p-4"> {/* Set card width to half of the parent */}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">💰 Personal Finance Dashboard 💰</CardTitle> {/* Personal Finance Dashboard */}
            </CardHeader>
            <CardContent>
              <TransactionForm onAddTransaction={addTransaction} />
              <Summary transactions={transactions} />
            </CardContent>
            <CardFooter>
              <TransactionList transactions={transactions} onDeleteTransaction={(id) => deleteTransaction(id.toString())} /> {/* Convert id to string type */}
            </CardFooter>
          </Card>
          {/* CARD2 */}
          <Card className="w-2/3 p-4 flex items-center justify-center"> {/* Set card width to 2/3 and center content */}
            <IncomeExpenseChart data={data} /> {/* Use independent chart component */}
          </Card>
        </div>
      </Card>
    </div>
  );
}
