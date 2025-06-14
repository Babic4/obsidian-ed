import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'
import { AuthLayout } from './ui/auth-layout'
import { RegisterForm } from './ui/register-form'

function RegisterPage() {
  return (
    <AuthLayout
      title='Регистрация'
      description='Введите Ваш email и пароль для регистрации в систему'
      form={<RegisterForm />}
      footerText={
        <>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  )
}

export const Component = RegisterPage
