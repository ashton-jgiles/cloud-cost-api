import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUser: User = {
    id: 1,
    email: 'john.doe@example.com',
    name: 'John Doe',
    created_at: '2025-08-21 05:21:30.148',
    updated_at: '2025-08-21 05:21:30.148',
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User), // <--- Use this instead of DataSource
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([mockUser]);
    expect(mockRepository.find).toHaveBeenCalled();
  });
});
