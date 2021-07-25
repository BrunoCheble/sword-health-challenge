import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findOne(id: number): Promise<User | undefined>;
}
