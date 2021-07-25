import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findOne(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      id
    });
    return user;
  }
}

export default UsersRepository;
