import {isEdge, isIE} from './user-agent';

const ieUserAgent = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; ' +
    'IEMobile/9.0)';
const edgeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931';
const chromeUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/51.0.2704.103 Safari/537.36';
const mozillaUserAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) ' +
    'Gecko/20100101 Firefox/47.0';

describe('user-agent.isEdge', () => {
    it('should reutn true when UA is edge', () => {
        expect(isEdge(edgeUserAgent)).toBe(true);
    });

    it('should return false when UA is IE', () => {
        expect(isEdge(ieUserAgent)).toBe(false);
    });

    it('should return false when UA is Chrome', () => {
        expect(isEdge(chromeUserAgent)).toBe(false);
    });

    it('should return false when UA is Mozilla', () => {
        expect(isEdge(mozillaUserAgent)).toBe(false);
    });

    it('should return false when UA is not defined', () => {
        expect(isEdge()).toBe(false);
    });
});

describe('user-agent.isIE', () => {
    it('should reutn true when UA is IE', () => {
        expect(isIE(ieUserAgent)).toBe(true);
    });

    it('should return false when UA is Edge', () => {
        expect(isIE(edgeUserAgent)).toBe(false);
    });

    it('should return false when UA is Chrome', () => {
        expect(isIE(chromeUserAgent)).toBe(false);
    });

    it('should return false when UA is Mozilla', () => {
        expect(isIE(mozillaUserAgent)).toBe(false);
    });

    it('should return false when UA is not defined', () => {
        expect(isIE()).toBe(false);
    });
});
