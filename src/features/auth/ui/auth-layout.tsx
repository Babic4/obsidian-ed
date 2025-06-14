import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card'

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  footerText: React.ReactNode
}) {
  return (
    <main className='flex flex-col justify-center min-h-full px-4 py-12 mt-auto mb-auto sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Card className='w-full'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>{title}</CardTitle>
            <CardDescription className='text-sm'>{description}</CardDescription>
          </CardHeader>
          <CardContent>{form}</CardContent>
        </Card>
        <div className='mt-5 text-(--color-text-secondary) text-sm font-semibold leading-tight text-center [&_a]:underline [&_a:hover]:text-(--color-text-main)'>
          {footerText}
        </div>
      </div>
    </main>
  )
}
