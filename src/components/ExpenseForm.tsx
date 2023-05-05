import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import categories from "../utils/categories";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

// validation rules (schema)
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters." })
    .max(50),
  amount: z.number({ invalid_type_error: "Amount is required." }).min(0.01),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }), //an enum can be one of many values
  // zod expects the array inside enum() to be a read only or constant array, so not just declaring categories as constant will do, cos u can modify the array with methods like push
});

type ExpenseFormData = z.infer<typeof schema>; // creating a typescript type z.infer

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <FormControl mb={3}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input {...register("description")} id="description" type="text" />
        {errors.description && (
          <Text color="tomato">{errors.description.message}</Text>
        )}
      </FormControl>

      <FormControl mb={3}>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <Input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
        />
        {errors.amount && <Text color="tomato">{errors.amount.message}</Text>}
      </FormControl>

      <FormControl mb={5}>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select
          placeholder=""
          {...register("category")}
          id="category"
          name="category"
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        {errors.category && (
          <Text color="tomato">{errors.category.message}</Text>
        )}
      </FormControl>

      <Button colorScheme="teal" variant="outline" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ExpenseForm;
