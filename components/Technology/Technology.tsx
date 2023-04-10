import { useQuery } from '@apollo/client';
import { technologyList } from '../../graphql/queries';
import { useState } from 'react'
import styles from './Technology.module.css'

const Technology = () => {
    const [currentTab, setCurrentTab] = useState('0');

    const { loading, error, data } = useQuery(technologyList);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    const technologyData = data.technologies.data
    const imageUrls = technologyData.map(dest => dest.attributes.image.data[0].attributes.url);

    const tabs = [
    { tab: "1", id: "0" },
    { tab: "2", id: "1" },
    { tab: "3", id: "2" },
    ]

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className={`${styles.container} d-flex flex-column align-items-center`}>
            <h1 className={styles.title}><span>03</span>space launch 101</h1>
            <div className={styles.imgContainer}>
              {imageUrls.map((img, i) => 
                <div key={i} className={styles.techImgContainer}>
                    {currentTab === `${i}` && 
                    <img className={`${styles.techImg} w-100`} src={img}></img>}
                </div>
              )}
            </div >
            <div className={`${styles.wrapper} d-flex flex-column align-items-center`}>
                <div className={`${styles.tabsContainer} d-flex justify-content-evenly w-75 mt-5 mb-5`}>
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
                <p className={styles.subtitle}>the terminology...</p>
                <div>
                    {technologyData.map((tech, i) =>
                        <div key={i}  >
                            {currentTab === `${i}` && 
                            <div className="d-flex flex-column align-items-center">
                                <p className={styles.term}>{tech.attributes.term}</p>
                                <p className={styles.description}>{tech.attributes.description}</p>
                            </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Technology