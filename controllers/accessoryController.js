const { Router } = require("express");
const accessoryService = require("../services/accessoriyService")


const router = Router();

router.get("/create", (req, res) => {
    res.render("createAccessory")
});



//TODO: Create validation middleware or validate incomming data inside the action:
router.post("/create", (req, res) => {

    accessoryService.create(req.body)
        .then(() => {
            res.redirect("/products")
        })
        .catch(() => res.status(400));
});

module.exports = router;