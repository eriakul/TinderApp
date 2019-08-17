import React, { Component } from 'react';
import AddLinesPanel from './AddLinesSection'
import MatchPreviewPanel from './MatchPreviewPanel'
import MessagePanel from './MessagePanel'

import '../../TinderApp.css'
import PropTypes from 'prop-types';

export default class AppContainer extends Component {

    render() {
        const { sendMessageStatus, matchData, selectMatch, selectedMatch, matchMessages, matchLines, selectLine, selectedLine, AddLine, openAddLineModal, sendMessageToTinder } = this.props;

        return (
            <div className="app-container">
                <MatchPreviewPanel matchData={matchData} selectMatch={selectMatch} />
                <MessagePanel sendMessageStatus={sendMessageStatus} selectedMatch={selectedMatch} matchMessages={matchMessages} selectedLine={selectedLine} sendMessageToTinder={sendMessageToTinder} ></MessagePanel>
                <AddLinesPanel
                    selectedMatch={selectedMatch}
                    matchLines={matchLines}
                    selectLine={selectLine}
                    AddLine={AddLine}
                    openAddLineModal={openAddLineModal}>
                </AddLinesPanel>
            </div>
        );
    }
}

AppContainer.propTypes = {
    matchData: PropTypes.array.isRequired,
    selectMatch: PropTypes.func.isRequired,
    selectedMatch: PropTypes.object.isRequired,
    matchMessages: PropTypes.object.isRequired,
    matchLines: PropTypes.object.isRequired,
    selectLine: PropTypes.func.isRequired,
    selectedLine: PropTypes.string.isRequired,
    AddLine: PropTypes.func.isRequired,
    openAddLineModal: PropTypes.func.isRequired,
    sendMessageToTinder: PropTypes.func.isRequired,
    sendMessageStatus:PropTypes.object.isRequired,

}