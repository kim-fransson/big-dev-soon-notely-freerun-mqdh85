export const mapCategoryToColor = (
  categoryType: CategoryType,
): CategoryColorMap[CategoryType] => {
  switch (categoryType) {
    case "personal":
      return "orange";
    case "home":
      return "green";
    case "business":
      return "purple";
    default:
      return "orange"; // Default to orange if the category type is not recognized
  }
};
