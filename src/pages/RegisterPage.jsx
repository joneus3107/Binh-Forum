import { Container } from "@mui/material"
import { useForm } from "react-hook-form"
import { FCheckBox, FormProvider, FPassword, FTextField } from "../components/form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useAuth from "../hooks/useAuth"

import { Link as RouterLink, useNavigate } from "react-router"
import { Stack, Alert, Link, Button } from "@mui/material"

import { AGREE_POLYCY_MSG, EMAIL_INVALID_MSG, REQUIRED_MSG, UNMATCH_CONFIRM_PASSWORD } from "../constants/inputs"

const RegisterSchema = Yup.object({
	display_name: Yup.string().trim().required(REQUIRED_MSG),
	email: Yup.string().trim().email(EMAIL_INVALID_MSG).required(REQUIRED_MSG),
	password: Yup.string().trim().required(REQUIRED_MSG),
	re_password: Yup.string().oneOf([Yup.ref("password")], UNMATCH_CONFIRM_PASSWORD).required(REQUIRED_MSG),
	agreeTerms: Yup.boolean().isTrue(AGREE_POLYCY_MSG)
})

const defaultValues = {
	display_name: "",
	email: "",
	password: "",
	re_password: "",
	agreeTerms: false,
}

function RegisterPage() {
	const auth = useAuth()
	const navigate = useNavigate()
	const methods = useForm({
		resolver: yupResolver(RegisterSchema),
		defaultValues
	})

	const {
		handleSubmit,
		resetField,
		setError,
		formState: {
			errors, isSubmitting
		}
	} = methods

	const onSubmit = async (data) => {
		let {display_name, email, password} = data
		const register_data = {
			email,
			password,
			"name": display_name,
			"avatarUrl": null,
			"coverUrl": null,
			"aboutMe": null,
			"city": null,
			"country": null,
			"company": null,
			"jobTitle": null,
			"facebookLink": null,
			"instagramLink": null,
			"linkedInLink": null,
			"xLink": null
		}

		try {
			await auth.register(register_data, () => {
				navigate('/', {replace: true})
			})
		} catch(error) {
			resetField("password")
			resetField("re_password")
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

					<FTextField name="display_name" label="Tên hiển thị" required />
					<FTextField name="email" label="Email" autoComplete="username" required/>
					<FPassword name="password" label="Mật khẩu" required />
					<FPassword name="re_password" label="Xác nhận mật khẩu" required />
				</Stack>
				<Stack
					spacing={1}
					sx={{
						alignItems: "center",
						mt: 2
					}}
				>
					<FCheckBox name="agreeTerms" label="Tôi đồng ý với chính sách của diễn đàng" />
					<Link component={RouterLink} variant='subtitle2' to="/" >Chính sách và quy định của diễn đàng</Link>
				</Stack>
				<Button
					fullWidth
					type='submit'
					loading={isSubmitting}
					variant='contained'
					sx={{
						mt: 2
					}}
				>Đăng ký thành viên</Button>
			</FormProvider>
		</Container>
	)
}

export default RegisterPage
