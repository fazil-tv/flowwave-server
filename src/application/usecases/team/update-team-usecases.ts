import { ITeamRepository } from "../../../domain/repositories/interface/teaminterface"; // Adjust the import according to your project structure

export class UpdateTeamUseCase {
    private teamRepository: ITeamRepository;

    constructor(teamRepository: ITeamRepository) {
        this.teamRepository = teamRepository;
    }

    public async execute(teamId: string, teamData: any): Promise<{ success: boolean; message?: string; data?: any }> {
        try {

            const updatedTeam = await this.teamRepository.updateTeam(teamId, teamData);
            if (!updatedTeam) {
                return { success: false, message: 'Team not found' };
            }
            return { success: true, data: updatedTeam };
        } catch (error) {
            console.error('Error updating team:', error);
            return { success: false, message: 'Failed to update team' };
        }
    }
}
