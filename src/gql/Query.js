import {gql} from '@apollo/client';

export const PROMOS_QUERY = gql`
  query PromosQuery {
    promotions {
      _id
      title
      price
      promoPrice
      voucherCode
      status
      images
      expiryDate
      shop {
        name
        address
      }
    }
  }
`;

export const DEALS_QUERY = gql`
  query DealsQuery {
    deals {
      _id
      title
      price
      promoPrice
      voucherCode
      status
      images
      expiryDate
      shop {
        name
        address
      }
    }
  }
`;

export const NEAR_PROMOTIONS_QUERY = gql`
  query NearPromotionsQuery($latitude: Float!, $longitude: Float!) {
    nearPromotions(latitude: $latitude, longitude: $longitude) {
      _id
      title
      price
      promoPrice
      voucherCode
      status
      images
      expiryDate
      shop {
        name
        address
      }
    }
  }
`;

export const PERSONAL_LOANS_QUERY = gql`
  query PersonalLoansQuery($user: String!) {
    personalLoans(user: $user) {
      _id
      amount
      months
      status
      createdAt
    }
  }
`;

export const PERSONAL_LOAN_QUERY = gql`
  query PersonalLoanQuery($_id: String!) {
    personalLoan(_id: $_id) {
      _id
      amount
      months
      status
      createdAt
      user {
        _id
      }

 moneyMember{
  name
  surname
 }

    }
  }
`;

export const CASH_ADVANCES_QUERY = gql`
  query CashAdvancesQuery($user: String!) {
    cashAdvances(user: $user) {
      _id
      amount
      status
      createdAt
    }
  }
`;

export const CASH_ADVANCE_QUERY = gql`
  query CashAdvanceQuery($_id: String!) {
    cashAdvance(_id: $_id) {
      _id
      amount
      status
      createdAt
      user {
        _id
      }
     moneyMember {
       name
       surname
     }
    }
  }
`;

export const ADMIN_CASH_ADVANCES_QUERY = gql`
  query CashAdvancesQuery {
    admin_cashAdvances {
      _id
      amount
      status
      createdAt
      user {
        email
      }
      moneyMember {
        _id
         name
          surname
        }
    }
  }
`;

export const LOANS_QUERY = gql`
  query LoansQuery($userId: String!) {
    loans(userId: $userId) {
      _id
      amount
    }
  }
`;

export const ADMIN_LOANS_QUERY = gql`
  query AdminLoansQuery {
    admin_personalLoans {
      _id
      amount
      status
      months
      user {
        email
      }
      moneyMember {
        _id
         name
          surname
        }

    }
  }
`;

export const PAYMENTS_QUERY = gql`
  query PaymentsQuery($user: String!) {
    payments(user: $user) {
      _id
      amount
      type
      tx_ref
      ref
      createdAt
    }
  }
`;


export const ADMIN_PAYMENTS_QUERY = gql`
  query AdminPaymentsQuery {
    admin_payments {
      _id
      amount
      type
      tx_ref
      ref
      createdAt
      moneyMember {
        name
        surname
      }
    }
  }
`;

export const ADMIN_MESSAGES_QUERY = gql`
  query AdminPaymentsQuery {
    admin_messages {
      _id
      receiver {
       _id
      }
      sender {
       _id
      }
      content
      status
    }
  }
`;

export const LIKES_QUERY = gql`
  query LikesQuery($user: String!) {
    likes(user: $user) {
      _id
      promotion {
        _id
        title
        price
        promoPrice
        voucherCode
        shop {
          name
          address
        }
      }
      user {
        _id
      }
    }
  }
`;

export const LIKE_QUERY = gql`
  query Like($promo: String!, $user: String!) {
    like(promo: $promo, user: $user) {
      _id
    }
  }
`;

export const USER_QUERY = gql`
  query UserQuery($user: String!) {
    user(user: $user) {
      _id
      email
      verificationStatus
      moneyMember {
        name
        surname
        verificationStatus
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query UsersQuery {
    users{
      _id
      email
      verificationStatus
      moneyMember {
        name
        surname
        verificationStatus
      }
      createdAt
    }
  }
`;

