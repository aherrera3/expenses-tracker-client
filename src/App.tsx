import { useEffect, useState } from "react";
import { HStack, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ExpenseList, { Expense } from "./components/ExpenseList";
import ExpenseForm, { ExpenseFormData } from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5174/api/get").then((response) => {
      console.log(response.data);
      setExpenses(response.data);
    });
  }, []);

  const handleSubmit = (newExpense: ExpenseFormData) => {
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]); // the expenses array is updated with the new  object

    axios
      .post("http://localhost:5174/api/insert", {
        description: newExpense.description,
        amount: newExpense.amount,
        category: newExpense.category,
      })
      .then((response) => {
        //no se esta imprimiendo nada porque no obtengo ninguna response del backend.
        console.log("log?");
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id: number) => {
    console.log("Deleting", id);
    setExpenses(expenses.filter((arr) => arr.id !== id));
    axios.delete(`http://localhost:5174/api/delete/${id}`).then(() => {
      console.log("data has been deleted");
    });
  };

  // const handleUpdate = (id: number) => {
  //   setExpenses(expenses.filter((arr) => arr.id !== id));
  //   console.log("Deleting", id);
  // };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    //stretch
    <>
      <VStack spacing={6} align="strech">
        <Heading as="h1" size="2xl" mb={4}>
          Expenses Tracker
        </Heading>
        <Heading as="h1" size="lg" mb={5}>
          Add you new expense
        </Heading>

        {/*Expense form*/}
        <ExpenseForm onSubmit={handleSubmit} />

        {/*expense filter and list*/}
        <HStack display="flex" justifyContent="space-between" mb={5}>
          <Heading as="h1" size="lg">
            Expenses from:
          </Heading>
          <Heading size="md">May</Heading>
        </HStack>
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
        <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
      </VStack>
    </>
  );
}

export default App;
