import React, { FormEvent, useState, ChangeEvent } from 'react'
import styles from './styles.module.scss'
import Head from 'next/head'
import { Header } from '../../components/Header'
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { FiUpload } from 'react-icons/fi'


type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps) {
  //Imagem
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  //Categorias do BD
  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  //Form
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  function handleFile(e: ChangeEvent<HTMLInputElement>) {

    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  //Quando uma nova categoria é selecionada na lista
  function handleChangeCategory(event) {
    //console.log("Posicao da categoria selecionada", event.target.value)
    //console.log("Categoria selecionada", categories[event.target.value])
    setCategorySelected(event.target.value)

  }




  //Gravar Produto
  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (name === '' || price === '' || description === '' || imageAvatar === null) {
        toast.error("Preencha todos os campos")
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();
      await apiClient.post('/product', data)

      toast.success('Produto cadastrado com sucesso')
      //setName('')

    } catch (error) {
      console.log(error)
      toast.error('Erro ao cadastrar!')
    }

    setName('');
    setPrice('');
    setDescription('');
    setImageAvatar(null);
    setAvatarUrl('');
  }

  return (
    <>
      <Head><title>Nova produto - Pizzaria</title></Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>


            <label className={styles.labelAvatar} >
              <span>
                <FiUpload size={25} color='#FFF' />
              </span>

              <input type='file' accept='image/jpeg, image/png' onChange={handleFile} />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt='Foto do produto'
                  width={250}
                  height={250}
                />
              )}

            </label>


            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>


            <input
              type='text'
              placeholder='Digite o nome do produto'
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='text'
              placeholder='Digite o nome o preço'
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder='Descreva o seu produto'
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
//ServerSide é executado antes da interface ser montada
export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)

  const response = await apiClient.get('/category')

  return {
    props: {
      categoryList: response.data
    }
  }
})
