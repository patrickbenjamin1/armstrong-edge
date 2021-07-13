import { Objects } from '.';
export declare namespace Arrays {
    /** Convert an array of arrays into a single array */
    export function flatten<T>(...arrays: (T[] | undefined)[]): T[];
    /** Turn an array into a dictionary of items in that array by a given key */
    export function arrayToDictionary<T, Keys extends string = string>(array: T[], getKey: keyof T | ((item: T) => Keys)): Objects.Dictionary<T, Keys>;
    /** A dictionary of arrays */
    type ArrayDictionary<T, Keys extends string> = Record<Keys, T[]>;
    /** Sort an array into a dictionary of arrays keyed by a value to sort on */
    export function arrayToArrayDictionary<T, Keys extends string = string>(array: T[], getKey: (item: T) => Keys): ArrayDictionary<T, Keys>;
    interface IArrayWithKey<T, Keys extends string> {
        items: T[];
        key: Keys;
    }
    /** Sort an array into an array of objects with a key and an array of items on it */
    export function arrayToArraysByKey<T, Keys extends string = string>(array: T[], getKey: (item: T) => Keys): IArrayWithKey<T, Keys>[];
    /** A variant of findIndex that returns the index of the last item in the array where the callback returns true */
    export function findLastIndex<T>(array: T[], callback: (item: T) => boolean): number;
    /**
     * Re-indexes an array from a specific index point.
     * - Does not mutate the passed array, returns a new one.
     * @example If `["a", "b", "c", "d", "e"]` was passed with a `startFrom` index of `2`, the result would be `["c", "d", "e", "a", "b"]`
     * @param array The array to clone and re-index.
     * @param startFrom The current index of the new first item.
     * @returns A new array, re-indexed with the item at the `startFrom` index now first.
     */
    export function reIndex<T>(array: T[], startFrom: number): T[];
    /**
     * A version of `map` which loops a specified number of times and returns the index as the map arg.
     * - Useful when you want to run a `map` x number of times but you don't have a specific array to loop.
     * @param count The number of times to run the mapper.
     * @param mapper A function to call x number of times (x = `count`).
     * @returns The array of newly mapped items.
     */
    export function repeat<TMapped>(count: number, mapper: (index: number) => TMapped): TMapped[];
    /** Utils for working with arrays of arrays - useful when an array has been split into groups but you want to interact with it as if it's still a single array, I.E using a single overall index */
    export namespace NestedArrays {
        /**
         * Get the overall index of an item inside an array of arrays
         *
         * I.E. [[0,1,2], [3,4], [5,6,7]]
         */
        function getOverallIndex<T>(innerIndex: number, outerIndex: number, arrays: {
            items: T[];
        }[]): number;
        /** Get the item inside an array of arrays at an overall index */
        function getAtOverallIndex<T>(index: number, arrays: {
            items: T[];
        }[]): T | undefined;
    }
    export {};
}
