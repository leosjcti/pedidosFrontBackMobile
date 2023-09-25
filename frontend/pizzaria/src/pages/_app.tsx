import React from "react"
import '../styles/globals.scss'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from "next/app"
import { AuthProvider } from "../contexts/AuthContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}
