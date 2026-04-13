import {
  AppShell,
  Title,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Select,
  Group,
} from '@mantine/core'
import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' },
]

export const Route = createFileRoute('/(app)/_layout')({
  component: AppLayout,
})

function AppNavbar() {
  const router = useRouter()
  const activeRouteIds = useRouterState({
    select: state => state.matches.map(match => match.routeId),
  })

  const layoutRoute = router.routesById['/(app)/_layout']
  const navRoutes = useMemo(() => {
    const children = layoutRoute?.children
    if (!children) return []
    return Object.values(children)
      .filter(route => typeof route.options.staticData?.navName === 'string')
      .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
  }, [layoutRoute])

  if (!navRoutes.length) {
    return (
      <Text size="sm" c="dimmed">
        No navigation routes available
      </Text>
    )
  }

  return (
    <ScrollArea h="100%">
      <Stack gap={0}>
        {navRoutes.map((route) => {
          const isActive = activeRouteIds.includes(route.id)
          return (
            <NavLink
              key={route.id}
              label={route.options.staticData?.navName ?? route.id}
              component={Link}
              to={route.to}
              active={isActive}
            />
          )
        })}
      </Stack>
    </ScrollArea>
  )
}

function AppLayout() {
  const { t, i18n } = useTranslation()
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: '',
      }}
    >
      <AppShell.Header p="md">
        <Group justify="space-between" h="100%">
          <Title order={2}>{t('translation.title')}</Title>
          <Select
            data={LANGUAGE_OPTIONS}
            value={i18n.language}
            onChange={value => value && i18n.changeLanguage(value)}
            w={130}
            allowDeselect={false}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
