import { useQuery } from '@apollo/client';
import { crewList } from '../../graphql/queries';
import { useState } from 'react'
import styles from './Crew.module.css'

const Crew = () => {
    const [currentTab, setCurrentTab] = useState('0');

    const { loading, error, data } = useQuery(crewList);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    const crewData = data.crews.data
    const imageUrls = crewData.map((crew) => crew.attributes.image.data.attributes.url);
    const tabs = [
    { tab: "0", id: "0" },
    { tab: "1", id: "1" },
    { tab: "2", id: "2" },
    { tab: "3", id: "3" }
    ]

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className={`${styles.container} d-flex flex-column align-items-center`}>
            <h1 className={styles.title}><span>02</span>meet your crew</h1>
            <div className={styles.imgContainer}>
              {imageUrls.map((img, i) => 
                <div key={i} className="d-flex justify-content-center">
                    {currentTab === `${i}` && 
                    <img className={`${styles.crewMemberImg} w-50`} src={img}></img>}
                </div>
              )}
            </div >
            <div className={styles.wrapper}>
                <div className={`${styles.tabsContainer} d-flex justify-content-evenly w-50 mt-5 mb-5`}>
                {tabs.map((tab, i) =>
                    <button 
                    key={i} 
                    id={tab.id} 
                    disabled={currentTab === `${tab.id}`} 
                    onClick={(handleTabClick)}
                    className={styles.tabBtn}>
                    </button>
                )}
                </div>
                <div>
                    {crewData.map((crewMember, i) =>
                        <div key={i}  >
                            {currentTab === `${i}` && 
                            <div className="d-flex flex-column align-items-center">
                                <p className={styles.role}>{crewMember.attributes.role}</p>
                                <p className={styles.fullName}>{crewMember.attributes.fullName}</p>
                                <p className={styles.bio}>{crewMember.attributes.bio}</p>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Crew