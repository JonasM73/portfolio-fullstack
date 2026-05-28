export type ProjectFile = {
  url: string;
  fileName: string;
  fileType: string;
  size: number;
};

const API_URL = "https://localhost:7061";

export async function uploadProjectFile(file: File): Promise<ProjectFile> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/uploads/projects`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'upload du fichier.");
  }

  return response.json();
}

export async function uploadProjectFiles(files: File[]): Promise<ProjectFile[]> {
  const uploadedFiles = await Promise.all(
    files.map((file) => uploadProjectFile(file))
  );

  return uploadedFiles;
}