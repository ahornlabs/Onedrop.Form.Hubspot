import manifest from '@neos-project/neos-ui-extensibility';

import CacheFlushButtonEditor from './CacheFlushButtonEditor';

manifest('Onedrop.Form.Hubspot:CacheFlushButtonEditor', {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');

    editorsRegistry.set('Onedrop.Form.Hubspot/Inspector/Editors/CacheFlushButtonEditor', {
        component: CacheFlushButtonEditor,
    });
});
