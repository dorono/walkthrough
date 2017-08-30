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
    {name: 'dblock', path: '/dblocks/:hash', exact: true, menuItem: 0, component: DirectoryBlock},
    {name: 'ablock', path: '/ablocks/:hash', exact: true, menuItem: 0, component: AdminBlock},
    {name: 'ecblock', path: '/ecblocks/:hash', exact: true, menuItem: 0, component: EntryCreditBlock},
    {name: 'fblock', path: '/fblocks/:hash', exact: true, menuItem: 0, component: FactoidBlock},
    {name: 'eblock', path: '/eblocks/:hash', exact: true, menuItem: 0, component: EntryBlock},
    {name: 'chains', path: '/chains', exact: true, menuItem: 1, component: ChainList},
    {name: 'chain', path: '/chains/:hash', exact: true, menuItem: 1, component: Chain},
    {name: 'entry', path: '/chains/:chain/entries/:hash', exact: true, menuItem: 1, component: Entry},
    {name: 'tx', path: '/transactions/:hash', exact: true, component: Transaction},
    {name: 'address', path: '/addresses/:hash', exact: true, component: Address},
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
