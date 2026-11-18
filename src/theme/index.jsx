import {
	createTheme,
	CssBaseline,
	ThemeProvider as MUIThemeProvider
} from "@mui/material"
import CustomizeComponents from "./components"

function ThemeProvider({ children }) {

	const theme = createTheme({
		palette: {
			primary: {
				main: "#D7263D",
				light: "#FF5A68",
				dark: "#9E0F23",
			},
			secondary: {
				main: "#E8B13A",
				light: "#FFD36B",
				dark: "#B38512",
			}
		}
	})

	theme.components = CustomizeComponents(theme)

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline/>
			{children}
		</MUIThemeProvider>
	)
}

export default ThemeProvider
