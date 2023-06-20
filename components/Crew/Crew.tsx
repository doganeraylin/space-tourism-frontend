import { useRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Navbar from '../Navbar/Navbar'
import Loading from '../Loading/Loading'
import { gsap } from "gsap"
import styles from './Crew.module.css'


interface ICrew {
    id: number,
    name: string;
    images: Img;
    role: string;
    bio: string;
}

interface Img {
  png: string;
}
interface CrewProps {
    crew: ICrew[];
}







const Crew = ({crew}: CrewProps) => {
  const [currentTab, setCurrentTab] = useState<string>('0')
  const currentTabRef = useRef(null) 

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(currentTabRef.current, {
        duration: 1,
        opacity: 0,
        ease: 'back.out(1)',
        x: -200,
    })
    tl.to(currentTabRef.current, {
        duration: 1,
        opacity: 1,
        x: 0,
    })

    return () => {
      tl.kill()
    }
  }, [currentTab])

    const tabs = [
    { tab: "0", id: "0" },
    { tab: "1", id: "1" }, 
    { tab: "2", id: "2" },
    { tab: "3", id: "3" }
    ]

    const crewData: ICrew[] | undefined = crew || [];
    const imageUrls: string[] = crewData.map((crew: ICrew) => crew?.images?.png) ?? []

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tabId = e.currentTarget.id 
        setCurrentTab(tabId)
    }

    return (
        <>
        <Navbar />
        <h1 className={styles.title}><span>02</span>meet your crew</h1>
        <div ref={currentTabRef} className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                {imageUrls.map((img, i) => 
                    <div key={i}>
                        {currentTab === `${i}` && 
                        <img className={`${styles.crewMemberImg}`} src={img}></img>}
                    </div>
                )}
            </div >
            <div className={styles.columnReverse}>
                <div className={styles.tabsContainer}>
                {tabs.map((tab, i) =>
                    <button 
                        key={i} 
                        id={tab.id} 
                        disabled={currentTab === `${tab.id}`} 
                        onClick={(handleTabClick)}
                        className={currentTab === tab.id ? `${styles.tabBtn} ${styles.tabBtnSelected}` : `${styles.tabBtn}`}>
                    </button>
                )}
                </div>
                    <div>
                        {crewData.map((crewMember, i) =>
                            <div key={i}  >
                                {currentTab === `${i}` && 
                                <div className={styles.textContainer}>
                                    <p className={styles.role}>{crewMember.role}</p>
                                    <p className={styles.fullName}>{crewMember.name}</p>
                                    <p className={styles.bio}>{crewMember.bio}</p>
                                </div>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )
        </div>
        </>
    )        
}

export default Crew