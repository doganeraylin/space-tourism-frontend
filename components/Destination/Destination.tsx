import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { destinationList } from '../../graphql/queries';
import styles from './Destination.module.css'


interface IDestination {
  id: number;
  attributes: {
    name: string
    description: string
    distance: number
    travelTime: number
    distanceUnit: string
    durationUnit: string
    image:  IDestinationImg
  }
}

interface IDestinationImg {
  data: {
    id: number
    attributes: {
      url: string
    }
  }

}

const Destination = () => {

  const [currentTab, setCurrentTab] = useState('0');
  const tabs = [
    { tab: 'moon', id: "0" },
    { tab: 'mars', id: "1" },
    { tab: 'europa', id: "2" },
    { tab: 'titan', id: "3" },
  ]

  const { loading, error, data } = useQuery(destinationList);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  const destinationData: IDestination[] = data.destinations.data
  const imageUrls = destinationData.map(dest => dest.attributes.image.data[0].attributes.url);

  const handleTabClick = (e) => {
      setCurrentTab(e.target.id);
  }

  return (
    <>
    <div className={`${styles.container} d-flex flex-column align-items-center flex-xl-row justify-content-xl-between`}>
      <div className="d-xl-flex flex-xl-column justify-content-xl-center">
          <div className={`${styles.imgContainer}`}>
            <h1 className={`${styles.title} mb-xl-5`}><span>02</span>pick your destination</h1>
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
              className={styles.tabBtn}>
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
                  <p className={`${styles.description} text-md-center text-xl-start`}>{dest.attributes.description}</p>
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
    </>
  )
}

export default Destination