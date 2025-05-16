import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
