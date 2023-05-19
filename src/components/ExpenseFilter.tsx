// Component that show the table filtered. The filtering occurs in App.tsx

import { Select } from "@chakra-ui/react";
import categories from "../utils/categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <Select
      variant="filled"
      placeholder="All categories"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
      {/* <option value="Groceries">Groceries</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option> */}
    </Select>
  );
};

export default ExpenseFilter;
