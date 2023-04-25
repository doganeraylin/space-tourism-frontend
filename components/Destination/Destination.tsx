import { useRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { destinationList } from '../../graphql/queries'
import Navbar from '../Navbar/Navbar'
import Loading from '../Loading/Loading'
import { IDestination } from '../../interface/interfaces'
import { gsap } from "gsap"
import styles from './Destination.module.css'


const Destination = () => {
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

  const { loading, error, data } = useQuery(destinationList)

  if (loading) return <div><Loading/></div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return null

  const destinationData: IDestination[] | undefined = data?.destinations?.data
  const imageUrls: string[] = destinationData.map((dest: IDestination) => dest?.attributes?.image?.data[0]?.attributes?.url) ?? []

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tabId = e.currentTarget.id 
    setCurrentTab(tabId)
  }

  return (
    <div className={styles.wrapper} >
      <Navbar/>
      <div id="planet-viewer" ref={containerRef}></div>
      <h1 className={`${styles.title} my-md-5`}><span>02</span>pick your destination</h1>
      <div ref={ currentTabRef } className={`${styles.container} d-flex flex-column align-items-center flex-xl-row justify-content-xl-between`}>
        <div className="d-xl-flex flex-xl-column justify-content-xl-center">
            <div className={`${styles.imgContainer}`}>
              {imageUrls.map((img, i) => 
              <div key={i} className="d-md-flex justify-content-md-center">
                {currentTab === `${i}` && 
                <img className={`${styles.destinationImg}`} src={img}></img>}
              </div>
              )}
            </div>
        </div>
        <div className={`${styles.destinationInfoWrapper} d-xl-flex flex-xl-column align-items-xl-start`}>
          <div className={`${styles.tabsContainer} d-flex justify-content-evenly justify-content-xl-between w-50 mt-5 mb-5 mx-auto mx-xl-0`}>
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
                  <div className={`${styles.textContainer} d-flex flex-column align-items-center align-items-xl-start`}>
                    <p className={styles.name}>{dest.attributes.name}</p>
                    <p className={`${styles.description} text-center text-xl-start`}>{dest.attributes.description}</p>
                    <div className="d-md-flex justify-content-md-around w-100 justify-content-xl-start">
                      <div className="text-center text-xl-start me-xl-5">
                        <p className={styles.distanceTitle}>avg.distance</p>
                        <p className={styles.distance}>{dest.attributes.distance} {dest.attributes.distanceUnit}</p>
                      </div>
                      <div className="text-center text-xl-start ms-xl-5">
                        <p className={styles.travelTimeTitle}>est. travel time</p>
                        <p className={styles.travelTime}>{dest.attributes.travelTime} {dest.attributes.durationUnit}</p>
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

