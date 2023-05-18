import { Box, Button } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import ExpenseForm, { ExpenseFormData } from "../ExpenseForm";
import "./EditExpenseOverlay.css";
import { Expense } from "../ExpenseList";

interface Props {
  isOpen: boolean;
  expense: Expense | undefined;
  onClose: (selectedExpense: ExpenseFormData | any) => void;
  onEdit: (data: ExpenseFormData) => void;
}

function EditExpenseOverlay({ isOpen, expense, onClose, onEdit }: Props) {
  if (!isOpen) return null;
  console.log("selected expense: ", expense);
  return (
    <>
      <Box className="overlay">
        <Box className="overlay__background" onClick={onClose} />
        <Box className="overlay__container">
          <ExpenseForm editing={true} expense={expense} onSubmit={onEdit} />
          <Button
            mt={3}
            className="cancel-btn"
            rightIcon={<AiOutlineClose />}
            colorScheme="red"
            size="lg"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default EditExpenseOverlay;
