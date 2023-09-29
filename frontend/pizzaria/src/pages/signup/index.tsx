import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import logoImg from '../../../public/logo.png'
import styles from '../../styles/home.module.scss'
import Image from "next/image";
import Link from "next/link";
import Input from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";


export default function SignUp() {

  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.error('Preencha todos os campos!')
      return;
    }

    setLoading(true)

    await signUp({name: name, email: email, password: password});

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>Pizzaria - Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo pizzaria" width={400} height={150} />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>

          <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={ (e: ChangeEvent<HTMLInputElement>)  => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={email}
              onChange={ (e: ChangeEvent<HTMLInputElement>)  => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={ (e: ChangeEvent<HTMLInputElement>)  => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          
          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça Login</a>
          </Link>
         

        </div>
      </div>
    </>
  )
}
