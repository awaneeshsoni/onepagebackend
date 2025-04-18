import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import linkRoutes from "./routes/linkRoutes.js"
import pageRoutes from "./routes/pageRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
dotenv.config();

const app = express();
const corsOptions = {
  origin: ['https://inonepage.vercel.app', 'http://localhost:5173', 'https://inonepage.contentarc.co'],  // Replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/auth',authRoutes )
app.use('/api/links',linkRoutes )
app.use('/api/pages', pageRoutes )
app.use('/api/messages', messageRoutes )

app.get('/', (req,res)=>{
    res.status(200).send("All good")
})
// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
