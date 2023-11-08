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
}

export default new TutorialDataService();