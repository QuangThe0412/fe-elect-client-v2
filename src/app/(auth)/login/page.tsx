import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from "./login-form"
import { paths } from "@/constants/paths";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const Login = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value ?? '';
  if (accessToken) {
    redirect(paths.home)
  } else {
    const refreshToken = cookieStore.get('refreshToken')?.value ?? '';
    if (refreshToken) {
      // redirect(paths.refreshToken)
    }
  }

  return (
    <Card className="mx-auto w-full md:w-1/2 ">
      <CardHeader>
        <CardTitle className="text-xl">Đăng nhập</CardTitle>
        <CardDescription>
          Vui lòng điền thông tin để đăng nhập
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}

export default Login