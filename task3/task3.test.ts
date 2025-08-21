import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('task3', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('returns current utc date when no argument is passed', () => {
    mockDate.set({isoDate: '2007-01-31T23:15:00Z'});
    expect(getUtcStringDate()).toBe('2007-01-31T23:15:00Z');
  });

  it('returns utc iso string when date passed as argument', () => {
    const date = new Date('2007-03-10T15:00:00+05:00');
    const result = getUtcStringDate(date);

    expect(result).toBe('2007-03-10T10:00:00.000Z');
  });

  it('returns correct iso string when provided with positive offset', () => {
    mockDate.set({ offset: 420, isoDate: '2025-08-21T00:00:00Z' });
    expect(getUtcStringDate()).toBe('2025-08-21T00:00:00Z');
  });

  it('returns correct iso string when provided with negative offset', () => {
    mockDate.set({ offset: -420, isoDate: '2025-08-21T00:00:00Z' });
    expect(getUtcStringDate()).toBe('2025-08-21T00:00:00Z');
  });
});
