export default function TransactionList({ transactions, onDeleteTransaction }: { transactions: any[], onDeleteTransaction: (id: string) => void }) {
    return (
      <div>
        <h2 className="text-xl font-bold">Transaction Records</h2> {/* Transaction Records */}
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border p-2 m-2">
              {transaction.description} - ¥{transaction.amount} ({transaction.category}) [{transaction.type}]
              <button
                onClick={() => {
                  console.log(`Deleting transaction with id: ${transaction.id}`); // Log for debugging
                  onDeleteTransaction(transaction.id); // Ensure id is passed as a string
                }}
                className="bg-red-500 text-white p-1 ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}
