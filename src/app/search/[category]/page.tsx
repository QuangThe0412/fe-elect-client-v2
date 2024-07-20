import React from 'react'

const CategoryPage = ({
    params,
    searchParams
}: {
    params: { collection: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    // console.log({ params, searchParams })
    return (
        <div>CategoryPage</div>
    )
}

export default CategoryPage