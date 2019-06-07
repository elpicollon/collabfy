import React from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/MyLayout.js';
import { initStore } from '../store/store';
import { fetchQueue } from '../actions/queueActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchPlayingContext } from '../actions/playbackActions';
import Users from '../components/Users';
import Queue from '../components/Queue';
import AddToQueue from '../components/AddToQueue';
import NowPlaying from '../components/NowPlaying';
import QueueStyle from '../styles/QueueStyle';
import UserStyle from '../styles/UserStyle';
import AppStyle from '../styles/AppStyle';
// import Devices from '../components/Devices';

class Main extends React.Component {
  static getInitialProps({ req, store, isServer }) {
    return Promise.all([
      store.dispatch(fetchQueue()),
      store.dispatch(fetchUsers()),
      store.dispatch(fetchPlayingContext())
    ]);
  }
  
  render() {
    return (
      <Layout>
        <title>CollabFy</title>
        
        {this.props.playing.track ? <NowPlaying track={this.props.playing.track} user={this.props.playing.user} position={this.props.playing.position}/> : null}

        <style jsx>{AppStyle}</style>
        <style jsx>{UserStyle}</style>
        <style jsx>{QueueStyle}</style>
        
        <div className="app">
          <div className="queue">
            {this.props.session.user !== null ? <AddToQueue/> : null}
            <Queue items={this.props.queue} session={this.props.session} />
            {/* {this.props.session.user !== null ? <Devices /> : null} */}
          </div>
          <div className="users">
            <Users items={this.props.users} />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session
});

export default withRedux(initStore, mapStateToProps, null)(Main);