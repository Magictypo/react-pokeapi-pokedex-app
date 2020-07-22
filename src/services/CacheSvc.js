import localForage from 'localforage';

export async function getCache(url) {
  // Respect Public API by caching
  const storage = await localForage.getItem(url);

  // Always check is structure valid.
  // Because storage is permanent and cannot be clear from server.
  // Operator && return last value or undefined
  const expire = storage && storage.expire;
  const data = storage && storage.data;

  if (!expire || expire < Date.now()) {
    await localForage.removeItem(url);
    return null;
  }

  if (!data) {
    await localForage.removeItem(url);
    return null;
  }

  return { data };
}

export function setCache(url, data) {
  // cacheTime default 1 hour
  const timeout = process.env.REACT_APP_POKE_API_EXPIRE_TIMEOUT || 3600000;
  const expire = Number(timeout) + Date.now();
  return localForage.setItem(url, { expire, data });
}
