import React from 'react'
import {postType} from '../utils/type'
import Image from 'next/image'
import moment from 'moment';
import Link from 'next/link'
type PostWidgetProp={
    posts:postType[],
    title:string,
}

const PostWidget = ({posts,title}:PostWidgetProp) => {
    if(!posts){
        return<></>
    }
    return (
        <div className="bg-white p-8 rounded-lg">
            <h1 className="font-semibold text-xl pb-4 border-b">{title}</h1>
            {/* post list */}
            <div>
                {posts.map((post)=>
                <div key={post.title} className="mt-6  flex items-center gap-2">
                    <div className="absolute h-16 w-16">
                        <Image className="rounded-full w-full " alt={post.title} src={post.featuredImage.url} layout="fill" objectFit='cover'/>
                    </div>
                    <div className="pl-20 ">
                        <span className="text-gray-800 font-serif">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                        <Link href={`/post/${post.slug}`}>
                        <a>
                        <p className="text-gray-500 cursor-pointer line-clamp-2">{post.title}</p>
                        </a>
                        </Link>
                    </div>

                </div>
                )}
            </div>
        </div> 
    )
}

export default PostWidget
