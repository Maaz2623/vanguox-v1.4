"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Vanguox
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to access features.
      </p>

      <div className="w-full mt-6 flex justify-center lg:gap-x-4 md:gap-x-3 sm:gap-x-2 gap-x-1 items-center">
        <Button
          className="md:w-[80%] w-full"
          variant={`outline`}
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);
              await signIn("google").then(() => router.push(`/`));
            } catch (error) {
              setLoading(false);
              toast.error("Something went wrong");
            }
          }}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <FcGoogle />}
          Google
        </Button>
      </div>
    </div>
  );
}
