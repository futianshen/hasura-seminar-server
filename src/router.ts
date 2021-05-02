import { gql } from "@apollo/client/core"
import express from "express"
import createApolloClient from "./apolloClient"
import { object, string } from "yup"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/login", async (req, res) => {
  const validationSchema = object({
    username: string().required(),
    password: string().required(),
  })
  try {
    await validationSchema.isValid(req.body)
  } catch (err) {
    return console.log(err)
  }
  const { username, password } = validationSchema.cast(req.body)
  process.env.NODE_ENV === "development" && console.log({ username, password })

  const apolloClient = createApolloClient()
  let user = null
  try {
    const { data } = await apolloClient.query({
      query: gql`
        query GET_USER($username: String!) {
          user(where: { username: { _eq: $username } }) {
            id
            username
            password
            role
          }
        }
      `,
      variables: { username },
    })
    user = data.user[0]
  } catch (error) {
    console.log(error)
  }
  console.log(user)

  if (!user) {
    return res.send({
      code: "E_NO_USER",
      message: "user not found",
      result: null,
    })
  }

  if (password !== user.password) {
    return res.send({
      code: "E_WRONG_PASSWORD",
      message: "password is wrong",
      result: null,
    })
  }

  const payload = {
    sub: user.id,
    username,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["admin"],
      "x-hasura-default-role": "admin",
      "x-hasura-user-id": user.id,
    },
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("no jwt secret")
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15 mins",
  })
  res.send({
    code: "SUCCESS",
    message: "login successfully",
    result: {
      token,
    },
  })
})

export default router
