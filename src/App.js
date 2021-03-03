import './App.css';
import { Component } from 'react';

class App extends Component {

  state = {
    item: [],
    _page: 0,
    loading: false
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${this.state._page}&_limit=`
    await fetch(url)
      .then(response => response.json())
      .then((response) => {
        this.setState( {
          item: [...this.state.item, ...response]
        })
        this.setState({ loading: false })
      }).catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.fetchData();
  }

  onScroll = () => {
    
    if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight == document.documentElement.offsetHeight) {
      this.loadMore();
    }
  }

  loadMore = async () => {
    this.setState(prevState => ({
      _start: prevState._page + 1
    }), this.fetchData)
  }

  render() {

    const { item } = this.state;
    return (
      <div id="header">
        <div>
          {item && item.map(photo => (
            <div>
              <img style={{ marginBottom: "20px", marginTop: "20px" }} src={photo.url} />
            </div>
          ))}
        </div>
        {this.state.loading && (
          <p style={{ margin: "auto", display: "block", fontSize: "50px", textAlign: "center" }}>Loading</p>
        )}
      </div>
    );
  }
}

export default App;
