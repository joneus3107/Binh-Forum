import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

function FUpload({ name, label = "Chọn ảnh", accept = "image/jpeg,image/png,image/webp", loading = false, ...other }) {
	const { control } = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			render={({field: { value, onChange, onBlur }, fieldState: {error}}) => (
				<FormControl>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
					>
						{value?.name || label}
						<VisuallyHiddenInput
							type="file"
							accept={accept}
							onBlur={onBlur}
							onChange={(event) => onChange(event.target.files?.[0] ?? null)}
							{...other}
						/>
					</Button>
					{!!error && <FormHelperText>{error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	)
}

export default FUpload
