import Destination from '../../components/Destination/Destination'
import { getDestinations } from '../../lib/fetchData';

export async function getStaticProps() {
    const destination = await getDestinations()
    return {
        props: {
            destination
        },
    };
}



const destination = ({ destination }) => {
    console.log(destination)
    return (<Destination destination={destination} />)

}


export default destination