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
        <img className={styles.logoImg} src="./assets/header/logo.png" alt='user profile picture' />
        <button className={`${styles.navbarToggler} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`${styles.navbarTogglerIcon} navbar-toggler-icon`}></span>
        </button>
        <div className="collapse navbar-collapse d-md-flex justify-content-md-end align-items-md-start" id="navbarSupportedContent">
            <ul className={`${styles.linksContainer} navbar-nav mb-2 mb-md-0`}>
                {links.map((link, index) => (
                    <Link 
                        key={index} 
                        href={link.href}>
                        <div className={styles.links}>
                            <span className="fw-bold me-2 d-md-none">{link.pageNumber}</span>
                            {link.text}
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    </nav>
    </>
    )
}

export default Navbar