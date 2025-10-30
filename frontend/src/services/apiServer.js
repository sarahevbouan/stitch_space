const base_URL = import.meta.env.VITE_API_URL;

export const fetchData = async (url) => {
  const response = await fetch(base_URL + url, {
    credentials: "include",
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: "Could not fetch the data" };
  }
  if (!response.ok) {
    throw new Error(data.message);
  }
  // const data = response.json();
  return data;
};

export const sendData = async (url, postBody) => {
  const options = {
    method: "POST",
    credentials: "include",
    body: postBody instanceof FormData ? postBody : JSON.stringify(postBody),
  };
  if (!(postBody instanceof FormData)) {
    options.headers = { "Content-Type": "application/json" };
  }
  const response = await fetch(base_URL + url, options);
  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: "Inavlid server response" };
  }
  if (!response.ok) {
    throw new Error(data.message);
  }
  // const data = response.json();
  return data;
};

export const deleteData = async (url) => {
  const response = await fetch(base_URL + url, {
    method: "DELETE",
    credentials: "include",
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: "Could not delete the data" };
  }
  if (!response.ok) {
    throw new Error(data.message);
  }
  // const data = response.json();
  return data;
};
