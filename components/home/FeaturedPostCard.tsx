import React from 'react'
import {postType} from '../../utils/type'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment';


type featuredPostCardType={
    post : postType
}

const FeaturedPostCard = ({post}:featuredPostCardType) => {
    return (
    <div className='relative cursor-pointer'>
        <Link href={`/post/${post.slug}`}>
            <a>
            <div className="relative transform hover:-translate-y-1 hover:scale-110 transition duration-1000 ease-in-out  opacity-80  h-60 w-96 sm:h-48 sm:w-48 md:w-60 md:h-60 lg:h-72 lg:w-72" >
                <Image className="rounded-lg" src={post.featuredImage.url} layout='fill'  objectFit="cover" />
            </div>

            {/* message */}
            <div className="absolute top-1/4 w-full">
                <p className="text-white mb-4 text-shadow font-semibold text-md sm:text-xs text-center ">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <p className="text-white mb-4 text-shadow font-semibold text-2xl sm:text-sm lg:text-lg xl:text-xl text-center">{post.title}</p>            
            </div>
            

            {/* author */}
            <div className="absolute bottom-0  pb-4 flex items-center gap-4 left-1/4">
                <div className="relative w-12 h-12">
                    <Image className="rounded-full" src={post.author.photo.url} layout='fill'/>
                </div>
                <span className="text-white font-bold text-lg sm:text-sm lg:text-lg">{post.author.name}</span>
            </div>
            </a>
        </Link>
    </div>
    )
}

export default FeaturedPostCard
