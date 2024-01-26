<div className='container'>
        <div className='row d-flex justify-content-center align-items-center flex-column'>
            <div className='col-1'>გამარჯობა {localStorage.getItem("userInfo")}</div>
            <button type='button ' className='btn btn-primary col-1' onClick={logOut}>logout</button>
        </div>
    </div>











{news.map((news,index) => {
    return (
      index < 2 ? <div className='line' key={news.title}> 
      <div className='div-line'></div>
      <div className="news-list">
        <p className="bg-text-slider">{news.title[0].toUpperCase()}</p>
        <div className="news-content-title text-slider-title">
         {news.title.toUpperCase()}
        </div>
        <p className="news-content-Autor mt-5 mb-5 text-center autor-slider">
          By dimitri kvarelashvili / 5 comments
        </p>
       
        <div className='d-flex justify-content-center'>
          <button type='button' className='readon-btn me-3 typology-pagination btn-whte'>READ ON</button>
          <button type='button' className='readon-btn button-invert  typology-pagination btn-blue'><HiOutlineBookmark className='icon' />READ LATER</button>
        
        </div>
      </div>
      </div> :""
      
    );
  })}