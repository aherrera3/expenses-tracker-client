import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import categories from "../utils/categories";
import months from "../utils/months";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./ExpenseForm.css";
import { Expense } from "./ExpenseList";
import { useState } from "react";

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
  month: z.enum(months, {
    errorMap: () => ({ message: "Month is required." }),
  }),
  // zod expects the array inside enum() to be a read only or constant array, so not just declaring categories as constant will do, cos u can modify the array with methods like push
});

export type ExpenseFormData = z.infer<typeof schema>; // creating a typescript type z.infer

interface Props {
  editing: boolean;
  expense?: Expense;
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ editing, onSubmit, expense }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  // const [description, setDescription] = useState(expense?.description);
  // const handleChange = (event: any) => setDescription(event.target.value);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset(); //resets the form values
      })}
    >
      <FormControl mb={3}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          // value={editing ? expense?.description : undefined}
          // onChange={handleChange}
          placeholder="Food for the cats"
          {...register("description")}
          id="description"
          type="text"
        />
        {errors.description && (
          <Text color="red.300">{errors.description.message}</Text>
        )}
      </FormControl>

      <FormControl mb={3}>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
          <Input
            // value={editing ? expense?.amount : undefined}
            placeholder="120000"
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
          />
        </InputGroup>
        {errors.amount && <Text color="red.300">{errors.amount.message}</Text>}
      </FormControl>

      <FormControl mb={3}>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select
          {...register("category")}
          // value={editing ? expense?.category : undefined}
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
          <Text color="red.300">{errors.category.message}</Text>
        )}
      </FormControl>

      <FormControl mb={5}>
        <FormLabel htmlFor="month">Month</FormLabel>
        <Select
          {...register("month")}
          // value={editing ? expense?.month : undefined}
          id="month"
          name="month"
        >
          <option value=""></option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
        {errors.month && <Text color="red.300">{errors.month.message}</Text>}
      </FormControl>

      <Button
        className="btn"
        rightIcon={<AiOutlineArrowRight />}
        colorScheme="teal"
        size="lg"
        variant="solid" //outline
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default ExpenseForm;
