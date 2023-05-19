import {
  Button,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// each expense is going to be an object
export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  month: string;
}

interface Props {
  expenses: Expense[]; //expenses is an array of expense objects
  onDelete: (expense: Expense) => void; //(id: number) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseList = ({ expenses, onEdit, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Description</Th>
          <Th>Amount</Th>
          <Th>Category</Th>
          <Th>Month</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.map((expense) => (
          <Tr key={expense.id}>
            <Td>{expense.description}</Td>
            <Td>$ {expense.amount.toFixed(2)}</Td>
            <Td>{expense.category}</Td>
            <Td>{expense.month}</Td>
            <Td>
              <Button
                colorScheme="yellow"
                variant="outline"
                onClick={() => {
                  onEdit(expense);
                }}
              >
                Edit
              </Button>
            </Td>
            <Td>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => onDelete(expense)}
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>Total</Td>
          <Td>
            ${" "}
            {expenses
              .reduce((acc, expense) => expense.amount + acc, 0)
              .toFixed(2)}
          </Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default ExpenseList;

// maping the expenses into tr elements
