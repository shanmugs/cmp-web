import actions from './actions';

const branchOptions = {
    rootPath: 'layout',
    branchPath: 'breakpoints',
    actions,
    mapPathsToProps: {
        currentUser: '/users/current',
        layoutConfig: '/config',
    },
};

export default branchOptions;
