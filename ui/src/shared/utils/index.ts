export function filterByKeyword<T extends { name?: string }>(items: T[], keyword: string) {
  if (!keyword) {
    return items
  }

  const normalizedKeyword = keyword.trim().toLowerCase()

  return items.filter(item => item.name?.toLowerCase()?.includes(normalizedKeyword))
}
