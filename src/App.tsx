import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import { Box } from "@chakra-ui/react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
  ]);

  const handlerDelete = (id: number) => {
    setExpenses(expenses.filter((arr) => arr.id !== id));
    console.log("Deleting", id);
  };

  // this variable is not a state variable, because it its calculated from state variables
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      {/*Expense form*/}
      <Box mb={8}>
        <ExpenseForm
          onSubmit={(newExpense) =>
            setExpenses([
              ...expenses,
              { ...newExpense, id: expenses.length + 1 },
            ])
          }
        />
      </Box>

      {/*expense filter and list*/}
      <Box mb={3}>
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </Box>
      <ExpenseList expenses={visibleExpenses} onDelete={handlerDelete} />
    </>
  );
}

export default App;
