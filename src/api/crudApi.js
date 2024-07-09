const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook-id";

export const addRecord = async (record) => {
  const response = await fetch(ZAPIER_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return await response.json();
};

export const updateRecord = async (record) => {
  const response = await fetch(ZAPIER_WEBHOOK_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  if (!response.ok) {
    throw new Error("Failed to update record");
  }
  return await response.json();
};

export const deleteRecord = async (id) => {
  const response = await fetch(ZAPIER_WEBHOOK_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete record");
  }
  return await response.json();
};