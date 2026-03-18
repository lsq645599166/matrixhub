import {
  Alert, Button, Checkbox, rem, Stack, Text, TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Models } from '@matrixhub/api-ts/v1alpha1/model.pb.ts'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import DeleteIcon from '@/assets/svgs/delete.svg?react'
import WarningIcon from '@/assets/svgs/warning.svg?react'
import { ModalWrapper } from '@/components/ModalWrapper.tsx'
import { Route as ModelsRoute } from '@/routes/(auth)/(app)/models'

export const Route = createFileRoute(
  '/(auth)/(app)/projects_/$projectId/models/$modelId/settings/',
)({
  component: ModelSettings,
})

function ModelSettings() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    projectId, modelId,
  } = Route.useParams()

  const [opened, {
    open, close,
  }] = useDisclosure(false)

  const handleSetRecommended = async () => {
    // TODO: set recommended api
  }

  const fullName = `${projectId}/${modelId}`
  const [inputValue, setInputValue] = useState('')

  const handleDelete = async () => {
    try {
      await Models.DeleteModel({
        project: projectId,
        name: modelId,
      })

      navigate({ to: ModelsRoute.to })
    } catch (e) {
      // TODO: handle error noty
      console.error(e)
    }
  }

  return (
    <Stack
      pt={20}
      gap={28}
      align="flex-start"
    >
      <Stack
        gap="md"
        align="flex-start"
      >
        <Text fw="600" lh={rem(24)}>
          {t('model.settings.recommended.title')}
        </Text>

        <Checkbox
          checked={false}
          label={t('model.settings.recommended.label')}
          onClick={open}
        />

        <ModalWrapper
          type="info"
          title={t('model.settings.recommended.label')}
          opened={opened}
          onClose={close}
          onConfirm={handleSetRecommended}
        >
          <Text fz="sm" lh={rem(20)}>
            {t('model.settings.recommended.confirmation', { name: fullName })}
          </Text>
        </ModalWrapper>
      </Stack>
      <Stack
        gap="md"
        align="flex-start"
      >
        <Text fw="600" lh={rem(24)}>
          {t('model.settings.delete.title')}
        </Text>

        <Alert
          icon={<WarningIcon />}
          variant="light"
          color="var(--mantine-color-yellow-6)"
        >
          <Text size="sm" lh={rem(20)} c="var(--mantine-color-gray-9)">
            {t('model.settings.delete.warning', { name: fullName })}
          </Text>
        </Alert>

        <Stack gap={8}>
          <Text fw={600} size="sm" lh="20px" c="var(--mantine-color-gray-7)">
            {t('model.settings.delete.confirmation', { name: fullName })}
          </Text>

          <TextInput
            w={260}
            value={inputValue}
            onChange={e => setInputValue(e.currentTarget.value)}
          />
        </Stack>

        <Button
          disabled={inputValue !== fullName}
          leftSection={<DeleteIcon />}
          color="var(--mantine-color-red-6)"
          onClick={handleDelete}
        >
          {t('model.settings.delete.action')}
        </Button>
      </Stack>
    </Stack>
  )
}
