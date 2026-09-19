export const STORAGE_KEY='builder_project';
export function loadProject(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch{return null}}
export function saveProject(project){localStorage.setItem(STORAGE_KEY,JSON.stringify(project))}
export function makeProject(name,code){return {id:crypto.randomUUID?.()||Date.now().toString(36),name,code,published:false,updatedAt:new Date().toISOString()}}
