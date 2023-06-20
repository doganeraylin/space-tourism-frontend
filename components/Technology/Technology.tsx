import { useRef, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { gsap } from "gsap"
import styles from './Technology.module.css'

interface ITech {
    id: number;
    name: string
    images: Img
    description: string

}
    interface Img {
        portrait: string
        landscape: string
    }
  interface TechProps {
      tech: ITech[];
  }


const Technology = ({tech} : TechProps) => {
    
    const [currentTab, setCurrentTab] = useState('0')
    const currentTabRef = useRef(null)
    const tabs = [
    { tab: "1", id: "0" },
    { tab: "2", id: "1" },
    { tab: "3", id: "2" },
    ]

    useEffect(() => {
        const tl = gsap.timeline()

        tl.to(currentTabRef.current, {
            duration: 1,
            opacity: 0,
            ease: 'back.out(1)',
            y: -200,
        })
        tl.to(currentTabRef.current, {
            duration: 1,
            opacity: 1,
            y: 0,
        })
        
        return () => {
            tl.kill()
        }
    }, [currentTab])

    const [isPortraitFormat, setIsPortraitFormat] = useState(true) 
    useEffect(() => {
    const handleResize = () => {
        setIsPortraitFormat(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const techData: ITech[] | undefined = tech || [];
    const imgFormats: string[] = techData?.map((tech: ITech) =>
  isPortraitFormat ? tech?.images?.portrait: tech?.images.landscape
) ?? [];

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tabId = e.currentTarget.id
        setCurrentTab(tabId)
    }
    
    return (
        <>
        <Navbar/>
        <h1 className={styles.title}><span>03</span>space launch 101</h1>
        <div ref={currentTabRef} className={`${styles.container} d-flex flex-column align-items-center d-xl-flex flex-xl-row-reverse justify-content-xl-between `}> 
            <div  className={`${styles.imgContainer}`}>
                    {imgFormats.map((img, i) => (
                    <div key={i} className="">
                        {currentTab === `${i}` && (
                            <img className={`${styles.techImg}`} src={img}></img>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.tabsContainer}>
                {tabs.map((tab, i) =>
                    <button 
                    key={i} 
                    id={tab.id} 
                    disabled={currentTab === `${tab.id}`} 
                    onClick={(handleTabClick)}
                    className={currentTab === tab.id ? `${styles.tabBtn} ${styles.tabBtnSelected}` : `${styles.tabBtn}`}>
                        {tab.tab}
                    </button>
                )}
            </div>
            <div>
                {techData.map((tech, i) =>
                    <div ref={currentTabRef} key={i}  >
                        {currentTab === `${i}` && 
                        <div className={styles.textContainer}>
                            <p className={styles.subtitle}>the terminology...</p>
                            <p className={styles.term}>{tech.name}</p>
                            <p className={styles.description}>{tech.description}</p>
                        </div>
                        }
                    </div>
                )}
                </div>
            </div>
        </div>
    </>
    )
}

export default Technology