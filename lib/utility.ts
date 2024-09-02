export const convert = (diff: number) => {
  const periods = ['year', 'month', 'day', 'hour', 'minute', 'second']
  let period = 0, i = 0
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  for (const cur of [years, months, days, hours, minutes, seconds]) {
    period = cur
    if (cur) break
    i += 1
  }
  return `${period} ${periods[i]}${period > 1 ? 's' : ''}`
}

export const VIEW_LIMIT = 5