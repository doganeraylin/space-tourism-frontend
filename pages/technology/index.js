import Technology from '../../components/Technology/Technology'
import { getTech } from '../../lib/fetchData';


export async function getStaticProps() {
    const tech = await getTech()
    return {
        props: {
            tech
        },
    };
}


const technology = ({ tech }) =>
    <Technology tech={tech} />
export default technology