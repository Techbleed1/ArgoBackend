import { Follower } from '../../entities/follower.model';

export interface FollowerRepositoryInterface {
  findFollowersById(id: string): Promise<Follower[]>;
  findFollowingById(id: string): Promise<Follower[]>;
  findFollowersCountById(id: string): Promise<number>;
  findFollowingCountById(id: string): Promise<number>;
}
