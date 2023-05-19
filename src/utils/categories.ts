// we export the categories array so other modules can use it.
const categories = [
  "Groceries",
  "Utilities",
  "Personal Spending",
  "Pets",
  "Healthcare",
  "Transportation",
  "Food",
] as const; // as const to the end makes the array read only, no modification possible.

export default categories;
