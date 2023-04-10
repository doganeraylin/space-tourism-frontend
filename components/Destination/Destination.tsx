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
    <div className={`${styles.container} d-flex flex-column align-items-center`}>
      <h1 className={styles.title}><span>02</span>pick your destination</h1>
      <div className={styles.imgContainer}>
        {imageUrls.map((img, i) => 
          <div key={i} className="d-flex justify-content-center">
              {currentTab === `${i}` && 
              <img className={`${styles.destinationImg} w-50`} src={img}></img>}
          </div>
        )}
      </div >
      <div className={`${styles.tabsContainer} d-flex justify-content-evenly w-50 mt-5 mb-5`}>
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
              <div className="d-flex flex-column align-items-center">
                <p className={styles.name}>{dest.attributes.name}</p>
                <p className={styles.description}>{dest.attributes.description}</p>
                <p className={styles.distanceTitle}>avg.distance</p>
                <p className={styles.distance}>{dest.attributes.distance} {dest.attributes.distanceUnit}</p>
                <p className={styles.travelTimeTitle}>est. travel time</p>
                <p className={styles.travelTime}>{dest.attributes.travelTime} {dest.attributes.durationUnit}</p>
              </div>}
          </div>
          )}
      </div>
    </div>
    </>
  )
}

export default Destination