
import { api, getConfig } from './Api'

const GetPagedSessions = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Session/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const GetSession = async (id) => {
  const { data } = await api.get(`/Session/GetSession?id=${id}`, getConfig())

  return data;
}

const UpdateSession = async (item) => {
  const { data } = await api.put('/Session/UpdateSession', JSON.stringify(item), getConfig())

  return data;
}

const CreateSession = async (item) => {
  const { data } = await api.post('/Session/CreateSession', JSON.stringify(item), getConfig())

  return data;
}

const DeleteSession = async (id) => {
  const { data } = await api.delete(`/Session/DeleteSession?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedSessions,
  GetSession,
  UpdateSession,
  CreateSession,
  DeleteSession
}