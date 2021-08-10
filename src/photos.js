const Photos = ({
  urls: { regular,
     },
    alt_description,
     likes,
    user: {
      name,
      portfolio_url,
    profile_image: { medium },
  },
}) =>{
	return (
		<section className='photo'>
		<img src = {regular} alt ={name}/>
		<div className='photo-info'>
		<div>
			<h4> {name} </h4>
			<p>{alt_description} </p>
			<p> likes:{likes} </p>
		</div>
		<a href ={portfolio_url}>
        <img src ={medium} alt ={name} className='user-img'/>
        </a>
		</div>
		</section>

		)
}
export default Photos;