export const fileToURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(r.error);
    r.onload = () => resolve(r.result as string);
    r.readAsDataURL(file);
  });
};

export const fileToBase64 = async (file: File): Promise<string> => {
  const dataUrl = await fileToURL(file);

  return dataUrl.split(",")[1];
};
