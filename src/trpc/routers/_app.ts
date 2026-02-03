import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { auth } from "@/lib/auth";
export const appRouter = createTRPCRouter({
  register: baseProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.password !== input.confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Passwords do not match.",
        });
      }
      const [userExists] = await db
        .select()
        .from(user)
        .where(eq(user.email, input.email));

      if (userExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that email already exists.",
        });
      }

      const newUser = await auth.api.signUpEmail({
        body: {
          name: `${input.firstName} ${input.lastName}`,
          email: input.email,
          password: input.password,
        },
      });

      return newUser.user.id;
    }),
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
