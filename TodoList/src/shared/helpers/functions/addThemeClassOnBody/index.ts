export const addThemeOnBody = (theme: string) => {
  const b = document.body;
  b.classList.add("app");
  b.classList.remove("dark");
  b.classList.remove("light");
  b.classList.remove("orange");
  b.classList.add(theme);
};
