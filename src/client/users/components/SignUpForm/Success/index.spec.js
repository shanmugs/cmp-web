import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import Success from './index';
import Alert from 'client/common/components/Alert';

describe('SignUpForm/Success', function() {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Success, {
            withIntl: true,
        })(props, rendererType);
    };

    it('does not render activation link by default', function() {
        const hasAlert = getComponent()
            .find(Alert)
            .exists();

        expect(hasAlert).to.be.false;
    });

    it('renders the instant activation Alert with a link to activationUri when passed', function() {
        const hasAlert = getComponent({ activationUri: '/someURL/123451235' })
            .find(Alert)
            .exists();

        expect(hasAlert).to.be.true;
    });
});
