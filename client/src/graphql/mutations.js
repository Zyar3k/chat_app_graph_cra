import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SignInUser($userSignIn: UserSignInInput!) {
    signInUser(userSignIn: $userSignIn) {
      token
    }
  }
`;

export const SEND_MSG = gql`
  mutation CreateMessage($receiverId: Int!, $text: String) {
    createMessage(receiverId: $receiverId, text: $text) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`;
