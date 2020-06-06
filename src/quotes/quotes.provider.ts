import { Connection } from 'mongoose';
import { FavoritesAssetsSchema } from './schemas/favorites-assets.schema';

export const quotesProvider = [
  {
    provide: 'FAVORITES_ASSETS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('FavoritesAssets', FavoritesAssetsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
