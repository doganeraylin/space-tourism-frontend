import Link from "next/link"
import styles from './Navbar.module.css'


const Navbar = () => {
    const links = [
        { href: '/', text: 'home', pageNumber: "00" },
        { href: '/destination', text: 'destination', pageNumber: "01" },
        { href: '/crew', text: 'crew', pageNumber: "02" },
        { href: '/technology', text: 'technology', pageNumber: "03" }
    ];

    return (
    <>
    <nav className={`${styles.navbarContainer} navbar navbar-expand-md`}>
        <div className="container-fluid" >
            <img className={styles.logoImg} src="./assets/header/logo.png" alt='user profile picture' />
            <button className={`${styles.navbarToggler} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`${styles.navbarTogglerIcon} navbar-toggler-icon`}></span>
            </button>
            <div className="collapse navbar-collapse pt-3" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ">
                {links.map((link, index) => (
                    <Link 
                        key={index}
                        className="text-decoration-none px-md-2" 
                        href={link.href}>
                        <div className={`${styles.links} py-2 text-uppercase`}>
                            <span className="fw-bold me-2">{link.pageNumber}</span>
                            {link.text}
                        </div>
                    </Link>
              ))}
            </ul>
            </div>
        </div>
    </nav>
    </>
    )
}

export default Navbar