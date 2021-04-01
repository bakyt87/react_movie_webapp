import React, {UseState} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { withRouter } from 'react-router-dom';



class MovieDetails extends React.Component{

    
    constructor(props){
    super(props);
    this.state={
        movie: {},
        id:"",
        poster:"",
        title:"",
        overview:"",
        releaseDate: Date,
        score:"",
        genres: [],
        adult: Boolean,
        trailers:{},
        loading: true
    }
    // function GetTrailer(){
    //     const history = useHistory();
    // }

}
getTrailer(){
    //https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
    fetch(`https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=af4efc72d1219839b90209a0248fcec1&language=en-US`)
    .then(res=>res.json())
    .then(data=>{
        this.setState({
            trailers: data.results,
            loading:false
        })
        console.log(this.state.trailers)
    })
   
    .catch(err=>console.log(`Error happened when retrieving data:${err}`))
}
   
    componentDidMount(){
        //
        this.getTrailer();

        fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=af4efc72d1219839b90209a0248fcec1&language=en-US`)
        .then(res=>res.json())
        .then(myJson=>{
            this.setState({
                movie:myJson.data,
                title: myJson.original_title,
                overview: myJson.overview,
                poster: myJson.poster_path,
                releaseDate: myJson.release_date,
                score: myJson.vote_average,
                id:myJson.id,
                adult:myJson.adult,
                loading:false
            })
            console.log(this.state.id)
        })
        
        .catch(err=>console.log(`Error happened when retrieving data:${err}`))
    }
   
    
    render(){
        if(this.state.loading){
            return null;
        }
        else{
            const value = 0.0;
            if(this.state.adult == true){
                this.state.adult="18+";
            }else{
                this.state.adult="";
            }
            

        return(
          <div clas="description">
            <div class="jumbotron">
            <div class="movie_poster">
            <img src={`https://image.tmdb.org/t/p/original/${this.state.poster}`} alt="movie poster" width="400" height="550"></img>
            </div>
            <div class="details">
  <h1 class="display-3">{this.state.title}</h1>
  <h2>Overview</h2>
  <p class="lead">{this.state.overview}</p>
  <hr class="my-4"/>
  <p>{this.state.adult}</p>
 
  <hr class="my-4"/>
  <p>Release date: {this.state.releaseDate}</p>
  <div style={{ width: "8%" }}>
                <CircularProgressbar value={this.state.score} maxValue={10} text={`${this.state.score}`}
                styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,
                 
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',

                     // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                     // Rotate the trail
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                 
                    // Text size
                    textSize: '30px',
                 
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 3,
                 
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                 
                    // Colors
                    pathColor: `rgba(103, 245, 51, ${this.state.score})`,
                    textColor: 'black',
                    trailColor: 'white',
                    backgroundColor: 'black',
                  })} />
                  </div>
                
                  <hr class="my-4"/>

  <div class="trailers">
      <h2>Trailers</h2>
      {
          this.state.trailers.map(video=>(
            <iframe width="460" height="315" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          ))
      }
      
      </div> 
      {/* class="btn btn-secondary btn-lg" key={this.state.id} onClick={()=>{this.props.history.push(`/trailers/${this.state.id}`)}}>Watch trailer */}
 
</div>
</div>

                  )
              
            </div>
            
        );
        }
    }
}
export default withRouter(MovieDetails);