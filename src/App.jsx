import { BrowserRouter } from 'react-router'
import Router from './routes'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import ThemeProvider from './theme'

import { Provider as StoreProvider } from "react-redux"
import store from './app/store'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


function App() {
	return (
		<StoreProvider store={store}>
			<ToastContainer/>
			<AuthProvider>
				<BrowserRouter>
					<ThemeProvider>
						<Router/>
					</ThemeProvider>
				</BrowserRouter>
			</AuthProvider>
		</StoreProvider>
	)
}

export default App
