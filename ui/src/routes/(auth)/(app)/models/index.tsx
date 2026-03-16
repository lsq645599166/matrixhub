import { Models } from '@matrixhub/api-ts/v1alpha1/model.pb.ts'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PAGE_SIZE } from '@/features/models/models.query'
import { ModelsPage } from '@/features/models/pages/ModelsPage'

const modelsSearchSchema = z.object({
  q: z.string().transform(v => v.trim()).optional(),
  sort: z.literal('updatedAt').optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().positive().optional(),
  task: z.string().optional(),
  library: z.string().optional(),
  project: z.string().optional(),
})

export type ModelsSearch = z.infer<typeof modelsSearchSchema>

export const Route = createFileRoute('/(auth)/(app)/models/')({
  component: RouteComponent,
  validateSearch: modelsSearchSchema,
  loaderDeps: ({ search }) => search,
  async loader({ deps: search }) {
    const sortField = search.sort ?? 'updatedAt'
    const sortOrder = search.order ?? 'desc'
    const page = search.page ?? 1
    const sort = sortField === 'updatedAt' && sortOrder === 'asc'
      ? 'updated_at_asc'
      : 'updated_at_desc'

    return await Models.ListModels({
      labels: (search.task ?? search.library)?.split(','),
      project: search.project,
      search: search.q || undefined,
      sort,
      page,
      pageSize: PAGE_SIZE,
    })
  },
})

function RouteComponent() {
  return <ModelsPage />
}
