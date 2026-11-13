import { FormControlLabel, Checkbox, FormControl } from "@mui/material"
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
				</FormControl>
			)}
		/>
	)
}

export default FCheckBox
