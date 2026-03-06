import { z } from "zod";

export const APP_SPEC_SCHEMA_VERSION = "1.0.0";

export const AppFieldSchema = z.object({
  name: z.string(),
  type: z.enum(["string","number","boolean","date","text","relation"]),
  required: z.boolean().optional(),
  unique: z.boolean().optional(),
  list: z.boolean().optional(),
  relation: z.object({
    model: z.string(),
    kind: z.enum(["one-to-one","one-to-many","many-to-many"])
  }).optional()
});

export const AppModelSchema = z.object({
  name: z.string(),
  fields: z.array(AppFieldSchema)
});

export const AppPageSchema = z.object({
  name: z.string(),
  path: z.string(),
  type: z.enum(["list","detail","form","dashboard","custom"]),
  model: z.string().optional(),
  components: z.array(z.string()).optional(),
  authRequired: z.boolean().optional()
});

export const ApiEndpointSchema = z.object({
  name: z.string(),
  method: z.enum(["GET","POST","PUT","PATCH","DELETE"]),
  path: z.string(),
  model: z.string().optional(),
  action: z.enum(["list","get","create","update","delete","custom"]).optional(),
  authRequired: z.boolean().optional()
});

export const AppSpecSchema = z.object({
  meta: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    version: z.string(),
    targetPlatforms: z.array(z.enum(["web","mobile","admin"]))
  }),
  auth: z.object({
    enabled: z.boolean(),
    providers: z.array(z.enum(["email","google","github"])),
    roles: z.array(z.string()).optional()
  }).optional(),
  models: z.array(AppModelSchema),
  pages: z.array(AppPageSchema),
  apis: z.array(ApiEndpointSchema),
  components: z.array(z.any()).optional(),
  integrations: z.array(z.any()).optional(),
  workflows: z.array(z.any()).optional()
});

export type AppSpec = z.infer<typeof AppSpecSchema>;