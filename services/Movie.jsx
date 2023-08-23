
import { api, getConfig } from './Api'

const GetPagedMovies = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Movie/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const GetMovie = async (id) => {
  const { data } = await api.get(`/Movie/GetMovie?id=${id}`, getConfig())

  return data;
}

const UpdateMovie = async (item) => {
  const { data } = await api.put('/Movie/UpdateMovie', JSON.stringify(item), getConfig())

  return data;
}

const CreateMovie = async (item) => {
  const { data } = await api.post('/Movie/CreateMovie', JSON.stringify(item), getConfig())

  return data;
}

const DeleteMovie = async (id) => {
  const { data } = await api.delete(`/Movie/DeleteMovie?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedMovies,
  GetMovie,
  UpdateMovie,
  CreateMovie,
  DeleteMovie
}