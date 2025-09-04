export const slugConverter = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") 
    .trim()
    .replace(/\s+/g, "-");
