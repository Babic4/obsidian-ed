import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs'
import { List, LayoutGrid } from 'lucide-react'

export type ViewMode = 'list' | 'cards'

export function ViewModeToggle({
  value,
  onChange,
}: {
  value: ViewMode
  onChange: (value: ViewMode) => void
}) {
  return (
    <Tabs defaultValue={value} onValueChange={(e) => onChange(e as ViewMode)}>
      <TabsList className='bg-(--color-bg-alt)'>
        <TabsTrigger value='list'>
          <List />
        </TabsTrigger>
        <TabsTrigger value='cards'>
          <LayoutGrid />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
