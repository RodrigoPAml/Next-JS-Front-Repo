
import { api, getConfig } from './Api'

const GetPagedUsers = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/User/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const GetUser = async (id) => {
  const { data } = await api.get(`/User/GetUser?id=${id}`, getConfig())

  return data;
}

const UpdateUser = async (item) => {
  const { data } = await api.put('/User/UpdateUser', JSON.stringify(item), getConfig())

  return data;
}

const CreateUser = async (item) => {
  const { data } = await api.post('/User/CreateUser', JSON.stringify(item), getConfig())

  return data;
}

const DeleteUser = async (id) => {
  const { data } = await api.delete(`/User/DeleteUser?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedUsers,
  GetUser,
  UpdateUser,
  CreateUser,
  DeleteUser
}