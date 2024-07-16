import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from "./login-form"
import { paths } from "@/constants/paths";
import { tryGetAccessToken } from "@/lib/utilsNext";
import { redirect } from 'next/navigation'

const Login = async () => {
  const accessToken = await tryGetAccessToken();
  ///== chưa có accessToken chỗ này ????
  if (accessToken) {
    redirect(paths.home)
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