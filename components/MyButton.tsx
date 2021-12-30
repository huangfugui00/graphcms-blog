import React from 'react'
import styles from './myButton.module.css'




type Props = {
    className?: string,
    onClick?:()=>void,
  };

const MyButton: React.FC<Props> = ({className,onClick,children}) => {
    return (
        <div>
            <button onClick={onClick} className={`${styles.button} ${className} `}>
                {children}
            </button>
        </div>
    )
}

export default MyButton
