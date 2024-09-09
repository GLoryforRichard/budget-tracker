export default function Summary({ transactions }: { transactions: any[] }) {
    const calculateSummary = (type: string) => {
      return transactions
        .filter((transaction: { type: string }) => transaction.type === type)
        .reduce((acc: number, transaction: { amount: string }) => acc + parseFloat(transaction.amount), 0);
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold">Financial Status Overview</h2> {/* Financial Status Overview */}
        <p>Total Income: ¥{calculateSummary('income')}</p> {/* Total Income */}
        <p>Total Expense: ¥{calculateSummary('expense')}</p> {/* Total Expense */}
      </div>
    );
}