export const GET_MONEY_MEMBERSHIP_BY_ID = gql`
  query MoneyMemberQuery($user: String!) {
    moneyMember(user: $user) {
      _id
      name
      surname
      bank
      bankAccount
      verificationStatus
    }
  }
`;

export const GET_MONEY_MEMBER = gql`
  query MoneyMemberQuery($user: String!) {
    moneyMemberID(user: $user) {
      _id
      name
      surname
      bank
      bankAccount
      verificationStatus
      nationalIdUrl
      bankStatementUrl
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query MessagesQuery($receiver: String!) {
    messages(receiver: $receiver) {
      _id
      content
      status
      createdAt
    }
  }
`;

export const GET_BANNERS_QUERY = gql`
  query BannersQuery {
    banners {
      _id
      image
      name
      expiryDate
      type
    }
  }
`;



export const ADMIN_PROMOTIONS_QUERY = gql`
  query AdminPromotionsQuery {
    admin_promotions {
      _id
      title
      price
      type
      promoPrice
      voucherCode
      status
      images
      expiryDate
      shop {
        name
        address
      }
    }
  }
`;


export const PROMOTION_QUERY = gql`
  query PromotionQuery($_id: String!) {
    promotion(_id: $_id) {
      _id
      title
      price
      promoPrice
      voucherCode
      status
      images
      expiryDate
      shop {
        _id
        name
        address
      }
    }
  }
`;

export const PROMOTION_EDIT_QUERY = gql`
  query PromotionEditQuery($_id: String!) {
    promotionEdit(_id: $_id) {
      _id
      title
      price
      promoPrice
      voucherCode
      status
      images
      expiryDate
      type
    }
  }
`;

export const SHOP_PROMOTIONS_QUERY = gql`
  query shopPromotionsQuery($shop: String!) {
    shopPromotions(shop: $shop) {
      _id
      title
      price
      promoPrice
      voucherCode
      status
      images
      expiryDate
      type
    }
  }
`;

export const ADMIN_MONEY_MEMBERS_QUERY = gql`
  query MoneyMembersQuery {
    moneyMembers {
      _id
      name
      surname
      bank
      phone
      bankAccount
      verificationStatus
      cashAdvanceLimit
      personalLoanLimit
    }
  }
`;

export const SHOPS_QUERY = gql`
  query ShopsQuery {
    shops {
      _id
      name
      address
      createdAt
      location {
        type
        coordinates
      }
    }
  }
`;

export const SHOP_QUERY = gql`
  query ShopQuery($_id: String!) {
    shop(_id: $_id) {
      _id
      name
      address
      createdAt
      location {
        type
        coordinates
      }
    }
  }
`;

export const BANKS_QUERY = gql`
  query BanksQuery {
    banks {
      _id
      name
    }
  }
`;


export const VOUCHERCODES_QUERY = gql`
  query VoucherCodesQuery($promotion: String!) {
    voucherCodes(promotion: $promotion) {
      _id
      code
      status
    }
  }
`;


export const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      _id
      name
      subCategories{
        name
        products {
        name
      }
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
      _id
    name
    guestPrice
    tradeAccountPrice
    bulkPrice
    shortDescription
    longDescription
    images
    tags
    categories {
      _id
    }
    subCategories {
      _id
    }
    keyFeatures
    availability
    deliveryInformation
    technicalDownLoads
    # technicalSpecifications
    reviews {
      _id
    }
    shop {
      _id
    }
    expiryDate 
    createdAt
      
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ProductQuery($_id: String!) {
    product(_id: $_id) {
      _id
      name
    guestPrice
    tradeAccountPrice
    bulkPrice
    shortDescription
    longDescription
    images
    tags
    categories {
      _id
    }
    subCategories {
      _id
    }
    keyFeatures
    availability
    deliveryInformation
    technicalDownLoads
    # technicalSpecifications
    reviews {
      _id
    }
    # shop {
    #   _id
    # }
    expiryDate 
    createdAt
    }
  }
`;


export const CART_PRODUCTS_QUERY = gql`
  query CartProductsQuery($ids: [String]) {
    cartProducts(ids: $ids) {
      _id
    name
    guestPrice
    tradeAccountPrice
    bulkPrice
    images
    }
  }
`;




