// DigiCert
// ===
// Displays Digital Certificate


// Vendor components
// ---
import React from 'react';

import BaseComponent from 'client/common/components/BaseComponent';
import helpers from 'client/common/helpers/helpers';
import { getState } from 'client/common/store';

import digicertImg from 'client/common/images/digicert.jpg';

const abortDigicert = getState('/config/env') !== 'production';

class DigiCert extends BaseComponent {
    shouldComponentUpdate() {
        if (abortDigicert) return false;
    }

    componentDidMount() {
        // Digicert script requires a DOM node destination to exist
        this.runDigiCertCode();
    }

    runDigiCertCode() {
        if (abortDigicert || helpers.window.__dcid) return; // already loaded

        helpers.window.__dcid = [
            ['DigiCertClickID_XGKQnVGQ', '10', 'm', 'black', 'XGKQnVGQ'],
        ];
        const cid = helpers.document.createElement('script');
        cid.async = true;
        cid.src = '//seal.digicert.com/seals/cascade/seal.min.js';

        helpers.document.head.appendChild(cid);
    }

    render() {
        return (
            <div // consumed by Digicert
                id="DigiCertClickID_XGKQnVGQ"
                data-language={helpers.userLanguage}
                className="f-right"
            >
                { abortDigicert && // use placeholder
                    <img
                        width="100px"
                        height="59px"
                        alt="Digicert"
                        src={`${digicertImg}`}
                    />
                }
            </div>
        );
    }
}

export default DigiCert;
