import { Router } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { addNewUser, getListUserByAdmin, getListUserByManager, getUserByUsername, getUserWithRoleById } from "../controller/userController.js";

const userRouter = Router()
const JWT_SECRET = 'secret'

userRouter.post('/register', async (req, res) => {

    const { username, password, role_id } = req.body

    console.log(username, password, role_id);


    try {
        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword);

        //query
        const result = await addNewUser({ username, password: hashPassword, role_id })

        if (result === 'success') {
            res.status(200).json({ message: 'success' })
        } else {
            res.status(400).json({ message: 'error' })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'error' })
    }

})

userRouter.post('/login', async (req, res) => {

    const { username, password } = req.body
    try {
        const result = await getUserByUsername({ username })
        if (result.length === 0) {
            return res.status(404).json({ message: 'Not found' })
        }

        const user = result[0]

        // compare password with hashpassword (from table)
        const matched = await bcrypt.compare(password, user.password)
        if (!matched) {
            return res.status(404).json({ message: 'Not found' })
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
        console.log("your token", token);

        return res.status(200).json({ message: 'ok', token })

    } catch (error) {
        return res.status(500).json({ message: 'error' })
    }
})

//middelware capture bearer token convert back to user id
const jwtTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]

    //convert token to userID
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "unauth" })
        }
        const userId = payload.id
        req.user = userId
    })

    next()
}

userRouter.get('/verify', jwtTokenMiddleware, async (req, res) => {

    try {
        const result = await getUserWithRoleById({ id: req.user })
        console.log(result);

        if (result.length === 0) {
            return res.status(404).json({ message: "not found" })
        }
        const user = result[0]
        return res.status(200).json({ message: 'succ', role: user.role }); // Only return this response

    } catch (error) {
        return res.status(409).json({ message: 'conflict' })
    }

    // console.log(req.user);

    // res.status(200).json({ message: 'success' })
})

// Endpoint สำหรับดึงข้อมูล โดยใช้ ID ที่ได้จาก token เพื่อตรวจสอบ role
userRouter.get('/listby', jwtTokenMiddleware, async (req, res) => {
    try {
        // userID from jwt
        const userInfo = await getUserWithRoleById({ id: req.user });

        if (!userInfo || userInfo.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userRole = userInfo[0].role;

        // validate
        if (userRole === 'Worker') {
            return res.status(403).json({ message: "403 Not have permission" });
        } else if (userRole === 'Manager') {
            const list = await getListUserByManager()
            return res.status(200).json(list)
        } else {
            const list = await getListUserByAdmin()
            return res.status(200).json(list)
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default userRouter