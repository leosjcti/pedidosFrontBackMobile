import React, { ReactNode, ButtonHTMLAttributes, useContext } from 'react'
import styles from './styles.module.scss'

import {FaSpinner} from 'react-icons/fa'
import Link from 'next/link'
import { Button } from '../ui/Button'

import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'


export function Header() {

  const{signOut} = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src='/logo.png' width={250} height={100} />        
        </Link>

        <nav className={styles.menuNav}>
          <Link legacyBehavior href="/category">
            <a>Categoria</a>
          </Link>

          <Link legacyBehavior href="/product">
            <a>Cardapio</a>
          </Link>


          <Button onClick={signOut}>
            <FiLogOut color='#FFF' size={24} />
          </Button>

        </nav>
      </div>
    </header>
      
  )
}

