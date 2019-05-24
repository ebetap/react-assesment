import React, { Component } from 'react';
import Button from './components/button';
import CardList from './components/card-list';
import Axios from 'axios';
import { API_ENDPOINT } from './config/api';
import './App.css';

class App extends Component {
  state = {
    postList: []
  }

  componentWillMount() {
    this.getUserPost();
  }

  getUserPost = () => {
    Axios.get(`${API_ENDPOINT}/posts`)
    .then( async ({ data }) => {
      let uniquePost = this.getUniquePost(data, 'userId');
      let completeData = uniquePost.map(async post => ({
        ...post,
        details: await this.getPostDetails(post.userId)
      }))
      console.log(completeData);
    }).catch(err => {
      if(err) throw err;
      alert('Done');
    })
  }

  getPostDetails = async (userId) => {
    const result = await Axios.get(`${API_ENDPOINT}/users/${userId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      if(err) throw err;
      alert('Done');
    })
    return result;
  }

  getUniquePost = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }

  render() {
    const { postList } = this.state;
    console.log(postList);
    return (
      <div className="App">
        <div className="container">
          <div className="buttonWrapper">
            <Button text={'Home'}/>
          </div>
  
          <div className="listContainer">
            <CardList data={postList}/>
          </div>
        </div>
      </div>
    )
  }  
}

export default App;
