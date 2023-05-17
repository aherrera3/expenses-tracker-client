import { Box, Button } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
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
