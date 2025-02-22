import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { IUser } from "@/types";
import { loginUserSchema } from "@/schemas";

export function LogInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "user1@gamil.com",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      if (!res.success) {
        form.setError("password", {
          type: "manual",
          message: res.message || "Either email or password is incorrect",
        });
        return;
      }

      const user = verifyToken(res.data.accessToken) as IUser;
      if (!user) {
        return form.setError("password", {
          type: "manual",
          message: res.message || "Something went wrong",
        });
      }

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      // console.log("Login response:", user.role);

      if (res.success && user.role === "User") {
        toast("Sign In successful!", {
          description: `Welcome, ${user.name}! Explore our website.`,
        });
        return navigate(location?.state?.next || "/");
      }

      if (res.success && user.role === "Admin") {
        toast("Sign In successful!", {
          description: `Welcome, ${user.name} Admin! Manage users and content.`,
        });
        return navigate(location?.state?.next || "/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-w-sm flex-col items-center gap-10 rounded-xl bg-white/20 px-5 py-8 backdrop-blur-md md:max-w-md lg:max-w-xl lg:px-15 lg:py-20 xl:max-w-2xl">
      <h1 className="text-lg font-bold uppercase text-black lg:text-4.2xl">
        Sign In
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5"
        >
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
                        className="text absolute right-2 top-1/2 -translate-y-1/2 text-black"
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
            btnText="Sign In"
            loadingText="Signing In..."
            isLoading={isLoading}
            type="submit"
          />
        </form>
      </Form>

      <p className="w-full text-center font-be-vietnam-pro text-sm font-normal text-black lg:w-[70%]">
        <span>By clicking on sign in, you hereby agree to the </span>
        <Link to="#" className="font-bold hover:underline">
          terms of use
        </Link>
        <span> of Snoke Stationary</span>
      </p>

      <div className="flex items-center justify-center gap-2">
        <p className="text-[10px] font-bold uppercase text-black md:text-sm">
          Don&apos;t have an account?
        </p>
        <Link
          to="/register"
          className="cursor-pointer text-[10px] font-bold uppercase text-blue-600 hover:underline md:text-sm"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
