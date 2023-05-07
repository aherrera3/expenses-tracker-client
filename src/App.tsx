import { useState } from "react";
import { Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm, { ExpenseFormData } from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 8, category: "Groceries" },
    { id: 3, description: "ccc", amount: 5, category: "Utilities" },
  ]);

  const handlerSubmit = (newExpense: ExpenseFormData) => {
    axios
      .post("http://localhost:5174/api/insert", {
        description: newExpense.description,
        amount: newExpense.amount,
        category: newExpense.category,
      })
      .then((response) => console.log(response));
    // .catch((err) => setError(err.message));
  };

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
          onSubmit={
            handlerSubmit
            // (newExpense) =>
            //   setExpenses([
            //     ...expenses,
            //     { ...newExpense, id: expenses.length + 1 },
            //   ]) // the expenses array is updated with the new expense object
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
