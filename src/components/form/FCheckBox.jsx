import { FormControlLabel, Checkbox, FormControl, FormHelperText } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form"

function FCheckBox({name, label, ...other}) {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({field: {value, ...field}, fieldState: { error }}) => (
				<FormControl error={!!error}>
					<FormControlLabel
						label={label}
						control={
							<Checkbox {...field} {...other} checked={!!value} />
						}
					/>
					{!!error && <FormHelperText>{error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	)
}

export default FCheckBox
