import manifest from '@neos-project/neos-ui-extensibility';

import NoopButtonEditor from './NoopButtonEditor';

manifest('Onedrop.Form.Hubspot:NoopButtonEditor', {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');

    editorsRegistry.set('Onedrop.Form.Hubspot/Inspector/Editors/NoopButtonEditor', {
        component: NoopButtonEditor,
    });
});
