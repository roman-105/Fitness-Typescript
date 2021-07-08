/**
 * Test emptiness of object
 * @param object object to be tested
 * @returns `true` if object is empty
 */
export function isEmpty(object: object): boolean {
  return Object.keys(object).length === 0;
}

export function findAllIndexes(array: any[], key: string, value: string | number) {
  return array.reduce((acc, element, index) => {
    if (element[key] === value) acc.push(index);
    return acc;
  }, []);
}

/**
 * if item is included in the whitelist returns item, else returns a default value of whitelist
 * @param item item to filter
 * @param whitelist usable items
 * @param defaultResult default result. Optional, if not provided default result  will be item[0]
 */
export function filterByWhitelist<T>(item: T, whitelist: T[], defaultResult?: T): T {
  return whitelist.includes(item) ? item : defaultResult || whitelist[0];
}

export function secondsToMinutesString(seconds: number): string {
  if (seconds < 0) return '0:00';
  const minutesString = Math.trunc(seconds / 60);
  const secondsString = Math.trunc(seconds % 60);
  return `${minutesString}:${secondsString < 10 ? `0${secondsString}` : `${secondsString}`}`;
}

export const dayNumberToString: Record<
  number,
  'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
};

export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);
