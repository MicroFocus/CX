// Given a list of categories, will return the name of the given categoryId
export default function getCategoryName(categories, categoryId) {
    if (!categories) {
        return null;
    }

    for (let index = 0; index < categories.length; index++) {
        if (categories[index].id === categoryId) {
            return categories[index].name;
        }
    }

    console.error(`Category of id "${categoryId}" does not exist!`);
    return null;
}
