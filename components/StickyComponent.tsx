import React,{useRef,useLayoutEffect} from 'react'


type StickyComponentProp={
    childLeft:React.ReactNode,
    ChildRight:React.ReactNode,
    colLeft?:number,
    colRight?:number,
}
const StickyComponent = ({childLeft,ChildRight,colLeft=8,colRight=4}:StickyComponentProp) => {

    const start = colLeft+1

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

    return (
        <div className="grid lg:grid-cols-12 mt-12 gap-8">
            <div className={`lg:col-span-${colLeft}`} ref={ref} >
               {childLeft}
            </div>
            <div className={`lg:col-span-${colRight} lg:col-start-${start} lg:sticky lg:top-8`}>
                {ChildRight}
            </div>
        </div>
    )
}

export default StickyComponent
