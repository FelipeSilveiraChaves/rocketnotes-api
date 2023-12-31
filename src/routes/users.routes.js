const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")


const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const UserAvatarController = require("../controllers/UserAvatarController")
const UsersController = require("../controllers/UsersController");



const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post('/', userController.create);
usersRoutes.put('/', ensureAuthenticated, userController.update);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)




module.exports = usersRoutes;