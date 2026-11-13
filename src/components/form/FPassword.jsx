import { useState, useId } from "react"
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormContext, Controller } from "react-hook-form";

function FPassword({ name, label, required, ...other }) {
	const id = useId()
	const [showPassword, setShowPassword] = useState(false)

	const { control } = useFormContext()

	const handleClickShowPassword = () => {
		setShowPassword(state => !state)
	}
	return (
		<Controller
			name={name}
			control={control}
			render={({field, fieldState: { error }}) => (
				<FormControl
					error={!!error}
					required={required}
				>
					<InputLabel htmlFor={`FP-${id}`}>{ label }</InputLabel>
					<OutlinedInput
						{...field}
						id={`FP-${id}`}
						type={showPassword?'text':'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label={
										showPassword ? 'hide the password' : 'display the password'
									}
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label={ label }
						{...other}
						autoComplete="current-password"
					>
					</OutlinedInput>
					{error && <FormHelperText>{error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	)
}

export default FPassword