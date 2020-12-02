import { UserDto } from './user.dto';

describe('UserDto.Ts', () => {
  it('should be defined', () => {
    expect(new UserDto()).toBeDefined();
  });
});
