import { BrowserRouter } from 'react-router'
import Router from './routes'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import ThemeProvider from './theme'


function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ThemeProvider>
					<Router/>
				</ThemeProvider>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
