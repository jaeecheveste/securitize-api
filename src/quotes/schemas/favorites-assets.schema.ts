import * as mongoose from 'mongoose';

export const FavoritesAssetsSchema = new mongoose.Schema({
  assetId: { type: String, required: true },
  userId: { type: String, required: true },
});
