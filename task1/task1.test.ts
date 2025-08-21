import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('task2/fetchIsUserNameValid', () => ({
  fetchIsUserNameAvailable: jest.fn(),
}));

const mockedFetchIsUserNameAvailable = fetchIsUserNameAvailable as jest.MockedFunction<
  typeof fetchIsUserNameAvailable
>;

describe('task2', () => {
  it('returns false if name has length less than 3 symbols', async () => {
    await expect(validateUserName('na')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if a user name does not contain only alphanumeric symbols', async () => {
    await expect(validateUserName('ba!!')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if user name contains spaces', async () => {
    await expect(validateUserName('na me')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if user name starts with a number', async () => {
    await expect(validateUserName('3name')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if user name is valid and not unique', async () => {
    mockedFetchIsUserNameAvailable.mockResolvedValueOnce(false);

    await expect(validateUserName('jack')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledTimes(1);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledWith('John999');
  });
});