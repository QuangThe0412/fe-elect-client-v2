import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RegisterForm from "./register-form"

const Register = () => {
  return (
    <Card className="mx-auto w-full md:w-1/2 ">
      <CardHeader>
        <CardTitle className="text-xl">Đăng ký</CardTitle>
        <CardDescription>
          Vui lòng điền thông tin để tạo tài khoản
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}

export default Register
