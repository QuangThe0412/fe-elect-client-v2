import LoginForm from "./login-form"

const Login = () => {
  return (
    <>
      <div className="mx-auto grid w-[350px]">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Login