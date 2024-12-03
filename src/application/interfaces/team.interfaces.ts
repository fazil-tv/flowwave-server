export interface ITeam {  
    id: string;  
    TeamName: string;
    Description?: string; 
    TeamLead?: string; 
    memberIds: string[]; 
    createdBy: string; 
}  