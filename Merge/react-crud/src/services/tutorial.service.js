import http from "../http-common";


class TutorialDataService {
  getAll() {
    return http.get("/noveny");
  }

  get(id) {
    return http.get(`/noveny/${id}`);
  }

  create(data) {
    return http.post("/noveny", data);
  }

  update(id, data) {
    return http.put(`/noveny/${id}`, data);
  }

  delete(id) {
    return http.delete(`/noveny/${id}`);
  }

  deleteAll() {
    return http.delete(`/noveny`);
  }

  findByTitle(title) {
    return http.get(`/noveny?title=${title}`);
  }

  findByDescription(description) {
    return http.get(`/noveny?description=${description}`);
  }

  getAllABC() {
    return http.get(`/noveny/titleASC`);
  }

  searchTitle(title, sortype, ordertype) {
    return http.get(`/noveny/searchTitle/${title}/${sortype}/${ordertype}`);
  }
  
  searchDescription(description, sortype, ordertype) {
    console.log(ordertype)
    return http.get(`/noveny/searchDescription/${description}/${sortype}/${ordertype}`);
  }
  
  
}

export default new TutorialDataService();