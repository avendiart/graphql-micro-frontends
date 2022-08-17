import gql from 'graphql-tag'

gql`
  query Submissions {
    submissions {
      id
    }
  }

  mutation CreateSubmission {
    createSubmission {
      id
    }
  }
`
