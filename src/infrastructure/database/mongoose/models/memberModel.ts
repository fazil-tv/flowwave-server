import mongoose, { Schema, Document, Types } from 'mongoose';

export enum MemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  DEFAULT = "default",
}

export enum MemberStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface IMember extends Document {
  project: Types.ObjectId;
  user: Types.ObjectId;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: Date;
  lastActivity?: Date;
  permissions: {
    canCreateTasks: boolean;
    canAssignTasks: boolean;
    canDeleteProject: boolean;
  };
  invitationToken?: string;
  invitedBy?: Types.ObjectId;
}

const MemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  role: {
    type: String,
    enum: Object.values(MemberRole),
    default: MemberRole.VIEWER
  },
  status: {
    type: String,
    enum: Object.values(MemberStatus),
    default: MemberStatus.PENDING
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date
  },
  invitationToken: {
    type: String,
    unique: true,
    sparse: true
  },
  invitedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  indexes: [
    { fields: { project: 1, user: 1 }, unique: true },
    { fields: { invitationToken: 1 }, unique: true, sparse: true }
  ]
});

export const MemberModel = mongoose.model<IMember>('Member', MemberSchema);