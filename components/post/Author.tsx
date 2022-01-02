import React from 'react'
import { authorType } from '../../utils/type'
import Image from 'next/image'
type authorProp ={
    author:authorType
}

const Author = ({author}:authorProp) => {
    return (
        <div className=" mt-20 p-12  rounded-lg bg-black bg-opacity-20 relative">
            <div className="w-full flex justify-center">
                <div className="absolute w-28 h-28 -top-14 ">
                    <Image
                        alt={author.name}
                        className=" rounded-full"
                        src={author.photo.url}
                        layout="fill"
                    />
                </div>
            </div>
            <h3 className=" text-center text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
            <p className="text-center text-white text-sm">{author.bio}</p>
      </div>
    )
}

export default Author
