import User from "../models/userModel.js";

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    User.create({
        name,
        email,
        password
    }).then((newUser) => {
        res.status(201).json(newUser);
    }).catch((err) => {
        console.error("Error creating user:", err.message);
        res.status(500).json({ error: "Failed to create user" });
    });

}

const Login = async (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        email
    }).then(
        (userfinded) => {
            res.cookie("token", token, options)
            res.send(201, { success: true, msg: "find the user below", userData: userfinded })
        }
    )
}

export { signUp }