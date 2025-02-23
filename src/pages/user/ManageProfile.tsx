"use client";

import { useEffect } from "react";
import { useAuthSelector } from "@/hooks/useApp";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { User, Mail, MapPin, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits"),
});

const ManageProfile = () => {
  const { user } = useAuthSelector();
  const { data, error, isLoading, isError } = useGetSingleUserQuery(
    user?.email
  );
  const [updateUser, { isLoading: isUpdating }] = useUpdateSingleUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        address: data.data.address,
        phone: data.data.phone,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...values,
        email: user?.email,
      };

      console.log(payload);
      await updateUser(payload).unwrap();
      toast("Profile Updated", {
        description: "Your profile has been successfully updated.",
      });
    } catch (err) {
      toast("Update Failed", {
        description: "There was an error updating your profile.",
      });
      void err;
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.toString()}
      </div>
    );

  return (
    <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold dark:text-white/80">
          Manage Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.data.name}`}
                alt={data?.data.name}
              />
              <AvatarFallback className="dark:text-white/80">
                {data?.data.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-2 dark:text-white/80">
              {data?.data.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4 dark:text-white/80">
              {data?.data.email}
            </p>
            <Separator className="my-4" />
            <div className="text-sm text-gray-600 dark:text-white/80">
              <p>Role: {data?.data.role}</p>
              <p>Status: {data?.data.status}</p>
              <p>
                Member since:{" "}
                {new Date(data?.data.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white/80">Name</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <User className="w-5 h-5 text-gray-500 mr-2 dark:text-white/80" />
                        <Input
                          {...field}
                          className="flex-grow dark:text-white/80"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white/80">
                      Address
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <MapPin className="w-5 h-5 text-gray-500 mr-2 dark:text-white/80" />
                        <Input
                          {...field}
                          className="flex-grow dark:text-white/80"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white/80">Phone</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Phone className="w-5 h-5 text-gray-500 mr-2 dark:text-white/80" />
                        <Input
                          {...field}
                          className="flex-grow dark:text-white/80"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium dark:text-white/80"
                >
                  Email (Read-only)
                </Label>
                <div className="flex">
                  <Mail className="w-5 h-5 text-gray-500 mr-2 dark:text-white/80" />
                  <Input
                    id="email"
                    value={data?.data.email}
                    disabled
                    className="flex-grow dark:text-white/80"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isUpdating} className="w-full">
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageProfile;
