import React from 'react';
import { connect } from 'react-redux';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';

class Devices extends React.PureComponent {
  render() {
    const {devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice} = this.props;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <h2>Devices</h2>
        <button className="btn btn--dark" disabled={isFetching} onClick={() => {fetchAvailableDevices()}}>
          Fetch devices
        </button>
        {devices.length === 0 ? <p>The list of devices is empty,</p> : 
            <table>
              <tbody>
                {devices.map(device => (
                  <tr>
                    <td>
                      {device.is_active ? <strong>Active -&gt;</strong> : <button onClick={() => {transferPlaybackToDevice(device.id)}}>Transfer</button>}
                    </td>
                    <td>
                      {device.name}
                    </td>
                    <td>
                      {device.type}
                    </td>
                    <td>
                      {device.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId => dispatch(transferPlaybackToDevice(deviceId))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
