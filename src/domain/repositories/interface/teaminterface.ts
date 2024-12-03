// repositories/interfaces/ITeamRepository.ts  
import { ITeam } from "../../../application/interfaces/team.interfaces";

export interface ITeamRepository {  
    createTeam(teamData: ITeam): Promise<ITeam>;  
    getTeamsByCreator(createdBy: string): Promise<ITeam[]>;
    getAllTeams(): Promise<ITeam[]>;  
    getTeamById(teamId: string): Promise<ITeam | null>;  
    updateTeam(teamId: string, updatedData: Partial<ITeam>): Promise<ITeam | null>;  
    deleteTeam(teamId: string): Promise<ITeam | null>;  
    findByName(teamName: string): Promise<ITeam | null>;
}