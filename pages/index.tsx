import Head from 'next/head'
import {useRef,useLayoutEffect} from 'react'
import { InferGetStaticPropsType } from 'next'
import FeaturePost from '../components/home/FeaturePost'
import Categories from '../components/home/Categories'
import PostCard from '../components/home/PostCard'
import PostWidget from '../components/PostWidget'
import StickyComponent from '../components/StickyComponent'
import { getPosts,getRecentPosts } from '../services'
import {postType} from '../utils/type'

export async function getStaticProps(){

  const posts:postType[] = await getPosts()
  const recentPosts: postType[] = await getRecentPosts()
  console.log(recentPosts)
  return {
    props:{
      posts:posts ? posts:[],
      recentPosts:recentPosts ? recentPosts:[]
    }
  }
}

export default function Home({posts,recentPosts}:InferGetStaticPropsType<typeof getStaticProps>) {
  // const ref = useRef<HTMLDivElement>(null) 
  // const scrollHandler = () => {
  //   if(ref&&ref.current){
  //       if(ref.current.getBoundingClientRect().top<0){
  //           ref.current.classList.add('order-last')
  //       }
  //       else{
  //           ref.current.classList.remove('order-last')
  //       }
  //   }
  
  // };
  // useLayoutEffect(() => {
  //     window.addEventListener("scroll", scrollHandler, true);
  //     return () => {
  //       window.removeEventListener("scroll", scrollHandler, true);
  //     };
  //   }, []);

  return (
    <div>
      <Head>
        <title>Graphcms blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header  */}
      <main className="my-8">
        {/* FeaturePost */}
        <div>
          <FeaturePost/>
          
        </div>

        <StickyComponent 
         childLeft= {
             posts&& posts.map((post,index)=>(              
              <div key={post.title} className="mb-8">
                <PostCard post={post}/>
              </div>
             )      
            )
            }
          ChildRight={<div>
             <PostWidget posts={recentPosts} title='Recent Post' />
             <Categories/>
          </div>}
          colLeft={8}
          colRight={4}

          />
         

      </main>

     
    </div>
  )
}

