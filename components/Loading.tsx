import React from 'react'
import ReactLoading from 'react-loading';


type loadingProp={
    loading:boolean,
    size?:number
    color?:string,
    type?: "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes"
}
const Loading = ({loading,size,color,type}:loadingProp) => {
    return (
        <div>
             {loading?<div className="flex justify-center">
                            <ReactLoading type={type?type:"spin"} color={color?color:"red"} height={size?size:30} width={size?size:30} />
                        </div>
                        :<></>}
        </div>
    )
}

export default Loading
