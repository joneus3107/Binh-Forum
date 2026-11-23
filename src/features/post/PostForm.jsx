import { FormProvider, FTextField } from "../../components/form"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { ALLOWED_IMAGE_TYPES, REQUIRED_MSG } from '../../constants/inputs'
import { alpha, Button, Card, CardContent, Stack } from '@mui/material'
import FUpload from '../../components/form/FUpload'
import { useDispatch, useSelector } from "react-redux"
import { createPost } from './postSlice'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'

const yupSchema = Yup.object().shape({
	content: Yup.string().trim().required(REQUIRED_MSG),
	image: Yup.mixed()
	.nullable()
	.test(
		"fileType",
		"Chỉ chấp nhận ảnh JPG, PNG hoặc WebP",
		(file) => !file || ALLOWED_IMAGE_TYPES.includes(file.type)
	)
	.test(
		"fileSize",
		"Ảnh không được vượt quá 5MB",
		(file) => !file || file.size <= 5 * 1024 * 1024
	),
})

const defaultValues = {
	content: "",
	image: null
}

function PostForm() {
	const { user } = useAuth()
	const { isLoading } = useSelector(state => state.post)
	const dispatch = useDispatch()
	const methods = useForm({
		resolver: yupResolver(yupSchema),
		defaultValues
	})

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting }
	} = methods

	const onSubmit = async (data) => {
		const dispatchData = {
			...data,
			userId: user.id,
			createdAt: new Date().toISOString()
		}

		try {
			await dispatch(createPost(dispatchData)).unwrap()

			toast.success("Đăng bài thành công")
			reset()
		} catch (error) {
			toast.error(error || "Đăng bài thất bại")
		}
	}

	return (
		<Card>
			<CardContent>
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={2}>
						<FTextField
							name="content"
							multiline
							fullWidth
							rows={3}
							placeholder='Ngày hôm nay của bạn thế nào?'
							sx={{
								"& fieldset": {
									borderWidth: "1px",
									borderColor: alpha("#919EAB", 0.32)
								}
							}}
						/>
						<Stack direction="row" sx={{justifyContent: "flex-end"}} spacing={2}>
							<FUpload name="image" />
							<Button
								type='submit'
								loading={isSubmitting || isLoading}
								variant='contained'
							>Đăng bài</Button>
						</Stack>
					</Stack>
				</FormProvider>
			</CardContent>
		</Card>
	)
}

export default PostForm
