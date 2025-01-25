
/**
 * The function `useLocalStorage` provides methods to set, get, and remove items from the local storage
 * using a specified key.
 * @param {string} key - The `key` parameter in the `useLocalStorage` function is a string that
 * represents the key under which the value will be stored in the local storage.
 * @returns The `useLocalStorage` function returns an object with three methods: `setItem`, `getItem`,
 * and `removeItem`. These methods allow you to interact with the local storage by setting, getting,
 * and removing items using the specified key.
 */

export default function useLocalStorage<T>(key: string) {
  const setItem = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : `No value found for ${key}`;
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
}
