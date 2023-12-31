import { async } from 'regenerator-runtime';
import { TIMEOUT_SECS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    // if we have an invalid id, generate a more informative error message based on the error generated by
    // the api (rather than the default browser error)
    if (!res.ok) throw new Error(`${data.message}, ${res.status}`);

    return data; // resolved value of the promise
  } catch (err) {
    throw err; // to reject the promise and propagate the error
  }
};
/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    // if we have an invalid id, generate a more informative error message based on the error generated by
    // the api (rather than the default browser error)
    if (!res.ok) throw new Error(`${data.message}, ${res.status}`);

    return data; // resolved value of the promise
  } catch (err) {
    throw err; // to reject the promise and propagate the error
  }
};

export const sendJSON = async function (url, upladData) {
  // sends data to the API using the fetch function
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upladData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // resolved value of the promise
  } catch (err) {
    throw err; // to reject the promise and propagate the error
  }
};
*/
