import React,{useState,useEffect} from 'react'
import { submitComment } from '../../services'
import Loading from '../Loading'
import {ToastAlert,toastAlert} from '../ToastAlert'

type commentFormProp={
    slug:string,
}

const CommentFrom = ({slug}:commentFormProp) => {
    const [loading,setLoading] = useState(false)
    const [content,setContent] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [remember,setRemember] = useState(false)


    useEffect(()=>{
        const namePrev =  window.localStorage.getItem('name');
        const emailPrev =  window.localStorage.getItem('email');
        if(namePrev && emailPrev){
            setEmail(emailPrev)
            setName(namePrev)
        }
    },[])
    

    const handleSummitComment=async()=>{
        try{
            console.log('submit')
            setLoading(true)
            if(remember){
                window.localStorage.setItem('name', name);
                window.localStorage.setItem('email', email);
                //save
            }
            else{
                window.localStorage.removeItem('name');
                window.localStorage.removeItem('email');
            }
    
            // post to server
    
            const commentObj = {
                name,
                email,
                comment:content,
                slug,
              };
            
            const result = await submitComment(commentObj)

            if(!result){
                return 
            }
            setContent('')
            toastAlert('your comment will be display after revising!')
        }
        catch{
            toastAlert('wrong')
        }
        finally{
            setLoading(false)
        }

    }

    return (
        <div className="font-bold bg-white p-4 lg:p-8">
            <h1 className="text-xl font-bold pb-4 border-b border-gray-300-b">Leave a Reply</h1>
            <textarea placeholder="Comment" 
            className="bg-gray-50 mt-8 border font-serif rounded-lg w-full h-40 p-2" 
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            />
             
            <div className="flex align-center justify-between gap-4 mt-4">
                <input className="p-2 bg-gray-50 w-1/2 rounded-md" placeholder="Emial"
                type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input className="p-2 bg-gray-50 w-1/2 rounded-md" placeholder="Name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 />
            </div>
            <div className="flex gap-2 items-center mt-2">
                <input type="checkbox" checked={remember} onChange={()=>setRemember(!remember)}></input>
                <p className="text-gray-400">Save my name, email in this browser for the next time I comment.</p>
            </div>
            {
                !loading?
                <button className="cursor-pointer mt-8 px-8 py-4 bg-red-600 rounded-full"
                onClick={()=>handleSummitComment()}>
                    <span className="text-xl text-white">Post Comment</span>
                </button>:
                // <Loading loading={loading}/>
                <Loading loading={loading} type="balls" color="black" size={40}/>
            }   
            <ToastAlert/>
        </div>
    )
}

export default CommentFrom
