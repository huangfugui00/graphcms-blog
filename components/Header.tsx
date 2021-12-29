import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {categoryType} from '../utils/type'
import { getCategoriesService } from '../services';

const Header = () =>{
    const [categories, setCategories] = useState<categoryType[]>([]);

    useEffect(() => {
        const getCategories = async()=>{
            const result = await getCategoriesService()
            if(!result){
                return
            }
            setCategories(result);
        }
    
      getCategories()
    }, []);

    return (
        <div className="my-container  flex justify-between    py-8  border-b border-b-emerald-100 ">
          {/* brand */}
          <div className="">
            <Link href="/">
              <span className="cursor-pointer  font-bold text-4xl text-white">Graph CMS</span>
            </Link>
          </div>
        {/* categories */}
          <div className="hidden md:block ">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.slug}`}>
                  <a className="cursor-pointer ml-4">
                  <span className="  text-white text-lg font-semibold ">{category.name}</span>
                  </a>
              </Link>
            ))}
          </div>
      </div>
    )
}

export default Header
