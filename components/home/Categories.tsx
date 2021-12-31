import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import {categoryType} from '../../utils/type'
import { getCategoriesService } from '../../services';
 
const Categories = () => {
    const [categories, setCategories] = useState<categoryType[]>([]);

    useEffect(() => {
        const getCategories = async()=>{
            const result: categoryType[]= await getCategoriesService()
            setCategories(result)
            
        }
        getCategories()
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mt-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
        {categories.map((category, index) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className={`text-gray-500 font-bold text-xl cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
          </Link>
        ))}
      </div>
    )
}

export default Categories
