const base = import.meta.env?.VITE_BASE_API || 'http://localhost:7000/api'
export const staff = `${base}/Staff`
export const Eva = `${base}/Eva`
export const Commit = `${base}/Commit`
export const api = `${base}`