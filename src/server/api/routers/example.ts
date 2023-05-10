import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const ZSchema = z.object({
  id: z.string().uuid(),
  revisionId: z.string(),
  schemaId: z.string().uuid(),
  parentId: z.string().uuid().nullable(),
  name: z.string().nullable(),
  altIds: z
    .object({
      a: z.union([z.string(), z.number()]).nullable(),
      b: z.union([z.string(), z.number()]).nullable(),
      c: z.union([z.string(), z.number()]).nullable(),
      d: z.union([z.string(), z.number()]).nullable(),
      e: z.union([z.string(), z.number()]).nullable(),
      f: z.union([z.string(), z.number()]).nullable(),
    })
    .partial()
    .nullish(),
  types: z.string().array().default([]),
  abc: z.string().nullable(),
  xyzss: z
      .object({
        a: z.string().nullable(),
        b: z.string().nullable(),
      })
      .partial()
      .nullish(),
  coordinates: z
      .object({ longitude: z.number(), latitude: z.number() })
      .nullable(),
  region: z.object({
    isoCountryCode: z.string(),
    isoSubdivision: z.string().nullish(),
  }),
  zzzzzzzzzzzzzzz: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  aoskdoaksdoaksdoksaodkasokdoskad: z.unknown().array().nullable().default([]),
  internal: z.any(),
  detailing: z.object({
    a: z.boolean(),
    b: z.boolean(),
    c: z.boolean(),
  }),
  comment: z.string().optional(),
})

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),



  // TODO INTELIJ IDEA popup on input
  test: protectedProcedure.input(ZSchema).query(({input}) => {
    return "you can now see this secret message!";
  }),
});
