/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_USER
// ====================================================

export interface GET_USER_user {
  __typename: "user";
  id: any;
  username: string;
  password: string;
  role: string;
}

export interface GET_USER {
  /**
   * fetch data from the table: "user"
   */
  user: GET_USER_user[];
}

export interface GET_USERVariables {
  username?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
