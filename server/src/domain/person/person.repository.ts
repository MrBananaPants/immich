import { AssetFaceId } from '@app/domain';
import { AssetEntity, AssetFaceEntity, PersonEntity } from '@app/infra/entities';
export const IPersonRepository = 'IPersonRepository';

export interface PersonSearchOptions {
  minimumFaceCount: number;
  withHidden: boolean;
}

export interface UpdateFacesData {
  oldPersonId: string;
  newPersonId: string;
}

export interface IPersonRepository {
  getAll(): Promise<PersonEntity[]>;
  getAllWithoutThumbnail(): Promise<PersonEntity[]>;
  getAllForUser(userId: string, options: PersonSearchOptions): Promise<PersonEntity[]>;
  getAllWithoutFaces(): Promise<PersonEntity[]>;
  getById(userId: string, personId: string): Promise<PersonEntity | null>;

  getAssets(userId: string, personId: string): Promise<AssetEntity[]>;
  prepareReassignFaces(data: UpdateFacesData): Promise<string[]>;
  reassignFaces(data: UpdateFacesData): Promise<number>;

  create(entity: Partial<PersonEntity>): Promise<PersonEntity>;
  update(entity: Partial<PersonEntity>): Promise<PersonEntity>;
  delete(entity: PersonEntity): Promise<PersonEntity | null>;
  deleteAll(): Promise<number>;

  getFaceById(payload: AssetFaceId): Promise<AssetFaceEntity | null>;
  getRandomFace(personId: string): Promise<AssetFaceEntity | null>;
}
