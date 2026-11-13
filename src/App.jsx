import React from 'react'
import { BrowserRouter } from 'react-router'
import Router from './routes'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'


function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Router/>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
