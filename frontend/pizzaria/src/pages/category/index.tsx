import React, { FormEvent, useState } from 'react'
import styles from './styles.module.scss'
import Head from 'next/head'
import { Header } from '../../components/Header'
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../utils/canSSRAuth';


export default function Category() {

  const [name, setName] = useState(''); 

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if(name === '') {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso')
    setName('')


  }

  return (
    <>
      <Head><title>Nova categoria - Pizzaria</title></Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Nova Categoria</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type='text'
              placeholder='Digite o nome da categoria'
              className={styles.input}
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
          </form>

        </main>
      </div>
    </>
  )
}

//Se estiver logado, não entra nessa tela
export const getServerSideProps =  canSSRAuth( async (context) => {
  return { props: {} }
})
