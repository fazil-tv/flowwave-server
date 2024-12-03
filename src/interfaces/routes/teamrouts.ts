import { Router } from "express";
const router = Router();

import { TeamController } from "../controllers/teamController/teamController";
import authMiddleware from "../middleware/authMiddleware";


import { CreateTeamUseCase } from "../../application/usecases/team/create-team-usecases";
import { GetTeamsByCreatorUseCase } from "../../application/usecases/team/getteam-bycreator-usecases";
import { TeamRepository } from "../../domain/repositories/implementation/teamRepository";
import { UpdateTeamUseCase } from "../../application/usecases/team/update-team-usecases";

const teamRepository = new TeamRepository()


const getTeamsByCreatorUseCase = new GetTeamsByCreatorUseCase(
    teamRepository
);

const createTeamUseCase = new CreateTeamUseCase(teamRepository)
const updateTeamUseCase = new UpdateTeamUseCase(teamRepository)


const teamController =new TeamController(createTeamUseCase,getTeamsByCreatorUseCase,updateTeamUseCase)


router.post('/create', authMiddleware, (req, res) => {
    teamController.createTeam(req,res)
})

router.get('/user-teams/:userId', (req,res)=>{
    teamController.getTeamsByCreator(req,res)
});

router.patch('/updateteam', authMiddleware,(req,res)=>{
    console.log("kkkkkkkkkkkk")
    teamController.updateTeam(req,res)
});






export default router;

