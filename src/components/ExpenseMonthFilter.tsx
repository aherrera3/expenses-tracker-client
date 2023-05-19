// Component that show the table filtered. The filtering occurs in App.tsx

import { Select } from "@chakra-ui/react";
import months from "../utils/months";

interface Props {
  onSelectMonth: (month: string) => void;
}

const ExpenseFilter = ({ onSelectMonth }: Props) => {
  return (
    <Select
      variant="filled"
      width="200px"
      placeholder="All months"
      onChange={(event) => onSelectMonth(event.target.value)}
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
      {/* <option value="Groceries">Groceries</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option> */}
    </Select>
  );
};

export default ExpenseFilter;
