import {gql} from '@apollo/client';

export const MONEY_MEMBER_SUBSCRIPTION = gql`
  subscription OnMoneyMemberUpdated($user: String) {
    moneyMemberUpdated(user: $user) {
      _id
      bank
      bankAccount
      phone
      name
      nationalID
      surname
      verificationStatus
    }
  }
`;

export const LIKE_ADDED_SUBSCRIPTION = gql`
  subscription OnLikeAdded($user: String) {
    likeAdded(user: $user) {
      _id
      promotion {
        _id
        title
        price
        promoPrice
        voucherCode
      }
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageAdded($receiver: String) {
    messageAdded(receiver: $receiver) {
      _id
      content
    }
  }
`;
