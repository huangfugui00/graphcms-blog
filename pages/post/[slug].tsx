import React, { useEffect, useRef, useState ,useLayoutEffect} from 'react'
import { getPostDetails, getPosts,getSimilarPosts } from '../../services'
import { postType } from '../../utils/type'
import { GetStaticPropsContext,InferGetStaticPropsType,GetStaticProps, GetStaticPaths, GetServerSideProps  } from 'next'
import PostDetail from '../../components/post/PostDetail'
import Author from '../../components/post/Author'
import CommemtForm from '../../components/post/CommentFrom'
import Categories from '../../components/Categories'
import PostWidget from '../../components/PostWidget'
import CommentList from '../../components/post/CommentList'
 
const PostDetails = ({post,posts}:InferGetStaticPropsType<typeof getStaticProps>) => {
    const [postDetail,setPostDetail] = useState<postType>()
    const [similarPosts,setSimilarPosts] = useState<postType[]>()
    
    useEffect(()=>{
        setPostDetail(post)
        setSimilarPosts(posts)

    },[post,posts])



    const ref = useRef<HTMLDivElement>(null) 
    const scrollHandler = () => {
      if(ref&&ref.current){
          if(ref.current.getBoundingClientRect().top<0){
              ref.current.classList.add('order-last')
          }
          else{
              ref.current.classList.remove('order-last')
          }
      }
    
    };
    useLayoutEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
          window.removeEventListener("scroll", scrollHandler, true);
        };
      }, []);

    if(!postDetail || !similarPosts){
        return<></>
    }

    return (
        <div className="my-container  mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
            {/* left side  */}
            <div className="lg:col-span-8" ref={ref}>
                {/* PostDetail  */}
                <div>
                    <PostDetail post={postDetail}/>
                </div>

                {/* author */}
                <div>
                    <Author author={postDetail.author}/>
                </div>

                {/* comment form */}
                <div className="mt-8">
                    <CommemtForm slug={postDetail.slug}/>
                </div>

                {/* comment list/ */}
                <div className="mt-8">
                    <CommentList slug={postDetail.slug}/>
                </div>

            </div>

            {/* right side */}
            <div  className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-12">
                <div>
                    <PostWidget posts={similarPosts} title='Similar Post' />
                </div>

                {/* categories */}
                <div className="mt-8">
                    <Categories/>
                </div>

            </div>
           
            
        </div>
    )
}

export default PostDetails



export async function getStaticPaths(){
    
    const posts:postType[]  = await getPosts()
    return {
        paths:posts.map(({slug})=>({params:{slug}})),
        fallback:true,
    }
}

export async function getStaticProps<GetStaticProps>(context:GetStaticPropsContext){
    if (context.params && context.params.slug && typeof context.params.slug ==='string' ){
        const post:postType = await getPostDetails(context.params.slug);
        const posts:postType[] = await getSimilarPosts(post.categorys.map(({slug})=>slug),post.slug)
        if(!post){ 
            return {
            notFound:true,
           }}
        return {
            props: { post ,posts},
          };
    }
    return {
        notFound:true,
       }

}