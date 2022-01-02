import React from 'react'
import { postType } from '../../utils/type'
import Image from 'next/image'
import moment from 'moment'
type PostDetailProp={
    post:postType
}



const getContentFragment = (index:any, text:any, obj:any, type:any) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

const PostDetail = ({post}:PostDetailProp) => {
    console.log(post)
    return (
        <div className="bg-white p-4 lg:p-8 rounded-lg">
            {/* featuredImage */}
            <div  className="relative h-60 md:h-96 lg:h-80 w-full rounded-lg">
                <Image alt={post.title} src={post.featuredImage.url} layout="fill" objectFit="cover"/>

            </div>
            {/* createAt */}


            <div className="flex  items-center gap-12 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                            <Image className="rounded-full" alt={post.author.name} src={post.author.photo.url} layout="fill" objectFit="cover"/>
                        </div>
                        <span className="text-gray-500">{post.author.name}</span>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                    </div>
                </div>
            
            <h1 className="text-center text-2xl font-serif font-bold mt-4">{post.title }</h1>

            <div className="mt-8">
                {post.content.raw.children.map((typeObj:any,index:number) => {
                const children = typeObj.children.map((item:any, itemindex:number) => getContentFragment(itemindex, item.text, item,item.type));

                return getContentFragment(index, children, typeObj, typeObj.type);
                })}
            </div>
        </div>
    )
}

export default PostDetail
