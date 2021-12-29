export type authorType = {
    name:string,
    photo:{
        url:string,
    },
    bio:string,
}

export type categoryType = {
    name:string,
    slug:string,
}


export type postType = {
    title:string,
    createdAt:string,
    slug:string,
    content:string, 
    excerpt:string,
    author:authorType,
    featuredImage:{
        url:string,
    },
    featuredPost:boolean,
}