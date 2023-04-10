import { gql } from "@apollo/client"

const destinationList = gql`
query {
    destinations {
        data {
            id
            attributes {
                name
                description
                distance
                travelTime
                durationUnit
                distanceUnit
                image {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
            }
        }
    }
}
`
const crewList = gql`
query {
    crews {
        data {
            id 
            attributes {
                role
                fullName
                bio
                image {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
            }
        }
    }
}

`

const technologyList = gql`
query {
    technologies {
        data {
            id
            attributes {
                term
                description
                image {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
            }
        }
    }
}

`

export { destinationList, crewList, technologyList }