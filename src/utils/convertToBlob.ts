export const convertToBlob = (dataURL: string) => {
  const base64String = dataURL.split(",")[1]; // Split the Data URL to get the base64 part
  const binaryData = atob(base64String);
  const blob = new Blob(
    [new Uint8Array([...binaryData].map((char) => char.charCodeAt(0)))],
    { type: "application/octet-stream" }
  );
  return blob;
};
