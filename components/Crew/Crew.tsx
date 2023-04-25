import { useRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { crewList } from '../../graphql/queries'
import Navbar from '../Navbar/Navbar'
import Loading from '../Loading/Loading'
import { ICrew } from '../../interface/interfaces'
import { gsap } from "gsap"
import styles from './Crew.module.css'

const Crew = () => {
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

    const { loading, error, data } = useQuery(crewList)

    if (loading) return <div><Loading/></div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return null

    const crewData: ICrew[] | undefined = data?.crews?.data
    const imageUrls: string[] = crewData.map((crew: ICrew) => crew?.attributes?.image?.data?.attributes?.url) ?? []

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tabId = e.currentTarget.id 
        setCurrentTab(tabId)
    }

    return (
        <>
        <Navbar />
        <h1 className={`${styles.title} my-md-5`}><span>02</span>meet your crew</h1>
        <div ref={currentTabRef} className={styles.wrapper}>
            <div className={`${styles.container} d-flex flex-column align-items-center flex-xl-row-reverse justify-content-xl-between`}>
                <div className={styles.imgContainer}>
                {imageUrls.map((img, i) => 
                    <div key={i} className="d-flex justify-content-center">
                        {currentTab === `${i}` && 
                        <img className={`${styles.crewMemberImg}`} src={img}></img>}
                    </div>
                )}
            </div >
            <div className="d-xl-flex flex-xl-column-reverse">
                <div className={`${styles.tabsContainer} d-flex justify-content-evenly my-5`}>
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
                                <div className={`${styles.textContainer} d-flex flex-column align-items-center align-items-xl-start`}>
                                    <p className={styles.role}>{crewMember.attributes.role}</p>
                                    <p className={styles.fullName}>{crewMember.attributes.fullName}</p>
                                    <p className={`${styles.bio} text-center text-xl-start`}>{crewMember.attributes.bio}</p>
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