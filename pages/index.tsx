import Head from 'next/head'
import FeaturePost from '../components/home/FeaturePost'
import Categories from '../components/home/Categories'
import PostCard from '../components/home/PostCard'
import PostWidget from '../components/PostWidget'


export default function Home() {
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

        <div className="grid lg:grid-cols-12">
          {/*List  PostCard*/}
          <div className="lg:col-span-8">
            <PostCard/>
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
