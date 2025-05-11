import { RingLoader } from "react-spinners";
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}><RingLoader color="#e6b333" /></div>
  )
}

export default Loader