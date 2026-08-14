import { Request, Response } from "express";

import {
    getDeveloperById,
    getDevelopers,
    getGraphStats,
    searchDevelopers,
} from "../services/developerService";

interface DeveloperParams {
    id: string;
}

export const getDevelopersController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const developers = await getDevelopers();

        res.status(200).json({
            success: true,
            data: developers,
        });
    } catch (error) {
        console.error("Failed to fetch developers:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch developers",
        });
    }
};

export const getDeveloperByIdController = async (
    req: Request<DeveloperParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const developer = await getDeveloperById(id);

        if (!developer) {
            res.status(404).json({
                success: false,
                message: "Developer not found",
            });

            return;
        }

        res.status(200).json({
            success: true,
            data: developer,
        });
    } catch (error) {
        console.error("Failed to fetch developer:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch developer",
        });
    }
};

export const searchDevelopersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { skill, technology } = req.query;

        const skillValue =
            typeof skill === "string" ? skill.trim() : "";

        const technologyValue =
            typeof technology === "string" ? technology.trim() : "";

        if (!skillValue && !technologyValue) {
            res.status(400).json({
                success: false,
                message: "At least one of skill or technology is required",
            });
            return;
        }

        const developers = await searchDevelopers({
            skill: skillValue || undefined,
            technology: technologyValue || undefined,
        });

        res.status(200).json({
            success: true,
            data: developers,
        });
    } catch (error) {
        console.error("Failed to search developers:", error);

        res.status(500).json({
            success: false,
            message: "Unable to search developers",
        });
    }
};

export const getGraphStatsController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const stats = await getGraphStats();

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        console.error("Failed to fetch graph stats:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch graph statistics",
        });
    }
};