import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationListItem from '../chatComponents/ConversationListItem';

export default class MatchPreviewPanel extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     conversations: []
    //   };
    // }

    render() {
        const { matchData, selectMatch } = this.props;
        return (
            <div className="round-container">
                <div className="scrollable contacts">                {
                    matchData.map(match => {
                        return (
                            <ConversationListItem
                                key={match._id}
                                data={match}
                                selectMatch={selectMatch}
                            />)
                    }
                    )
                }

                </div>
            </div>



        );
    }
}

MatchPreviewPanel.propTypes = {
    matchData: PropTypes.array.isRequired,
    selectMatch: PropTypes.func.isRequired,
}