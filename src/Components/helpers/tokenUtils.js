import SecureLS from 'secure-ls';

const ls = new SecureLS();

export const getToken = (key) => {
    /**
     * This function passes a token to whatever is calling it, so it can be used for API calls. 
     */
  try {
    const token = ls.get(key);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  } catch (err) {
    console.log('Error getting token:', err);
    return null;
  }
};

export const setToken = (key, token) => {
    /**
     * This function will create key in local storage and set its value to token.
     */
  try {
    ls.set(key, JSON.stringify(token));
  } catch (err) {
    console.log('Error setting token:', err);
  }
};

export const deleteToken = (key) => {
    /**
     * This function will remove whatever key contains inside of local storage.
     */
  try {
    ls.remove(key);
  } catch (err) {
    console.log('Error removing token:', err);
  }
};
