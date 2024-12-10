import { IProject, ProjectStatus } from '../../../application/interfaces/project.interface'
import { ProjectModel } from "../../../infrastructure/database";
import { IPublicProject } from '../../../application/interfaces/';
import { Types } from 'mongoose';
import { IProjectBasic } from '../../../application/interfaces/project.basic.interfaces';
import { ProjectMemberDTO } from '../../../application/dtos/projects/getprojectmember';
import { MemberModel } from "../../../infrastructure";
// import { ITeam } from '../../../application/interfaces/team.interfaces';
interface ITeam {
    _id: Types.ObjectId;
    TeamName: string;
    memberIds: IMember[];
  }
  
  interface IMember {
    _id: Types.ObjectId;
    name: string;
    email: string;
  }



export class ProjectRepository {

    async create(projectData: IProject): Promise<IProject> {
        try {

            const project = new ProjectModel({
                ...projectData,
                status: ProjectStatus.NOT_STARTED,
                progress: 0,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const savedProject = await project.save();

            return savedProject.toObject();
        } catch (error) {
            throw new Error(`Error creating project: ${error}`);
        }
    }


    async findByName(projectName: string, userId: string): Promise<IProject | null> {
        try {
            const userObjectId = new Types.ObjectId(userId);
            const project = await ProjectModel.findOne({
                projectName,
                userId: userObjectId,
                isDeleted: false
            });
            return project ? project.toObject() : null;
        } catch (error) {
            throw new Error(`Error finding project by name: ${error}`);
        }
    }

    async saveProject(project: IProject): Promise<IProject> {
        try {
            const newProject = new ProjectModel(project);
            const savedProject = await newProject.save();
            return savedProject.toObject();
        } catch (error) {
            console.error('Error saving project:', error);
            throw new Error('Failed to save project');
        }
    }



    async getAllProjects(): Promise<IProject[]> {
        try {
            const projects = await ProjectModel.find({ isDeleted: false })
                .populate('serviceId')
                .populate('userId');

            return projects.map(project => project.toObject());
        } catch (error) {
            console.error('Error getting all projects:', error);
            throw new Error('Failed to get projects');
        }
    }

    async getProjectsByUserId(userId: string): Promise<IPublicProject[]> {
        try {
            const projects = await ProjectModel.find(
                { userId, isDeleted: false },
                {
                    _id: 1,
                    projectName: 1,
                    description: 1,
                    ProjectLead: 1,
                    projectCode: 1,
                    startDate: 1,
                    endDate: 1,
                    status: 1,
                    tags: 1,
                    completedAt: 1,
                    progress: 1
                }
            )
                .sort({ createdAt: -1 })
               .populate('ProjectLead', 'username email profileImg')
                .lean();

            return projects as unknown as IPublicProject[];
        } catch (error) {
            console.error('Error getting public projects:', error);
            throw new Error('Failed to get public projects');
        }
    }

    async findProjectById(id: string): Promise<IPublicProject[]> {
        try {
            const project = await ProjectModel.findById(
                id,
                {
                    _id: 1,
                    projectName: 1,
                    description: 1,
                    ProjectLead: 1,
                    team:1,
                    projectCode: 1,
                    status: 1,
                    tags: 1,
                    startDate: 1,
                    priority: 1,
                    endDate: 1,
                    progress: 1,
                }
            )
                .populate('ProjectLead', 'username email profileImg')
                .populate({
                    path: 'team',
                    model: 'Team', 
                })

                .lean();

            return project ? [project as unknown as IPublicProject] : [];
        } catch (error) {
            console.error('Error finding project by ID:', error);
            throw new Error('Failed to find project');
        }
    }

    async updateProject(id: string, updateData: Partial<IProject>): Promise<IProject | null> {
        try {
            const updatedProject = await ProjectModel.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true }
            )

            return updatedProject ? updatedProject.toObject() as IProject : null;
        } catch (error) {
            console.error('Error updating project:', error);
            throw new Error('Failed to update project: ' + error);
        }
    }


    async addTaskToProject(projectId: string, taskId: string): Promise<void> {
        await ProjectModel.findByIdAndUpdate(
            projectId,
            { $addToSet: { tasks: taskId } },
            { new: true }
        ).exec();
    }
    
    async findProjectByIdWithTasks(projectId: string): Promise<IProjectBasic | null> {  
        const project = await ProjectModel.findById(projectId)  
            .select('projectName _id tasks')  
       
            .populate({  
                path: 'tasks',  
                populate: {
                    path: 'assignee',
                    select: 'username email' 
                }  
            })
            .exec();  
    
        if (!project) {  
            return null; 
        }  
     
        return {  
            projectName: project.projectName, 
            _id: project._id.toString(), 
            tasks: project.tasks || [], 
        } as IProjectBasic;  
    }


    async getProjectMembers(projectId: Types.ObjectId): Promise<ProjectMemberDTO[]> {
        try {
          const project = await ProjectModel.findById(projectId)
            .populate<{ team: ITeam[] }>({
              path: 'team',
              model: 'Team',
              populate: {
                path: 'memberIds',
                model: 'Member',
                select: '_id name email' 
              }
            });
      
          if (!project) {
            throw new Error('Project not found');
          }
      
          // Create a map to store unique members
          const membersMap = new Map<string, ProjectMemberDTO>();
      
          // Process team members
          for (const team of project.team) {
            const teamMembers = team.memberIds || [];
      
            for (const member of teamMembers) {
              const memberId = member._id.toString();
              const existingMember = membersMap.get(memberId);
              
              if (existingMember) {
                const teamExists = existingMember.teams.some(
                  t => t.teamId.toString() === team._id.toString()
                );
                
                if (!teamExists) {
                  existingMember.teams.push({
                    teamId: team._id,
                    teamName: team.TeamName
                  });
                }
              } else {
                membersMap.set(memberId, {
                  userId: member._id,
                  name: member.name,
                  email: member.email,
                  teams: [{
                    teamId: team._id,
                    teamName: team.TeamName
                  }]
                });
              }
            }
          }
      
          // Find and add project members not in teams
          const projectMembers = await MemberModel.find({
            projects: projectId,
            _id: { $nin: Array.from(membersMap.keys()) }
          });
      
          for (const member of projectMembers as unknown as IMember[]) {
            membersMap.set(member._id.toString(), {
              userId: member._id,
              name: member.name,
              email: member.email,
              teams: []
            });
          }
      
          return Array.from(membersMap.values())
            .sort((a, b) => a.name.localeCompare(b.name));
      
        } catch (error) {
          console.error('Error fetching project members:', error);
          throw new Error('Failed to retrieve project members');
        }
      }






    // async softDeleteProject(id: string): Promise<boolean> {
    //     try {
    //         const result = await ProjectModel.findByIdAndUpdate(
    //             id,
    //             { $set: { isDeleted: true } }
    //         );
    //         return !!result;
    //     } catch (error) {
    //         console.error('Error deleting project:', error);
    //         throw new Error('Failed to delete project');
    //     }
    // }

}
