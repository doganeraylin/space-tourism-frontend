import { useRef, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { gsap } from "gsap"
import styles from './Destination.module.css'

  interface IDestination {
    id: number;
    name: string;
    description: string;
    distance: string,
    travel: string;
    images: Img;
  }
  interface Img {
    png: string;
  }
  interface DestinationProps {
      destination: IDestination[];
  }

  const Destination = ({destination} : DestinationProps) => {
  const [currentTab, setCurrentTab] = useState<string>('0')
  const currentTabRef = useRef() 
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(currentTabRef.current, {
      duration: 1,
      opacity: 0,
      ease: 'power2.out',
    })
    .to(currentTabRef.current, {
      duration: 1,
      opacity: 1,
      ease: 'power2.out',
    })

    return () => {
      tl.kill()
    }
  }, [currentTab])


  const tabs = [
    { tab: 'moon', id: "0" },
    { tab: 'mars', id: "1" },
    { tab: 'europa', id: "2" },
    { tab: 'titan', id: "3" },
  ]

 const destinationData: IDestination[] | undefined = destination || [];

  const imageUrls: string[] = destinationData.map((dest: IDestination) => dest?.images?.png) ?? []

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tabId = e.currentTarget.id 
    setCurrentTab(tabId)
  }

  return (
    <div className={styles.wrapper} >
      <Navbar/>
      <div id="planet-viewer" ref={containerRef}></div>
      <h1 className={styles.title}><span>02</span>pick your destination</h1>
      <div ref={ currentTabRef } className={styles.container} >
        <div>
            <div className={styles.imgContainer}>
              {imageUrls.map((img, i) => 
              <div key={i} className="">
                {currentTab === `${i}` && 
                <img className={styles.destinationImg} src={img}></img>}
              </div>
              )}
            </div>
        </div>
        <div className={styles.destinationInfoWrapper}>
          <div className={styles.tabsContainer}>
          {tabs.map((tab, i) =>
              <button 
                key={i} 
                id={tab.id} 
                disabled={currentTab === `${tab.id}`} 
                onClick={(handleTabClick)}
                className={currentTab === tab.id ? `${styles.tabBtn} ${styles.tabBtnSelected}` : `${styles.tabBtn}`}
              > 
                {tab.tab}
              </button>
          )}
          </div>
          <div>
            {destinationData.map((dest, i) =>
              <div key={i}  >
                  {currentTab === `${i}` && 
                  <div className={styles.textContainer}>
                    <p className={styles.name}>{dest.name}</p>
                    <p className={styles.description}>{dest.description}</p>
                    <div className={styles.detailsContainer}>
                      <div>
                        <p className={styles.distanceTitle}>avg.distance</p>
                        <p className={styles.distance}>{dest.distance}</p>
                      </div>
                      <div>
                        <p className={styles.travelTimeTitle}>est. travel time</p>
                        <p className={styles.travelTime}>{dest.travel}</p>
                      </div>
                    </div>
                  </div>}
              </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Destination

