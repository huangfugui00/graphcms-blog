import React,{useState,useEffect} from 'react'
import {getFeaturedPostsService} from '../../services'
import {postType} from '../../utils/type'
import FeaturedPostCard  from './FeaturedPostCard'
const FeaturePost = () => {

    const [featuredPosts, setFeaturedPosts] = useState<postType[]>([]);

    useEffect(() => {
        const getFeaturedPosts = async ()=>{
            const result = await getFeaturedPostsService()
            setFeaturedPosts(result)
        }
        getFeaturedPosts()
    }, []);

    if(!featuredPosts){
        return<></>
    }
    return (
        <div className={` gap-4 mt-4 md:mt-8 flex  overflow-scroll scrollbar-hide`}>
        {featuredPosts.map((post)=>
        <FeaturedPostCard post={post} key={post.title}/>
        )}
    </div>
    )
}

export default FeaturePost
