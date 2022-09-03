import { createRouter } from "./context";
import z from "zod";
import { Show } from "@prisma/client";

export const scheduleRouter = createRouter()
  .mutation("create", {
    input: z.object({
      channel: z.string().min(1),
      startTime: z.string().min(1),
      endTime: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.show.create({
        data: {
          channel: input.channel,
          startTime: input.startTime,
          endTime: input.endTime,
        },
      });
    },
  })
  .mutation("remove", {
    input: z.string().min(1),
    async resolve({ ctx, input }) {
      await ctx.prisma.show.delete({ where: { id: input } });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const byStartTime = (previous: Show, next: Show) => {
        const previousStartTime = previous.startTime.replace(":", "");
        const nextStartTime = next.startTime.replace(":", "");
        return Number(previousStartTime) - Number(nextStartTime);
      };

      const shows = await ctx.prisma.show.findMany();
      return shows.sort(byStartTime);
    },
  });
