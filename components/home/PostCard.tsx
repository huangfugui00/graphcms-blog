import React from 'react'
import {postType} from '../../utils/type'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment';

import MyButton from '../MyButton'
type postCardProps = {
    post:postType
}

const PostCard = ({post}:postCardProps) => {
    console.log(post)
    console.log('postcard')
    if(!post){
        return<></>
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 my-8">
            {/* image */}
            <div className="relative h-80 w-full ">
                <Image className="rounded-lg" alt={post.title} src={post.featuredImage.url} layout="fill" objectFit="cover"/>
            </div>

            {/* message */}
            <div className="mt-4">
                <h1 className="text-center mb-8 font-bold text-2xl">{post.title}</h1>
                {/* author  */}
                <div className="flex justify-center items-center gap-12 mb-8">
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
                {/* excerpt */}
                <p className="font-serif text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
                    {post.excerpt}
                </p>

                <div className="text-center">
                    <Link href={`/post/${post.slug}`}>
                        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
                    </Link>
                </div>
            </div>

            {/* author */}
            <div>

            </div>
        </div>
    )
}

export default PostCard
