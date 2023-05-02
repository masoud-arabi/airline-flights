interface Props{
  avgg_score: number;
    attributes: {
        name: string;
        image_url: string;
        slug: string;
        avg_score: number;
    }
}

const Header = ({attributes, avgg_score}: Props) => {
  return (
    <div className='card'>
      <div className='airline-name'>{attributes.name}</div>
      <div className='airline-logo'>
        <img src={attributes.image_url} alt={attributes.name}/>
      </div>
      <div className='airline-score'>{avgg_score}</div>
      <div className='airline-link'>
      </div>
    </div>
  )
}

export default Header