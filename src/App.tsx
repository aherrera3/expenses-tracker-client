import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import { Box, Heading, VStack } from "@chakra-ui/react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 8, category: "Groceries" },
    { id: 3, description: "ccc", amount: 5, category: "Utilities" },
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
    //stretch
    <>
      <VStack spacing={4} align="strech">
        <Heading as="h1" size="2xl" mb={5}>
          Expenses Tracker
        </Heading>
        {/*Expense form*/}
        <ExpenseForm
          onSubmit={(newExpense) =>
            setExpenses([
              ...expenses,
              { ...newExpense, id: expenses.length + 1 },
            ])
          }
        />

        {/*expense filter and list*/}
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
        <ExpenseList expenses={visibleExpenses} onDelete={handlerDelete} />
      </VStack>
    </>
  );
}

export default App;
