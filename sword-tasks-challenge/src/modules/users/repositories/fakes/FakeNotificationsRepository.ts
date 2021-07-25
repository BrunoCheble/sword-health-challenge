import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {

  private users: User[] = [];

  public async findOne(id: number): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}

export default UsersRepository;
