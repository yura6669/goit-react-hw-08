import css from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to Conta<span>X</span> — your smart contact manager.</h1>
      <p className={css.description}>
        Easily organize, search, and manage your personal and professional contacts in one simple, clean interface. Stay connected, effortlessly.
      </p>
    </div>
  )
}

export default HomePage