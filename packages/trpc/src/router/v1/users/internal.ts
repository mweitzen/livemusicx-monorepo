import { z } from "zod";
import { unstable_update, signOut, signIn } from "auth";
import { TRPCError } from "@trpc/server";
import { AccountType } from "@repo/db/v1";
import { createTRPCRouter, protectedProcedure } from "../../../trpc";

export const internalRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {},
    });
  }),
  verify: protectedProcedure
    .input(
      z.object({
        verificationCode: z.string(),
        accountType: z.nativeEnum(AccountType),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.verificationCode !== "555-555")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "The verification code you provided does not match.",
        });

      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          userVerified: true,
          accountType: input.accountType,
        },
      });
    }),
  upgrade: protectedProcedure
    .input(
      z.object({
        verificationCode: z.string(),
        accountType: z.nativeEnum(AccountType),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.accountType)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must provide an account type.",
        });
      if (input.verificationCode !== "555-555")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "The verification code you provided does not match.",
        });

      let success = false;
      try {
        // update session
        const updateResult = await unstable_update({
          user: { accountType: input.accountType, userVerified: true },
        });

        if (updateResult?.user?.accountType !== input.accountType)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error updating the user session.",
          });

        return await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            userVerified: true,
            accountType: input.accountType,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Something went wrong while upgrading the user. Error: ${error}`,
        });
      }
    }),
  createUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email("Please provide a properly formatted email."),
        name: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          accountType: "PUBLIC",
          ...input,
        },
      });
    }),
});
