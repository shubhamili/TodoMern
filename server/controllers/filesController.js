
export const Addfile = async (req, res) => {
    try {
        const something = req.file;
        console.log('something', something)


        
        return res.status(200).json({ messsge: "file uploaded", something })


    } catch (error) {
        console.log('error', error)
        return res.status(500).json(
            { message: "failed something", error }
        )
    }



}


