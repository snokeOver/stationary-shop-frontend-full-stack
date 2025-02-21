"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addUser } from "@/redux/userSlice";
import { useAppDispatch } from "@/hooks/useApp";

const FormSchema = z.object({
  name: z.enum(["Snoke", "Laluji", "Khuro"], {
    errorMap: () => ({ message: "Invalid user. Please select a valid name." }),
  }),
});

export function UserForm() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Snoke",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);

    dispatch(addUser(data));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Snoke">Snoke</SelectItem>
                  <SelectItem value="Laluji">Laluji</SelectItem>
                  <SelectItem value="Khuro">Khuro</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
