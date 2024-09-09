
interface Transaction {
    id: string;
    description: string;
    amount: string; 
    category: string;
    type: string;
    date: string;
}

export default function Summary({ transactions }: { transactions: Transaction[] }) {
    const calculateSummary = (type: string) => {
      return transactions
        .filter((transaction) => transaction.type === type)
        .reduce((acc: number, transaction) => acc + parseFloat(transaction.amount), 0);
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold">Financial Status Overview</h2> {/* Financial Status Overview */}
        <p>Total Income: ¥{calculateSummary('income')}</p> {/* Total Income */}
        <p>Total Expense: ¥{calculateSummary('expense')}</p> {/* Total Expense */}
      </div>
    );
}
