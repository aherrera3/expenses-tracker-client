// we export the categories array so other modules can use it.
const categories = ["Groceries", "Utilities", "Entertainment"] as const; // as const to the end makes the array read only, no modification possible.

export default categories;
