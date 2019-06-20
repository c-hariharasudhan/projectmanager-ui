import { Serviceerror } from './serviceerror';

describe('Serviceerror', () => {
  it('should create an instance', () => {
    expect(new Serviceerror('Test')).toBeTruthy();
  });
});
