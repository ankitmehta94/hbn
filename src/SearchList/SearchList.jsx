import React, {Fragment} from 'react';





class SearchTupple extends React.Component {
    handleOnClick = () => {
        const { datum, startPlay } = this.props;
        startPlay(datum.id.videoId);
    }
    render(){
        const { datum, index } = this.props;
        return (<li key={`key-${index}`} onClick={this.handleOnClick}>
        <img src={datum.snippet.thumbnails.medium.url} />
        <p>{datum.snippet.title}</p>
    </li>);
    }
}


export default class SearchList extends React.Component {
    render(){
        const { data = [], startPlay} = this.props;
        return (
            <ul>
            {data.map((datum, index) => {
                return <SearchTupple datum={datum} index={index} startPlay={startPlay}  />
            })}
            </ul>
        )
    }
}

