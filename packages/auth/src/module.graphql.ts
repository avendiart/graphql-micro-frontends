import gql from 'graphql-tag'

gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      id
      email
    }
  }

  mutation SignupUser($input: SignupUserInput!) {
    signupUser(input: $input) {
      id
      email
    }
  }

  subscription UserLoggedIn {
    userLoggedIn {
      id
      email
    }
  }
`
