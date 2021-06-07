export namespace Arrays {
  /** Convert an array of arrays into a single array */
  export function flatten<T>(...arrays: (T[] | undefined)[]) {
    return arrays.reduce<T[]>((output, current) => (current ? [...output, ...current] : output), []);
  }

  /** A dictionary of arrays */
  type ArrayDictionary<T, Keys extends string> = Record<Keys, T[]>;

  /** Sort an array into a dictionary of arrays keyed by a value to sort on */
  export const arrayToArrayDictionary = <T, Keys extends string = string>(array: T[], getKey: (item: T) => Keys): ArrayDictionary<T, Keys> =>
    array.reduce<ArrayDictionary<T, Keys>>((dictionary, currentValue) => {
      const key = getKey(currentValue);

      return { ...dictionary, [key]: [...(dictionary[key as any] || []), currentValue] };
    }, {} as ArrayDictionary<T, Keys>);

  interface IArrayWithKey<T, Keys extends string> {
    items: T[];
    key: Keys;
  }

  /** Sort an array into an array of objects with a key and an array of items on it */

  export const arrayToArraysByKey = <T, Keys extends string = string>(array: T[], getKey: (item: T) => Keys) => {
    const dictionary = arrayToArrayDictionary(array, getKey);
    return Object.keys(dictionary).map<IArrayWithKey<T, Keys>>((key) => ({ key: key as Keys, items: dictionary[key] }));
  };

  /**
   * Re-indexes an array from a specific index point.
   * - Does not mutate the passed array, returns a new one.
   * @example If `["a", "b", "c", "d", "e"]` was passed with a `startFrom` index of `2`, the result would be `["c", "d", "e", "a", "b"]`
   * @param array The array to clone and re-index.
   * @param startFrom The current index of the new first item.
   * @returns A new array, re-indexed with the item at the `startFrom` index now first.
   */
  export function reIndex<T>(array: T[], startFrom: number): T[] {
    if (startFrom === 0) {
      return array;
    }
    return [...[...array].splice(startFrom, array.length - startFrom), ...[...array].splice(0, startFrom)];
  }

  /**
   * Creates a new array containing an item count that matches the passed `count`.
   * - The items in the array are simply the index numbers.
   * - Useful when you want to run a `map` x number of times but you don't have a specific array to loop.
   * @param count The number of items that the new array should contain.
   * @returns A new array of index numbers matching the length of `count`.
   */
  export function range(count: number): number[] {
    const array: number[] = [];
    for (let i = 0; i < count; i += 1) {
      array.push(i);
    }
    return array;
  }

  export namespace ArrayArrays {
    export const getArrayIndex = <T>(innerIndex: number, outerIndex: number, arrays: { items: T[] }[]) => {
      return arrays.slice(0, outerIndex).reduce((output, array) => array.items.length + output, 0) + innerIndex;
    };

    export const getAtIndex = <T>(index: number, arrays: { items: T[] }[]) => {
      let totalIndex = 0;

      for (const array of arrays) {
        const newIndex = totalIndex + array.items.length;

        if (index < newIndex) {
          return array.items[index - totalIndex];
        }

        totalIndex = newIndex;
      }
    };
  }
}
