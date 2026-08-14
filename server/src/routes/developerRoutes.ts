import { Router } from "express";

import {
    getDeveloperByIdController,
    getDevelopersController,
    getGraphStatsController,
    searchDevelopersController,
} from "../controllers/developerController";

const router = Router();

router.get("/search", searchDevelopersController);
router.get("/stats", getGraphStatsController);
router.get("/", getDevelopersController);
router.get("/:id", getDeveloperByIdController);

export default router;