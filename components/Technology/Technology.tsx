import { useRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { technologyList } from '../../graphql/queries'
import Navbar from '../Navbar/Navbar'
import Loading from '../Loading/Loading'
import { ITech } from '../../interface/interfaces'
import { gsap } from "gsap"
import styles from './Technology.module.css'

const Technology = () => {
    
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
        setIsPortraitFormat(window.innerWidth >= 1200)
    }
    window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
    const { loading, error, data } = useQuery(technologyList)

    if (loading) return <div className="d-flex justify-content-center align-items-center"><Loading/></div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return null
    
    const technologyData: ITech[] | undefined = data?.technologies?.data
    const imgFormats = isPortraitFormat ? technologyData?.map((dest: ITech) => dest?.attributes?.image?.data[1]?.attributes?.url) ?? []
                                         : technologyData?.map((dest: ITech) => dest?.attributes?.image?.data[0]?.attributes?.url) ?? []

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tabId = e.currentTarget.id
        setCurrentTab(tabId)
    }
    
    return (
        <>
        <Navbar/>
        <h1 className={`${styles.title} my-md-5`}><span>03</span>space launch 101</h1>
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
            <div className={`${styles.wrapper} d-flex flex-column align-items-center flex-xl-row`}>
                <div className={`${styles.tabsContainer} d-flex justify-content-evenly flex-xl-column w-75 my-5`}>
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
                {technologyData.map((tech, i) =>
                    <div ref={currentTabRef} key={i}  >
                        {currentTab === `${i}` && 
                        <div className={`${styles.textContainer}d-flex flex-column align-items-center align-items-xl-start`}>
                            <p className={`${styles.subtitle} text-center text-xl-start`}>the terminology...</p>
                            <p className={`${styles.term} text-center text-xl-start`}>{tech.attributes.term}</p>
                            <p className={`${styles.description} text-xl-start`}>{tech.attributes.description}</p>
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