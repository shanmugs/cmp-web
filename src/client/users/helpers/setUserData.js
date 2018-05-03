/**
 *  Function for creating attributes for groups, campaigns, company and charity in the Header module
 */

const setDataToPayload = (attributes, type) => {
    const {
        avatar,
        balance,
        createdAt,
        name,
        slug,
    } = attributes;
    const data = {
        avatar,
        balance: (balance) ? `$${balance}` : null,
        created_at: createdAt,
        name,
    };
    if (type === 'groups' || type === 'campaigns') {
        data.link = `/${type}/${slug}`;
    } else {
        data.slug = slug;
    }
    return data;
};

export default setDataToPayload;
