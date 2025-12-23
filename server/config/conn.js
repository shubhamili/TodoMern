import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URI)
            .then(() => {
                console.log("database connect ho gya ji");
            })
            .catch((err) => {
                console.log("mongodb connection error ======>  ", err);
            })
    } catch (error) {
        console.log("error in db", error);

    }


}