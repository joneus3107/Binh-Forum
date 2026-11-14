import { FormProvider, FTextField, FPassword, FCheckBox } from '../components/form'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { EMAIL_INVALID_MSG, REQUIRED_MSG } from '../constants/inputs'
import useAuth from "../hooks/useAuth"
import { useLocation, useNavigate, Link as RouterLink } from 'react-router'
import { Alert, Container, Stack, Link, Button } from '@mui/material'

const LoginSchema = Yup.object({
	email: Yup.string().trim().email(EMAIL_INVALID_MSG).required(REQUIRED_MSG),
	password: Yup.string().trim().required(REQUIRED_MSG)
})

const defaultValues= {
	email: "alice@test.com",
	password: "123456",
	remember: true,
}

function LoginPage() {
	const auth = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues
	})

	const {
		handleSubmit,
		reset,
		setError,
		formState: {errors, isSubmitting},
	} = methods

	const onSubmit = async (data) => {
		const from = location.state?.from?.pathname || "/"
		let { email, password } = data

		try {
			await auth.login({email, password}, () => {
				navigate(from, {replace: true})
			})
		} catch (error) {
			reset()
			setError("responseError", error)
		}
	}

	return (
		<Container maxWidth="xs">
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
					{!!errors.responseError && (
						<Alert severity='error'>{errors.responseError.message}</Alert>
					)}
					<Alert severity="info" >
						Chưa có tài khoản?{" "}
						<Link variant="subtitle2" component={RouterLink} to="/register">
							Đăng ký ngay
						</Link>
					</Alert>
					<FTextField name="email" label="Email" autoComplete="username" required/>
					<FPassword name="password" label="Mật khẩu" required/>
				</Stack>
				<Stack
					spacing={2}
					direction='row'
					sx={{
						justifyContent: "space-between",
						alignItems: "center",
						mt: 2
					}}
				>
					<FCheckBox name="remember" label="Ghi nhớ lần đăng nhập này." />
					<Link component={RouterLink} variant='subtitle2' to="/" >Quên mật khẩu?</Link>
				</Stack>
				<Button
					fullWidth
					type='submit'
					loading={isSubmitting}
					variant='contained'
					sx={{
						mt: 2
					}}
				>Đăng nhập</Button>
			</FormProvider>
		</Container>
	)
}

export default LoginPage
