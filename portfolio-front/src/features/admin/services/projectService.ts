import axios from "axios";

const API_URL =
  "https://localhost:7061/api";

export const projectService = {
  createProject: async (
    token: string,
    data: unknown
  ) => {
    return axios.post(
      `${API_URL}/projects`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getAdminProjects: async (
    token: string
  ) => {
    return axios.get(
      `${API_URL}/admin/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getProjectById: async (
    id: string,
    token: string
  ) => {
    return axios.get(
      `${API_URL}/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  updateProject: async (
    id: string,
    token: string,
    data: unknown
  ) => {
    return axios.put(
      `${API_URL}/projects/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  deleteProject: async (
    id: string,
    token: string
  ) => {
    return axios.delete(
      `${API_URL}/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  togglePublish: async (
    id: string,
    token: string,
    value: boolean
  ) => {
    return axios.patch(
      `${API_URL}/projects/${id}/publish`,
      {
        value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  toggleFeatured: async (
    id: string,
    token: string,
    value: boolean
  ) => {
    return axios.patch(
      `${API_URL}/projects/${id}/featured`,
      {
        value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  uploadProjectFile: async (
    token: string,
    file: File
  ) => {
    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    return axios.post(
      `${API_URL}/uploads/projects`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};