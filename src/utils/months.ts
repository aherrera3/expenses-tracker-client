// we export the months array so other modules can use it.
const months = ["May", "June", "July", "August", "September"] as const; // as const to the end makes the array read only, no modification possible.

export default months;
