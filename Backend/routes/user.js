const express=require("express")
const router=express.Router()
const {validateToken}=require("../middleware/jwt.js")
const {validateAdmin}=require("../middleware/checkAdmin.js")

const {validateUserIsLogin,userRegister,userLogin,getAllUsers,updateUserDetails,deleteUser}=require("../controllers/userController")


router.get("/validateUserIsLogin",validateUserIsLogin)
router.post("/userRegister",userRegister)
router.post("/userLogin",userLogin)
router.post("/allusers",validateToken,validateAdmin,getAllUsers)
router.put("/updateUser",validateToken,validateAdmin,updateUserDetails)
router.delete("/deleteUser",validateToken,validateAdmin,deleteUser)


module.exports=router;