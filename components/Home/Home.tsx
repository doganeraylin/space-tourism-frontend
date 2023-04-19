import React, { useRef, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { gsap } from "gsap";
import styles from './Home.module.css'


const Home = () => {

    const exploreBtnExpand = useRef()
    const exploreBtnRotate = useRef()
    const router = useRouter()
    const [btnEffect, setBtnEffect] = useState(false)
    let mm = gsap.matchMedia();

    useEffect(() => {
        if (btnEffect) {
            mm.add({
                isMobile: "(max-width: 767px)",
                isDesktop: "(min-width: 768px)"
            },(context) => {
                let { isMobile, isDesktop } = context.conditions
                let tl = gsap.timeline();
                tl.to(exploreBtnExpand.current, {
                rotation: "+=360",
                scale: isMobile ? 22 : 12,
                ease: "circ.out",
                duration: 2,
                onComplete: () => {
                console.log("Animation complete!");
                router.push("/destination"); 
                },
            
            });
                return () => {
                    tl.kill(); 
                };
            })
        }
    }, [btnEffect]);


    useEffect(() => {
    let ctx = gsap.context(() => {
        gsap.to(exploreBtnRotate.current, { rotation: "+=460", duration: 3, y: -100, repeat: -1, yoyo: true});
    }, exploreBtnRotate);
    return () => {
        ctx.kill()
    }
    }, []);
 
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        
        setBtnEffect(true)
        e.preventDefault()
    }

    return (
        <div  className={`${styles.container}  container pt-3 d-flex flex-column align-items-center d-xl-flex flex-xl-row justify-content-lg-between align-items-lg-center`}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}> you want to travel to <span>space</span> </h1>
                <p className={styles.description}>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
            </div>
            <div ref={exploreBtnExpand}>
                <button 
                   ref={exploreBtnRotate}
                    className={styles.exploreBtn} 
                    type="button"
                    onClick={handleClick}>
                    explore
                </button>
            </div>
        </div>
    )
}


export default Home 