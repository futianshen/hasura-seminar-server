import cors from "cors"
import dotenv from "dotenv"
import dotenvFlow from "dotenv-flow"
import express from "express"

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()
dotenvFlow.config()
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
