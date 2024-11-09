import mongoose, { Document, Schema } from 'mongoose';

interface ServiceDocument extends Document {
  name: string;
  category: string;
  description: string;
  duration: string;
  cost: string;
  images: string[];
}

const ServiceSchema = new Schema<ServiceDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  cost: { type: String, required: true },
  images: [String],
});

export const ServiceModel = mongoose.model<ServiceDocument>('Service', ServiceSchema);
