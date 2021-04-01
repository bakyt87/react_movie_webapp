import React, {UseState} from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';



class Upcoming extends React.Component{
    constructor(props){
    super(props);
    this.state={
        results:{},
        currentPage: 1,
        loading: true
    }
    this.previousPage=this.previousPage.bind(this);
    this.NextPage = this.NextPage.bind(this);

}


    
        
    

    getData(page){
        //https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=af4efc72d1219839b90209a0248fcec1&language=en-US&page=${page.currentPage}`)
        .then(res=>res.json())
        .then(myJson=>{
            this.setState({
                results: myJson.results,
                currentPage: myJson.page,
               loading:false
            })
            
        })
       
        .catch(err=>console.log(`Error happened when retrieving data:${err}`))
    }
    
    componentDidMount(){
        this.getData({currentPage: this.state.currentPage});
    }
    previousPage(){
        if(this.state.currentPage > 1){
        this.getData({currentPage:this.state.currentPage -1})
        this.setState({currentPage: this.state.currentPage-1})
        // this.setState({ sales: this.state.sales })
        }
        }

        NextPage(){
            this.getData({currentPage: this.state.currentPage +1})
            this.setState({currentPage: this.state.currentPage+1})
            // this.setState({ sales: this.state.sales })
            
        }
   
    
    render(){
        if(this.state.loading){
            return null;
        }
        else{
           
        return(
           <div class="posters">
               {
             
            this.state.results.map(movie => (
                
            <div class="movie_list" key={movie.id} onClick={()=>{this.props.history.push(`/${movie.id}`)}}>
                
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie poster" width="200" height="350"></img>
            
            </div>
                  ))
              
            } 
            <div class="btn-group" role="group" aria-label="Basic example">
             <Pagination>
             <Pagination.Prev type="button" class="btn btn-secondary" onClick={this.previousPage}/>
            <Pagination.Item  type="button" class="btn btn-secondary">{this.state.currentPage}</Pagination.Item>
            <Pagination.Next type="button" class="btn btn-secondary" onClick={this.NextPage}/>
            </Pagination>
            </div>
            </div>
            
        );
        }
    }
}
export default withRouter(Upcoming);