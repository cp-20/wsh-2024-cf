import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { author, book, image } from "../../models";

export const GetAuthorResponseSchema = createSelectSchema(author)
  .pick({
    description: true,
    id: true,
    name: true,
  })
  .extend({
    books: createSelectSchema(book)
      .pick({
        description: true,
        id: true,
        name: true,
      })
      .extend({
        image: createSelectSchema(image).pick({
          alt: true,
          id: true,
        }),
      })
      .array(),
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  });

export type GetAuthorResponse = z.infer<typeof GetAuthorResponseSchema>;
