import Link from "./Link";
import Tab from "./Tab";

function CustomizeComponents(theme) {
	return {...Link(theme), ...Tab(theme)}
}

export default CustomizeComponents