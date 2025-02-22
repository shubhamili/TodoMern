import mongoose from "mongoose";



export const connectDB = async () => {

    try {

        mongoose.connect(`mongodb+srv://shubhamsinghia160:${process.env.DB_PASS}@cluster0.dupow.mongodb.net/TodosCollection`)
            .then(() => {
                console.log("database connected");
            })
            .catch((err) => {
                console.log("mongodb connection error ======>  ", err);
            })
    } catch (error) {
        console.log("error in db", error);

    }


}