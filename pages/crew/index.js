import Crew from '../../components/Crew/Crew'
import { getCrew } from '../../lib/fetchData';

export async function getStaticProps() {
    const crew = await getCrew()
    return {
        props: {
            crew
        },
    };
}

const crew = ({ crew }) =>
    <Crew crew={crew} />
export default crew