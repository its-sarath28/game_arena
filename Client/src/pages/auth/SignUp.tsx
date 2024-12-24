import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingButton from "@/components/ui/loading-button";

const BASE_URL: string = import.meta.env.VITE_APP_BASE_URL;

const signUpSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be atleast 3 characters",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be 8 or more characters long"),
    cnfPassword: z
      .string()
      .min(8, "Confirm Password must be 8 or more characters long"),
  })
  .refine((data) => data.password === data.cnfPassword, {
    message: "Passwords do not match",
    path: ["cnfPassword"],
  });

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      cnfPassword: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, values);

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (err) {
      console.log(`Error while sign-up: ${err}`);
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[400px] w-full mx-auto px-[20px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-[15px]">
                <Label htmlFor="name">Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border border-zinc-300 bg-white focus:border-zinc-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-[15px]">
                <Label htmlFor="username">Username</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border border-zinc-300 bg-white focus:border-zinc-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[15px]">
                <Label htmlFor="email">Email</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border border-zinc-300 bg-white focus:border-zinc-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-[15px]">
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <Input
                    {...field}
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="flex items-center text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    }
                    type={showPassword ? "text" : "password"}
                    className="border border-zinc-300 bg-white focus:border-zinc-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnfPassword"
            render={({ field }) => (
              <FormItem className="mb-[15px]">
                <Label htmlFor="cnfPassword">Confirm Password</Label>
                <FormControl>
                  <Input
                    {...field}
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="flex items-center text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    }
                    type={showPassword ? "text" : "password"}
                    className="border border-zinc-300 bg-white focus:border-zinc-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            isLoading={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Register
          </LoadingButton>

          <div className="text-center text-sm">
            <span className="font-[500]">
              Already have an account?{" "}
              <Link to="/auth/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
