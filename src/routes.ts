import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

router.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get('/signin/callback', (request, response) => {
    const {code} = request.query

    return response.json(code);
})


router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
    "/messages",
    ensureAuthenticated,
    new CreateMessageController().handle
);

// router.get("/messages/last3", new Get3LastMessagesController().handle);

// router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };