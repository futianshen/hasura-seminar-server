import cors from "cors"
import dotenv from "dotenv"
import dotenvFlow from "dotenv-flow"
import express from "express"
import router from "./router"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

dotenv.config()
dotenvFlow.config()
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
