import React from 'react'

interface Props{
    currentPage: number;
    totalPage: number;
    handleNextPage: (page: number)=>void;
    handlePrevPage: (page: number)=>void;
    handleLastPage: (page:number)=>void;
    handleFirstPage: (page:number)=>void;
}

const Pagination = ({handleFirstPage, handleLastPage, currentPage, totalPage, handleNextPage, handlePrevPage}: Props) => {
  return (
    <div>
        <button 
        className='pagination-button'
        onClick={()=>handleFirstPage(1)}
        disabled={currentPage === 1}
        >first page</button>

        <button 
        className='pagination-button'
        onClick={()=>handlePrevPage(currentPage)}
        disabled={currentPage === 1}
        >previous page</button>

        <span>
            Page{currentPage} of  {totalPage}
        </span>

        <button 
        className='pagination-button'
        onClick={()=>handleNextPage(currentPage)}
        disabled={currentPage === totalPage}
        >next page</button>

        <button 
        className='pagination-button'
        onClick={()=>handleLastPage(totalPage)}
        disabled={currentPage === totalPage}
        >last page</button>
    </div>
  )
}

export default Pagination