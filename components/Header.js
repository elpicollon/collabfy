import Link from 'next/link';
import { connect } from 'react-redux';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import HeaderStyle from '../styles/HeaderStyle';

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div>
    <style jsx>{HeaderStyle}</style>
    <div className="header-style">
      <Link href="https://github.com/xxgicoxx/collabfy">
        <a target="_blank">
          <img src="/static/icon128.png" height="30" />
        </a>
      </Link>
      {session.user
        ? <div className="media user-header">
            <div className="media__img">
              <img className="user-image" src={(session.user.images && session.user.images.length && session.user.images[0].url) || '/static/user-icon.png'} width="30" height="30" alt={getNameFromUser(session.user)}/>
            </div>
          </div>
        : <button className="right pure-material-button-contained" onClick={login}>
            Log in with Spotify
          </button>}
      {session.user
        ? <div className="playback-control">
            <button className="pure-material-button-contained" onClick={() => {muted ? unmutePlayback() : mutePlayback();}}>
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        : null}
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback())
});

const mapStateToProps = state => ({
  session: state.session,
  muted: state.playback.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
