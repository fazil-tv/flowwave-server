
import mongoose, { Document, Schema } from 'mongoose';  
import { ITeam } from '../../../../application/interfaces/team.interfaces';


const TeamSchema: Schema = new Schema({  
    TeamName: { type: String, required: true, unique: true },  
    Description: { type: String, required: false },  
    TeamLead: { type: Schema.Types.ObjectId, ref: 'Member' },  
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    createdBy: { type: String, required: true }  
}, {  
    timestamps: true 
});  

 
const TeamModel = mongoose.model<ITeam>('Team', TeamSchema);  

export { TeamModel };