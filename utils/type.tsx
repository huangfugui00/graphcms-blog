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
    content:any, 
    excerpt:string,
    author:authorType,
    featuredImage:{
        url:string,
    },
    featuredPost:boolean,
    categorys:categoryType[],
}

export type commentType={
    comment:string,
    name:string,
    email:string,
    createdAt:string,
}