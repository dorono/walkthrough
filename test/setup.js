import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiSubset from 'chai-subset';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import chaiAsPromised from 'chai-as-promised';
import {jsdom} from 'jsdom';

chai.should();
chai.use(chaiEnzyme());
chai.use(chaiSubset);
chai.use(sinonChai);
chai.use(dirtyChai);
chai.use(chaiAsPromised);

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};
Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});
