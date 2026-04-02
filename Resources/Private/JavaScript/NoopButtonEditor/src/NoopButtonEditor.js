import React, {PureComponent} from 'react';
import {Button} from '@neos-project/react-ui-components';
import PropTypes from 'prop-types';

export default class NoopButtonEditor extends PureComponent {

    static propTypes = {
        options: PropTypes.object,
    };

    static defaultProps = {
        options: {},
    };

    handleClick = () => {
        const appContainer = document.getElementById('appContainer');
        const csrfToken = appContainer ? appContainer.getAttribute('data-csrf-token') : '';

        fetch('/__hubspot/cache/flush', {
            method: 'POST',
            headers: {
                'X-Flow-Csrftoken': csrfToken,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(() => {
                this.setState({flushed: true});
                setTimeout(() => this.setState({flushed: false}), 2000);
            })
            .catch(() => {});
    };

    render() {
        const label = (this.props.options && this.props.options.label) || 'Button';

        return (
            <Button style="lighter" hoverStyle="brand" onClick={this.handleClick}>
                {label}
            </Button>
        );
    }
}
