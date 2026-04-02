import React, {PureComponent} from 'react';
import {Button} from '@neos-project/react-ui-components';
import PropTypes from 'prop-types';

export default class CacheFlushButtonEditor extends PureComponent {

    static propTypes = {
        options: PropTypes.object,
    };

    static defaultProps = {
        options: {},
    };

    state = {
        message: null,
        isError: false,
    };

    handleClick = () => {
        const appContainer = document.getElementById('appContainer');
        const csrfToken = appContainer ? appContainer.getAttribute('data-csrf-token') : '';

        fetch('/neos/__hubspot/cache/flush', {
            method: 'POST',
            headers: {
                'X-Flow-Csrftoken': csrfToken,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(
                        data => { throw new Error(data.message || res.statusText); },
                        () => { throw new Error(res.statusText); }
                    );
                }
                return res.json();
            })
            .then(() => {
                this.setState({message: 'Liste erfolgreich erneuert', isError: false});
                setTimeout(() => this.setState({message: null}), 4000);
            })
            .catch(err => {
                this.setState({message: err.message || 'Fehler beim Erneuern der Liste', isError: true});
                setTimeout(() => this.setState({message: null}), 6000);
            });
    };

    render() {
        const label = (this.props.options && this.props.options.label) || 'Button';
        const {message, isError} = this.state;

        return (
            <div>
                <Button style="lighter" hoverStyle="brand" onClick={this.handleClick}>
                    {label}
                </Button>
                {message && (
                    <div style={{
                        marginTop: '8px',
                        padding: '6px 10px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        color: '#fff',
                        backgroundColor: isError ? '#cc0000' : '#00a338',
                    }}>
                        {message}
                    </div>
                )}
            </div>
        );
    }
}
