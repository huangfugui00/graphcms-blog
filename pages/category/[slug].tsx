import React ,{useLayoutEffect,useRef, useState}from 'react' 
import Head from 'next/head'
import {getCategoryPost,getCategoriesService} from '../../services'
import { GetStaticPropsContext,InferGetStaticPropsType,GetStaticProps, GetStaticPaths, GetServerSideProps  } from 'next'
import {categoryType, postType} from '../../utils/type'
import PostCard from '../../components/PostCard'
import Categories from '../../components/Categories'


const CategoryPost = ({posts}:InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(posts)
    const [categoryPosts,setCategoryPosts] = useState<postType[]>([])

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

      useLayoutEffect(()=>{
        setCategoryPosts(posts)
      },[posts])

      
    return (
        <div >
            <Head>
                <title>Graphcms blog category</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="my-8">
                <div className="lg:grid lg:grid-cols-12 mt-12 gap-8">
                {/*List  PostCard*/}
                <div className="lg:col-span-8" ref={ref} >
                    {
                    categoryPosts&& categoryPosts.map((post)=>(              
                    <div key={post.title} className="mb-8">
                        <PostCard post={post}/>
                    </div>
                    )      
                    )}
                </div>
                {/* lg:col-start-9 是重点 */}
                <div className=" lg:col-span-4 lg:col-start-9 lg:sticky top-12">
                    <div>
                    <Categories/>
                    </div>
                </div>
                </div>
            </main>
            
        </div>
    )
}

export default CategoryPost


export async function getStaticProps<GetStaticProps>(context:GetStaticPropsContext) {
    if (context.params && context.params.slug && typeof context.params.slug ==='string' ){
        const posts:postType[] = await getCategoryPost(context.params.slug);
        if(!posts){ 
            return {
            notFound:true,
           }}
        return {
            props: { posts },
          };
    }
    return {
        notFound:true,
       }
  
  }
  
  // Specify dynamic routes to pre-render pages based on data.
  // The HTML is generated at build time and will be reused on each request.
  export async function getStaticPaths() {
    const categories:categoryType[] = await getCategoriesService();
    return {
      paths: categories.map(({ slug }) => ({ params: { slug } })),
      fallback: true,
    };
  }
  