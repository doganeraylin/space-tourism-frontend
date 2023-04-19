import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { gsap } from "gsap"
import styles from './Navbar.module.css'

const Navbar = () => {
    const router = useRouter()
    const links = [
        { href: '/', text: 'home', pageNumber: "00" },
        { href: '/destination', text: 'destination', pageNumber: "01" },
        { href: '/crew', text: 'crew', pageNumber: "02" },
        { href: '/technology', text: 'technology', pageNumber: "03" }
    ]

    useEffect(() => {
        const tl = gsap.timeline()
        const activeLink = document.querySelector(`.${styles.active} a`)
        
        tl.to(activeLink, {
            duration: 1,
            opacity: 0.5,
            y: 200,
            ease: 'power2.out',
      
        })
        tl.to(activeLink, {
            duration: 1,
            opacity: 1,
            ease: 'power2.out',
        
        })
        return () => {
            tl.kill()
        }
  }, [])

    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        router.push("/")
    }

    return (
        <>
        <nav className={`${styles.navbarContainer} navbar my-3 my-md-0 my-xl-3 navbar-expand-md`}>
            <img 
                className={styles.logoImg} 
                src="./assets/header/logo.png" 
                alt='user profile picture'
                onClick={handleClick}
            />
            <button className={`${styles.navbarToggler} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={`${styles.navbarTogglerIcon} navbar-toggler-icon`}></span>
            </button>
            <div  className="collapse navbar-collapse d-md-flex justify-content-md-end align-items-md-start" id="navbarSupportedContent">
                <ul  className={`${styles.linksContainer} navbar-nav my-2 my-md-0`}>
                    {links.map((link, index) => (
                        <li  key={index}  className={`${styles.links} ${router.pathname === link.href ? styles.active : ''}`}>
                            <Link  href={link.href}>
                                <a ><span className="fw-bold me-2 d-md-none d-xl-inline">{link.pageNumber}</span>{link.text}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar