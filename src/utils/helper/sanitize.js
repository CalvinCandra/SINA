import DOMPurify from "dompurify";

export const sanitizeContent = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "a", "img", "b", "i", "u", "br"], // Sesuaikan
    ALLOWED_ATTR: ["href", "src", "class", "style"], // Sesuaikan
  });
};
