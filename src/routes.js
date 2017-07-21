import DirectoryBlockList from 'pages/directory-block-list';
import DirectoryBlock from 'pages/directory-block';
import AdminBlock from 'pages/admin-block';
import EntryCreditBlock from 'pages/entry-credit-block';
import FactoidBlock from 'pages/factoid-block';
import EntryBlock from 'pages/entry-block';
import Entry from 'pages/entry';
import ChainList from 'pages/chain-list';
import Chain from 'pages/chain';
import Transaction from 'pages/transaction';
import Address from 'pages/address';

export const routes = [
    {name: 'dblocks', path: '/', exact: true, menuItem: 0, component: DirectoryBlockList},
    {name: 'dblock', path: '/dblock/:hash', exact: true, menuItem: 0, component: DirectoryBlock},
    {name: 'ablock', path: '/ablock/:hash', exact: true, menuItem: 0, component: AdminBlock},
    {name: 'ecblock', path: '/ecblock/:hash', exact: true, menuItem: 0, component: EntryCreditBlock},
    {name: 'fblock', path: '/fblock/:hash', exact: true, menuItem: 0, component: FactoidBlock},
    {name: 'eblock', path: '/eblock/:hash', exact: true, menuItem: 0, component: EntryBlock},
    {name: 'entry', path: '/entry/:hash', exact: true, menuItem: 0, component: Entry},
    {name: 'chains', path: '/chains', exact: true, menuItem: 1, component: ChainList},
    {name: 'chain', path: '/chain/:hash', exact: true, menuItem: 1, component: Chain},
    {name: 'tx', path: '/tx/:hash', exact: true, component: Transaction},
    {name: 'address', path: '/address/:hash', exact: true, component: Address},
];

export const reverse = (name, params) => {
    const route = routes.find(route => route.name === name);
    if (!route) throw new Error(`Invalid route name: ${name}`);
    let url = route.path;
    Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
    });
    return url;
};

export const getMenuItem = path => {
    const route = routes.find(route => {
        if (route.path === '/') return route.path === path;
        const prefix = route.path.replace(':hash', '');
        return path.startsWith(prefix);
    });
    return route && route.menuItem;
};
