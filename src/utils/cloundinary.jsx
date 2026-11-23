import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export const uploadImage = async (file) => {
	if (!file.type.startsWith("image/")) {
		throw new Error("Vui lòng chọn file ảnh")
	}
	if (file.size > MAX_SIZE) {
		throw new Error("Ảnh không được vượt quá 5MB")
	}

	const formData = new FormData()
	formData.append("file", file)
	formData.append("upload_preset", UPLOAD_PRESET)

	const res = await axios.post(
		`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
		formData
	)
	return res.data.secure_url
}