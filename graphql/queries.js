import { gql } from "@apollo/client"

const destinationList = gql`
 query {
  destinations {
    data {
      id
      attributes {
        name
        distance
      }
    }
  }
}
`

export { destinationList }