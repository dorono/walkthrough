import React from 'react';
import {shallow, mount} from 'enzyme';
import {withRouter, MemoryRouter} from 'react-router-dom';
import * as Api from 'api';
import Spinner from 'components/spinner';
import Amount from 'components/amount';
import Dropdown from 'components/dropdown';
import {AddressPage, buildJsonRPCData} from './index';

const AddressElement = React.createElement(withRouter(<AddressPage />));
const FCT_CONVERSION = 100000000;

// Stub request method
Api.requestJSONRPC = jest.fn();

const mockAssetsBalance = {
    jsonRPC: [
        {
            PEG: 15487841,
        },
    ],
};

const mockBuildJsonRPCData = [
    {
        method: 'get-pegnet-balances',
        params: {
            address: 'FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL',
        },
    },
];

const mockSelectedTransaction = {
    executed: 206428,
    fromaddress: 'FA2mPQpBhr7f9XtXMVhsYQjNzsMGv1sqk2dTZp1NyTBuCaR6BjLM',
    fromamount: 0,
    fromasset: '',
    hash: 'd8bbaff5a1600a8974906957392ce9c8f68f30d9d3d4ad700280a7252792e1ce',
    height: 206428,
    timestamp: '2019-08-19T15:11:00-03:00',
    toamount: 60000000000,
    toasset: 'PEG',
    txaction: 3,
    txid: '0-d8bbaff5a1600a8974906957392ce9c8f68f30d9d3d4ad700280a7252792e1ce',
    txindex: 0,
};

const mockJSONRPC = {
    result: {
        actions: [mockSelectedTransaction],
        count: 0,
        nextoffset: 0,
    },
};

const mockSelectedAsset = {
    alias: 'PEG',
    label: 'PEG - 0.15487841',
    value: '15487841',
};

const mockRouterProps = {
    location: {
        hash: '',
        pathname: '/addresses/FA3pPBWaVjZXhiFiUBdpvyjK84cvjWcZvZqoxeAEsH3rFCtEvEVt',
        search: '?asset=PEG',
    },
    match: {
        params: {
            hash: 'FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL',
        },
    },
};

describe('Address Page', () => {
    beforeEach(() => {
        Api.requestJSONRPC.mockImplementation(() => mockJSONRPC);
    });

    it('should render without errors', () => {
        shallow(AddressElement);
    });

    it('buildJsonRPC should render correct information', () => {
        expect(buildJsonRPCData('FA2HBeH9XGgAkYapAyeD6styij39rhaJDKgCCoqr1M1L3NmUcvjL')).toEqual(mockBuildJsonRPCData);
    });

    it('should render spinner before api call', () => {
        const wrapper = mount(
            <MemoryRouter>
                <AddressPage
                    data={mockAssetsBalance}
                    location={mockRouterProps.location}
                    match={mockRouterProps.match}
                />
            </MemoryRouter>,
        );
        const wrapperAddress = wrapper.find(AddressPage);
        expect(wrapperAddress.find(Spinner)).toHaveLength(1);
    });

    it('should Asset and Balance render with the correct information', async () => {
        const wrapper = mount(
            <MemoryRouter>
                <AddressPage
                    data={mockAssetsBalance}
                    location={mockRouterProps.location}
                    match={mockRouterProps.match}
                />
            </MemoryRouter>,
        );

        const wrapperAddress = wrapper.find(AddressPage);
        const asset = (mockSelectedAsset.value / FCT_CONVERSION).toString();
        expect(
            wrapperAddress
                .find(Amount)
                .find('span')
                .text(),
        ).toEqual(asset);
        expect(
            wrapperAddress
                .find(Dropdown)
                .find('span')
                .text(),
        ).toEqual(mockSelectedAsset.alias);
    });

    it('should address id be equal to address box', async () => {
        const wrapper = mount(
            <MemoryRouter>
                <AddressPage
                    data={mockAssetsBalance}
                    location={mockRouterProps.location}
                    match={mockRouterProps.match}
                />
            </MemoryRouter>,
        );

        const wrapperAddress = wrapper.find(AddressPage);
        expect(
            wrapperAddress
                .findWhere(node => node.props().type === 'address')
                .find('a')
                .text(),
        ).toEqual(mockRouterProps.match.params.hash);
    });

    it('should match snapshot', () => {
        expect(shallow(AddressElement)).toMatchSnapshot();
    });
});
