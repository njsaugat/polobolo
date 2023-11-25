export function formatDateStringToBirthday(dateString: string) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions
  );
  return formattedDate;
}
