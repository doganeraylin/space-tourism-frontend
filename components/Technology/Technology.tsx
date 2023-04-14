import { useQuery } from '@apollo/client';
import { technologyList } from '../../graphql/queries';
import { useState, useEffect } from 'react'
import { setBodyBackgroundImage } from '../Background/Background';
import styles from './Technology.module.css'
import Navbar from '../Navbar/Navbar'
 
const Technology = () => {
    
    const [currentTab, setCurrentTab] = useState('0');
    const [isPortraitFormat, setIsPortraitFormat] = useState(true); 
    const { loading, error, data } = useQuery(technologyList);
    const tabs = [
    { tab: "1", id: "0" },
    { tab: "2", id: "1" },
    { tab: "3", id: "2" },
    ]

    useEffect(() => {
    const handleResize = () => {
        setIsPortraitFormat(window.innerWidth >= 1200);
    }

    window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // useEffect(() => {
    //     console.log("useeffect")
    //     setBodyBackgroundImage(
    //     '/background-technology-mobile.jpg', 
    //     '/background-technology-tablet.jpg', 
    //     '/background-technology-desktop.jpg');
    //  }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    const technologyData = data.technologies.data
    const imgFormats = isPortraitFormat ? technologyData.map(dest => dest.attributes.image.data[1].attributes.url)
                                         : technologyData.map(dest => dest.attributes.image.data[0].attributes.url);
 

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <>
        <Navbar/>
        <h1 className={styles.title}><span>03</span>space launch 101</h1>
        <div className={`${styles.container} d-flex flex-column align-items-center d-xl-flex flex-xl-row-reverse justify-content-xl-between `}> 
            <div className={`${styles.imgContainer}`}>
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
                    className={styles.tabBtn}>
                        {tab.tab}
                    </button>
                )}
            </div>
            <div>
                {technologyData.map((tech, i) =>
                    <div key={i}  >
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
    );
}

export default Technology