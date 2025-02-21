import {gql} from '@apollo/client';

// export const LOGIN_MUTATION = gql`
//   mutation LOGIN($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;

// export const LOGIN_MUTATION = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(input: {email: $email, password: $password}) {
      _id
      email
      token
    }
  }
`;

export const LOGIN_ADMIN_MUTATION = gql`
  mutation LoginAdmin($email: String, $password: String) {
    loginAdmin(input: {email: $email, password: $password}) {
      _id
      email
      token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: {email: $email, password: $password}) {
      _id
      email
      token
    }
  }
`;

export const CREATE_USER_FROM_GOOGLE_MUTATION = gql`
  mutation CreateUserFromGoogle($token: String!, $email: String!) {
    createUserFromGoogle(input: {token: $token, email: $email}) {
      _id
      email
      token
      verificationStatus
    }
  }
`;

export const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePayment(
    $amount: Float!
    $user: String!
    $type: String
    $tx_ref: String
    $transaction_id: String
  ) {
    createPayment(
      input: {
        amount: $amount
        user: $user
        type: $type
        tx_ref: $tx_ref
        transaction_id: $transaction_id
      }
    ) {
      amount
    }
  }
`;

export const CASH_ADVANCE_MUTATION = gql`
  mutation CreateCashAdvance($amount: Float!, $userId: String!) {
    createCashAdvance(input: {amount: $amount, user: $userId}) {
      amount
    }
  }
`;

export const UPDATE_CASH_ADVANCE_MUTATION = gql`
  mutation UpdateCashAdvanceLoan(
    $_id: String!
    $status: String!
    $email: String!
  ) {
    updateCashAdvance(
      input: {_id: $_id, status: $status, email: $email}
    ) {
      amount
    }
  }
`;

export const PERSONAL_LOAN_MUTATION = gql`
  mutation CreatePersonalLoan(
    $amount: Float!
    $months: Int!
    $userId: String!
  ) {
    createPersonalLoan(
      input: {amount: $amount, months: $months, user: $userId}
    ) {
      amount
      months
    }
  }
`;

export const UPDATE_PERSONAL_LOAN_MUTATION = gql`
  mutation UpdatePersonalLoan(
    $_id: String!
    $status: String!
    $email: String!
  ) {
    updatePersonalLoan(
      input: {_id: $_id, status: $status, email: $email}
    ) {
      amount
      months
    }
  }
`;

export const CREATE_LIKE_MUTATION = gql`
  mutation CreateLike($user: String, $promotion: String) {
    createLike(input: {user: $user, promotion: $promotion}) {
      _id
    }
  }
`;
export const DELETE_LIKE_MUTATION = gql`
  mutation DeleteLike($user: String!, $promotion: String!) {
    deleteLike(input: {user: $user, promotion: $promotion}) {
      _id
    }
  }
`;

export const UPDATE_USER_TOKEN_MUTATION = gql`
  mutation UpdateUserToken($user: String!, $deviceToken: String!) {
    updateUserToken(input: {user: $user, deviceToken: $deviceToken}) {
      _id
    }
  }
`;

export const SUSPEND_MONEY_ACCOUNT_MUTATION = gql`
  mutation SuspendMoneyAccount($user: String!, $status: String!) {
    suspendMoneyAccount(input: {user: $user, status: $status}) {
      status
    }
  }
`;

export const DELETE_MONEY_MEMBER_MUTATION = gql`
  mutation DeleteMoneyMember($_id: String!) {
    deleteMoneyMember(input: {_id: $_id}) {
      _id
    }
  }
`;


export const CREATE_MONEY_MEMBER_MUTATION = gql`
  mutation CreateMoneyMember(
    $user: String!
    $name: String!
    $surname: String!
    $nationalID: String!
    $bank: String!
    $bankAccount: String!
    $phone: String!
    $bankStatementUrl: String!
    $nationalIdUrl: String!
  ) {
    createMoneyMember(
      input: {
        user: $user
        name: $name
        surname: $surname
        nationalID: $nationalID
        bank: $bank
        bankAccount: $bankAccount
        phone: $phone
        nationalIdUrl: $nationalIdUrl
        bankStatementUrl: $bankStatementUrl
      }
    ) {
      _id
    }
  }
`;

