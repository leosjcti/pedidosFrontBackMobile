import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import logoImg from '../../public/logo.png'
import styles from '../styles/home.module.scss'
import Image from "next/image";
import Link from "next/link";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";


export default function Home() {

  const{signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error('Preencha todos os campos!')
      return;
    }

    setLoading(true)

    await signIn({email: email, password: password});

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Pizzaria - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo pizzaria" width={400} height={150} />

        <div className={styles.login}>

          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>

        </div>
      </div>
    </>
  )
}

//Se estiver logado, não entra nessa tela
export const getServerSideProps =  canSSRGuest( async (context) => {
  return { props: {} }
})
