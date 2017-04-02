import Relay from 'react-relay';

export const withRelay = spec => Component => Relay.createContainer(Component, spec);

export default Relay;
