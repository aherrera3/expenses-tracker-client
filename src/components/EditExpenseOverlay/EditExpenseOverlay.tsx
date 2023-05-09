import { Box, Button } from "@chakra-ui/react";
import ExpenseForm, { ExpenseFormData } from "../ExpenseForm";
import "./EditExpenseOverlay.css";

interface Props {
  isOpen: boolean;
  onClose: (selectedExpense: ExpenseFormData | any) => void;
  onEdit: (data: ExpenseFormData) => void;
}

function EditExpenseOverlay({ isOpen, onClose, onEdit }: Props) {
  if (!isOpen) return null;
  return (
    <>
      <Box className="overlay">
        <Box className="overlay__background" onClick={onClose} />
        <Box className="overlay__container">
          <ExpenseForm onSubmit={onEdit} />
          <Button
            mt={3}
            colorScheme="red"
            className="overlay__close"
            onClick={onClose}
          />
        </Box>
      </Box>
    </>
  );
}

export default EditExpenseOverlay;
