import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id }, relations: ['documents'] }); // include documents relation
  }

  findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username }, relations: ['documents'] }); // include documents relation
  }

  save(user: User): Promise<User> {
    return this.repo.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
