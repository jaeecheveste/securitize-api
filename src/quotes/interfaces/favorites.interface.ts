import { Document } from 'mongoose';

export interface FavoritesAssets extends Document {
  readonly id: string;
  readonly assetId: string;
  readonly userId: string;
}
