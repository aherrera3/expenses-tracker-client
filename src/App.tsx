import { useEffect, useState } from "react";
import { HStack, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ExpenseList, { Expense } from "./components/ExpenseList";
import ExpenseForm, { ExpenseFormData } from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import EditExpenseOverlay from "./components/EditExpenseOverlay/EditExpenseOverlay";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseLayoutOpen, setExpenseLayoutOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense>();

  useEffect(() => {
    axios.get("http://localhost:5174/api/get").then((response) => {
      console.log("response data", response.data);
      setExpenses(response.data);
    });
  }, []);

  const handleSubmit = (newExpense: ExpenseFormData) => {
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

    // getting the newExpense id from the backend
    let newExpenseId = 0;
    axios.get("http://localhost:5174/api/get").then((response) => {
      newExpenseId = response.data[response.data.length - 1].id;
      console.log("new expense id: ", newExpenseId);
    });

    // the expenses array is updated with the new  object
    setExpenses([...expenses, { ...newExpense, id: newExpenseId }]);
  };

  const handleDelete = (actualExpense: Expense) => {
    console.log("Deleting", actualExpense.id);
    setExpenses(expenses.filter((arr) => arr.id !== actualExpense.id));
    axios
      .delete(`http://localhost:5174/api/delete/${actualExpense.id}`)
      .then(() => {
        console.log("data has been deleted");
      });
  };

  const handleUpdate = (newExpense: ExpenseFormData) => {
    // setExpenseLayoutOpen(!expenseLayoutOpen); //open the overlay
    console.log("updating: ", selectedExpense);
    // setExpenses([...expenses, { ...selectedExpense, id: selectedExpense?.id }])
    axios.put(`http://localhost:5174/api/update/${selectedExpense?.id}`, {
      description: newExpense?.description,
      amount: newExpense?.amount,
      category: newExpense?.category,
    });

    if (selectedExpense)
      setExpenses([
        ...expenses.filter((arr) => arr.id !== selectedExpense.id, {
          ...newExpense,
          id: selectedExpense.id,
        }),
      ]);
    console.log(newExpense?.description);
  };

  const toogleExpenseOverlay = (actualExpense: Expense) => {
    setSelectedExpense(actualExpense);
    // console.log(actualExpense);
    setExpenseLayoutOpen(!expenseLayoutOpen);
  };

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
        <ExpenseList
          expenses={visibleExpenses}
          onEdit={toogleExpenseOverlay}
          onDelete={handleDelete}
        />
      </VStack>
      <EditExpenseOverlay
        isOpen={expenseLayoutOpen}
        onClose={toogleExpenseOverlay}
        onEdit={handleUpdate}
      />
    </>
  );
}

export default App;
