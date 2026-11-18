function Tab(theme) {
	return {
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: "initial",
					[theme.breakpoints.up("sm")]: {
						flexDirection: "row",
						alignItems: "center",
						columnGap: "6px",
					},
				},
				icon: {
					[theme.breakpoints.up("sm")]: {
						"marginBottom": "0"
					}
				}
			}
		}
	}
}

export default Tab
