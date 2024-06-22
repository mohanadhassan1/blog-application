"use client"

import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(3).max(50),
  body: z.string().min(5).max(50000),
})
