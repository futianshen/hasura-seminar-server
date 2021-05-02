import express from "express"

const router = express.Router()

router.post("/login", (req, res) => {
  console.log(req.body)
  const { username, password } = req.body

  return res.send({
    code: "ERROR",
    result: null,
  })

  return {
    code: "SUCCESS",
    result: {
      auth_token: "",
    },
  }
})

export default router
