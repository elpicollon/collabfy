import React from 'react';
import { connect } from 'react-redux';
import QueueItem from './QueueItem';
import { queueRemoveTrack } from '../actions/queueActions';
import { voteUp, voteDown } from '../actions/voteActions';
import QueueStyle from '../styles/QueueStyle';

class Queue extends React.PureComponent {
  render() {
    const { items, session } = this.props;
    
    return (
      <div>
        <h2>Queue</h2>
        {items.length === 0
          ? <p>The queue is empty, add a song.</p> : 
            <div>
              <style jsx>{QueueStyle}</style>
              <table className="queue">
                <thead>
                  <tr>
                    <th>Art</th>
                    <th>Position</th>
                    <th>Music</th>
                    <th>Artist</th>
                    <th>User</th>
                    <th>Like</th>
                    <th>Dislike</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i, index) => (<QueueItem item={i} session={session} index={index} key={index} onVoteUp={() => this.props.voteUp(i.id)} onRemoveItem={() => this.props.queueRemoveTrack(i.id)} onVoteDown={() => this.props.voteDown(i.id)}/>))}
                </tbody>
              </table>
            </div>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  voteUp: id => dispatch(voteUp(id)),
  voteDown: id => dispatch(voteDown(id)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id))
});

const mapStateToProps = state => ({
  queue: state.queue
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
