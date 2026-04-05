"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import { signIn, signUp } from "@/lib/actions/auth.action";
import FloatingShapes from "./shared/FloatingShapes";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;
        const result = await signUp({ name: name!, email, password });
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.push("/sign-in");
      } else {
        const { email, password } = data;
        const result = await signIn({ email, password });
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    const email = "demo@jobvue.com";
    const password = "demo1234";

    form.setValue("email", email);
    form.setValue("password", password);

    toast.info("Signing you in with demo credentials...");
    void (async () => {
      setLoading(true);
      try {
        const result = await signIn({ email, password });
        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error(`There was an error: ${error}`);
      } finally {
        setLoading(false);
      }
    })();
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-bg">
      {/* Floating Background Shapes */}
      <FloatingShapes />

      {/* Background gradient blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue-bright/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-purple/8 rounded-full blur-3xl"
          style={{ animation: "pulse-glow 4s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-brand-green/5 rounded-full blur-3xl"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="bg-white/80 backdrop-blur-xl rounded-[28px] border-2 border-brand-blue-dark p-8 md:p-10"
          style={{ boxShadow: "8px 8px 0px #1E3A8A" }}
        >
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-brand-blue-bright to-brand-purple rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <span
                className="text-2xl font-bold text-brand-blue-dark"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Job<span className="text-brand-blue-bright">Vue AI</span>
              </span>
            </Link>

            <h2
              className="text-xl font-bold text-brand-text mt-2"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {isSignIn ? "Welcome Back!" : "Join the Revolution"}
            </h2>
            <p className="text-sm text-brand-text-secondary text-center">
              {isSignIn
                ? "Sign in to find jobs and practice interviews"
                : "Create your account to get started with JobVue AI"}
            </p>
          </motion.div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {!isSignIn && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-brand-text mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-secondary" />
                    <input
                      {...form.register("name")}
                      type="text"
                      placeholder="Your full name"
                      className="w-full pl-11 pr-4 py-3.5 bg-brand-bg rounded-2xl border-2 border-brand-border text-brand-text placeholder:text-brand-text-secondary/50 focus:border-brand-blue-bright focus:outline-none focus:ring-2 focus:ring-brand-blue-bright/20 transition-all text-sm"
                    />
                  </div>
                  {form.formState.errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-secondary" />
                  <input
                    {...form.register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-brand-bg rounded-2xl border-2 border-brand-border text-brand-text placeholder:text-brand-text-secondary/50 focus:border-brand-blue-bright focus:outline-none focus:ring-2 focus:ring-brand-blue-bright/20 transition-all text-sm"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-secondary" />
                  <input
                    {...form.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-brand-bg rounded-2xl border-2 border-brand-border text-brand-text placeholder:text-brand-text-secondary/50 focus:border-brand-blue-bright focus:outline-none focus:ring-2 focus:ring-brand-blue-bright/20 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-secondary hover:text-brand-blue-bright transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full btn-jobvue-primary !py-4 !text-base !rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isSignIn ? "Signing in..." : "Creating account..."}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {isSignIn ? "Sign In" : "Create My Account"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </motion.button>
            </form>
          </Form>

          {/* Demo Credentials */}
          {isSignIn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5"
            >
              <button
                onClick={fillDemoCredentials}
                className="w-full py-3 bg-gradient-to-r from-purple-50 to-blue-50 text-brand-blue-bright text-sm font-semibold rounded-2xl border-2 border-dashed border-brand-blue-bright/30 hover:border-brand-blue-bright hover:bg-blue-50 transition-all cursor-pointer"
              >
                ⚡ Login as Guest
              </button>
              {/* <p className="text-center text-xs text-brand-text-secondary mt-2">
                demo@jobvue.com / demo1234
              </p> */}
            </motion.div>
          )}

          {/* Switch link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <p className="text-sm text-brand-text-secondary">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="font-bold text-brand-blue-bright ml-1 hover:underline"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Bottom trust badges */}
        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {["🔒 Secure", "⚡ Fast", "🆓 Free"].map((badge, i) => (
            <span
              key={i}
              className="text-xs text-brand-text-secondary bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/50"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
