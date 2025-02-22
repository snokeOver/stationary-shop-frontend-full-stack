import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, EyeIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Link } from "react-router-dom";
import { toast } from "sonner";
import PrimaryActionButton from "../shared/buttons/PrimaryActionButton";

import { useAppDispatch } from "@/hooks/useApp";

import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { IUser } from "@/types";
import { registerUserSchema } from "@/schemas";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";

export function RegisterForm() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "user2",
      email: "user2@gamil.com",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await registerUser(userInfo).unwrap();

      if (!res.success) {
        form.setError("password", {
          type: "manual",
          message: res.message || "Registration failed. Please try again.",
        });
        return;
      }

      const user = verifyToken(res.data.accessToken) as IUser;
      if (!user) {
        return form.setError("password", {
          type: "manual",
          message: "Something went wrong",
        });
      }

      dispatch(setUser({ user, token: res.data.accessToken }));

      toast("Registration successful!", {
        description: `Welcome, ${user.name}! Explore our website.`,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-w-sm flex-col items-center gap-10 rounded-xl bg-white/20 px-5 py-8 backdrop-blur-md md:max-w-md lg:max-w-xl lg:px-15 lg:py-20 xl:max-w-2xl">
      <h1 className="text-lg font-bold uppercase text-black lg:text-4.2xl">
        Sign Up
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <div
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-black"
                      >
                        {showPass ? <EyeIcon /> : <EyeClosed />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PrimaryActionButton
            btnText="Sign Up"
            loadingText="Signing Up..."
            isLoading={isLoading}
            type="submit"
          />
        </form>
      </Form>

      <p className="w-full text-center font-be-vietnam-pro text-sm font-normal text-black lg:w-[70%]">
        <span>By signing up, you agree to the </span>
        <Link to="#" className="font-bold hover:underline">
          terms of use
        </Link>
        <span> of Snoke Stationary.</span>
      </p>

      <div className="flex items-center justify-center gap-2">
        <p className="text-[10px] font-bold uppercase text-black md:text-sm">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="cursor-pointer text-[10px] font-bold uppercase text-blue-600 hover:underline md:text-sm"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
