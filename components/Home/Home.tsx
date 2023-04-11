import styles from './Home.module.css'
import Navbar from '../Navbar/Navbar'

const Home = () => {
    return (
        <div className={`${styles.container} container pt-3 d-flex flex-column align-items-center d-xl-flex flex-xl-row justify-content-lg-between align-items-lg-center`}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}> you want to travel to <span>space</span> </h1>
                <p className={styles.description}>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
            </div>
            <div>
                <button className={styles.exploreBtn} type="button">explore</button>
            </div>
        </div>
    )
}

export default Home 