export const UPDATE_MONEY_MEMBER_MUTATION = gql`
  mutation UpdateMoneyMember(
    $user: String!
    $verificationStatus: VerificationStatus
    $personalLoanLimit: Float
    $cashAdvanceLimit: Float

  ) {
    updateMoneyMember(
      input: {
        user: $user
        verificationStatus: $verificationStatus
        personalLoanLimit: $personalLoanLimit
        cashAdvanceLimit: $cashAdvanceLimit
      }
    ) {
      _id
    }
  }
`;

export const SEND_PASSWORD_RESET_MUTATION = gql`
  mutation SendPasswordReset($email: String!) {
    sendPasswordReset(input: {email: $email}) {
      status
    }
  }
`;

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation UpdateMessage($id: String) {
    updateMessage(input: {id: $id}) {
      status
      content
      createdAt
    }
  }
`;






export const CREATE_PROMOTION_MUTATION = gql`
  mutation CreatePromotionMutation(
    $shop: String
    $type: String
    $title: String
    $price: Float
    $promoPrice: Float
    $expiryDate: String
    $numberOfVoucherCodes: Float
    $images: [String]
  ) {
    createPromotion(
      input: {
              shop: $shop, 
              type: $type, 
              title: $title, 
              price: $price, 
              promoPrice: $promoPrice, 
              expiryDate: $expiryDate, 
              numberOfVoucherCodes: $numberOfVoucherCodes, 
              images: $images
              }
    ) {
      _id
    }
  }
`;

export const UPDATE_PROMOTION_MUTATION = gql`
  mutation UpdatePromotionMutation(
    $_id: String
    $shop: String
    $type: String
    $title: String
    $price: Float
    $promoPrice: Float
    $expiryDate: String
    $images: [String]
  ) {
    updatePromotion(
      input: {
              _id: $_id, 
              shop: $shop, 
              type: $type, 
              title: $title, 
              price: $price, 
              promoPrice: $promoPrice, 
              expiryDate: $expiryDate, 
              images: $images
              }
    ) {
      _id
    }
  }
`;



export const DELETE_PROMOTION_MUTATION = gql`
  mutation DeletePromotion($_id: String!) {
    deletePromotion(input: {_id: $_id}) {
      _id
    }
  }
`;


export const CREATE_SHOP_MUTATION = gql`
  mutation CreateShopMutation(
    $name: String
    $address: String
    $lat: Float
    $lng: Float
  ) {
    createShop(
      input: {
              name: $name, 
              address: $address,
              location: {
                type: "Point"
                coordinates: [$lat , $lng]
              },
         }
    ) {
      _id
    }
  }
`;

export const UPDATE_SHOP_MUTATION = gql`
  mutation UpdateShopMutation(
    $_id: String
    $name: String
    $address: String
    $lat: Float
    $lng: Float
  ) {
    updateShop(
      input: {
              _id: $_id, 
              name: $name, 
              address: $address,
              location: {
                type: "Point"
                coordinates: [$lat , $lng]
              },
         }
    ) {
      _id
    }
  }
`;


export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($_id: String!) {
    deleteUser(input: {_id: $_id}) {
      _id
    }
  }
`;


export const CREATE_BANNER_MUTATION = gql`
  mutation CreateBannerMutation(
    $name: String
    $image: String
    $expiryDate: String
    $promotion: String
    $type: String
  ) {
    createBanner(
      input: {
              name: $name, 
              image: $image, 
              expiryDate: $expiryDate, 
              type: $type, 
              promotion: $promotion, 
              }
    ) {
      _id
    }
  }
`;

export const DELETE_BANNER_MUTATION = gql`
  mutation DeleteBannerMutation(
    $_id: String
  ) {
    deleteBanner(
      input: {
              _id: $_id, 
              }
    ) {
      _id
    }
  }
`;

export const CREATE_BANK_MUTATION = gql`
  mutation CreateBankMutation(
    $name: String
  ) {
    createBank(
      input: {
              name: $name
              }
    ) {
      _id
    }
  }
`;

export const DELETE_BANK_MUTATION = gql`
  mutation DeleteBankMutation(
    $_id: String
  ) {
    deleteBank(
      input: {
              _id: $_id, 
              }
    ) {
      _id
    }
  }
`;



export const UPDATE_CART_MUTATION = gql`
  mutation UpdateCartMutation(
    $_id: String
    $user: String
    $product: String
    $quantity: Float
  ) {
    updateCart(
      input: {
              _id: $_id, 
              user: $user, 
              product: $product, 
              quantity: $quantity,
         
         }
    ) {
      _id
    }
  }
`;


