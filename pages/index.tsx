import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import FeaturePost from '../components/home/FeaturePost'
import Categories from '../components/home/Categories'
import PostCard from '../components/home/PostCard'
import PostWidget from '../components/PostWidget'
import { getPosts } from '../services'
import {postType} from '../utils/type'

export async function getStaticProps(){

  const posts:postType[] = await getPosts()

  return {
    props:{
      posts:posts ? posts:[]
    }
  }
}

export default function Home({posts}:InferGetStaticPropsType<typeof getStaticProps>) {

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

        <div className="grid lg:grid-cols-12 mt-12">
          {/*List  PostCard*/}
          <div className="lg:col-span-8">
            {
             posts&& posts.map((post,index)=>(              
              <div key={post.title}>
                <PostCard post={post}/>
              </div>
             )      
            )
            }
          </div>
          <div className="lg:col-span-4 lg:sticky top-8">
            {/* PostWidget */}

            <div>
              <PostWidget/>

            </div>

            {/* categories */}
            <div>
              <Categories/>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  )
}


