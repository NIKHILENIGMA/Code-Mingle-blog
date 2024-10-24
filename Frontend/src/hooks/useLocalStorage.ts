/**
 * @description This hook is used to store data in local storage
 * @param key  The key to store the data in local storage
 * @returns methods setItem, getItem, removeItem which get, set and remove the item from local storage
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
