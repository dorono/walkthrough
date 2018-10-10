import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

// Global variables. In dev and build process, these are defined by webpack.
window.CONFIG = {
    gatewayUrls: {
        publicNet: '',
        sharedSandbox: '',
    },
};

// In Node v7+ unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    process.on('unhandledRejection', reason => {
        throw reason;
    });
    process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
