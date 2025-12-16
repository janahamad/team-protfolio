const API_URL = import.meta.env.VITE_API_URL;

export async function getMembers() {
  const res = await fetch(`${API_URL}/members`);
  const json = await res.json();
  return json.data;
}

export async function getMemberById(id) {
  const res = await fetch(`${API_URL}/members/${id}`);
  const json = await res.json();
  return json.data;
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`);
  const json = await res.json();
  return json.data;
}
