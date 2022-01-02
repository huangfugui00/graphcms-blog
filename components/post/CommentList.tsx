import React, { useEffect, useState } from 'react'
import {commentType} from '../../utils/type'
import {getCommentServices} from '../../services'
import moment from 'moment'
import parse from 'html-react-parser';

type CommentListProp={
    slug:string
}

const CommentList = ({slug}:CommentListProp) => {
    const [comments,setComments] = useState<commentType[]>([])

    useEffect(()=>{
        const getComments = async()=>{
            try{
                const result = await getCommentServices(slug)
                setComments(result)
            }
            catch{
                return
            }
        }
        getComments()
    },[slug])

    return (
        <div>
        {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Comments
          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.comment)}</p>
              </div>
            ))}
        </div>   
        )}
        </div>
    )
}

export default CommentList
