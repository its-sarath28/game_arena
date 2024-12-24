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
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingButton from "@/components/ui/loading-button";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";

const BASE_URL: string = import.meta.env.VITE_APP_BASE_URL;

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(UserContext);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, values);

      if (response.status === 200) {
        const { token } = response.data;
        console.log(token);

        setIsLoggedIn(token);
        navigate("/");
        toast.success("Logged in");
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

          <LoadingButton
            isLoading={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Sign In
          </LoadingButton>

          <div className="text-center text-sm">
            <span className="font-[500]">
              Don't have an account?{" "}
              <Link to="/auth/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
