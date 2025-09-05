// TypeScript
import { generateUniqueUsername } from '../auth.controller';

describe('generateUniqueUsername', () => {
  it('should generate a unique username string', () => {
    const username = generateUniqueUsername('testuser');
    expect(username).toMatch(/^testuser_(lion|rocket|ninja|owl|tiger)_[a-z0-9]{8}_\d+$/);
  });
});