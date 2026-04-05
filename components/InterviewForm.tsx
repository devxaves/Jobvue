"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";

const interviewFormSchema = z.object({
  role: z.string().min(2, "Role is required"),
  level: z.string().min(1, "Experience level is required"),
  type: z.string().min(1, "Interview type is required"),
  techstack: z.string().min(1, "Tech stack is required"),
  amount: z.number().min(3).max(15),
});

interface InterviewFormProps {
  userId: string;
}

const InterviewForm = ({ userId }: InterviewFormProps) => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof interviewFormSchema>>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      role: "",
      level: "",
      type: "",
      techstack: "",
      amount: 5,
    },
  });

  const onSubmit = async (data: z.infer<typeof interviewFormSchema>) => {
    try {
      setIsGenerating(true);
      console.log("Generating interview with data:", data);

      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userid: userId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Interview created successfully! 🎉");
        console.log("Interview created:", result.interviewId);

        // Redirect to the created interview
        router.push(`/interview/${result.interviewId}`);
      } else {
        toast.error(result.error || "Failed to create interview");
        console.error("Interview creation failed:", result);
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      toast.error("An error occurred while creating the interview");
    } finally {
      setIsGenerating(false);
    }
  };

  const experienceLevels = [
    { value: "junior", label: "Junior (0-2 years)" },
    { value: "mid", label: "Mid-level (2-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
  ];

  const interviewTypes = [
    { value: "technical", label: "Technical" },
    { value: "behavioral", label: "Behavioral" },
    { value: "mixed", label: "Mixed (Technical + Behavioral)" },
  ];

  const popularRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
  ];

  const popularTechStacks = [
    "React, JavaScript, CSS",
    "React, TypeScript, Next.js",
    "Node.js, Express, MongoDB",
    "Python, Django, PostgreSQL",
    "Java, Spring Boot, MySQL",
    "Vue.js, JavaScript, Vuex",
    "Angular, TypeScript, RxJS",
    "React Native, JavaScript",
    "Flutter, Dart",
    "AWS, Docker, Kubernetes",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="clay-card-soft">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Input */}
            <div>
              <FormField
                control={form.control}
                name="role"
                label="Job Role"
                placeholder="e.g., Frontend Developer, Data Scientist"
                type="text"
              />
              <div className="mt-2">
                <p className="text-sm text-brand-text-secondary mb-2">
                  Popular roles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => form.setValue("role", role)}
                      className="px-3 py-1 text-xs bg-white hover:bg-blue-50 text-brand-text-secondary hover:text-brand-blue-bright rounded-full transition-colors border border-brand-border"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Experience Level
              </label>
              <select
                {...form.register("level")}
                className="w-full p-3 border border-brand-border bg-brand-bg text-brand-text rounded-2xl focus:ring-2 focus:ring-brand-blue-bright/20 focus:border-brand-blue-bright outline-none"
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.level && (
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.level.message}
                </p>
              )}
            </div>

            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Interview Type
              </label>
              <select
                {...form.register("type")}
                className="w-full p-3 border border-brand-border bg-brand-bg text-brand-text rounded-2xl focus:ring-2 focus:ring-brand-blue-bright/20 focus:border-brand-blue-bright outline-none"
              >
                <option value="">Select interview type</option>
                {interviewTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.type && (
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <FormField
                control={form.control}
                name="techstack"
                label="Tech Stack"
                placeholder="e.g., React, Node.js, MongoDB, TypeScript"
                type="text"
              />
              <div className="mt-2">
                <p className="text-sm text-brand-text-secondary mb-2">
                  Popular tech stacks:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularTechStacks.map((stack) => (
                    <button
                      key={stack}
                      type="button"
                      onClick={() => form.setValue("techstack", stack)}
                      className="px-3 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-brand-blue-bright rounded-full transition-colors border border-blue-200"
                    >
                      {stack}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                min="3"
                max="15"
                {...form.register("amount", { valueAsNumber: true })}
                className="w-full p-3 border border-brand-border bg-brand-bg text-brand-text rounded-2xl focus:ring-2 focus:ring-brand-blue-bright/20 focus:border-brand-blue-bright outline-none placeholder:text-brand-text-secondary"
                placeholder="5"
              />
              <p className="text-sm text-brand-text-secondary mt-1">
                Recommended: 5-8 questions
              </p>
              {form.formState.errors.amount && (
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-jobvue-primary !rounded-2xl !py-3"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating Questions...
                </div>
              ) : (
                "🚀 Generate Interview"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InterviewForm;
