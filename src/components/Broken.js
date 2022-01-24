import React from "react";

export default function Broken(props) {
    return (
        <div style={{
            position: 'fixed',
            zIndex: '999',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            color: '#ffffff',
            backgroundColor: (props.server ? '#FF0000' : '#0000AA'),
            fontFamily: "'Courier New', 'Courier New', Monaco, monospace"
        }}>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: '14px',
                margin: '0',
                transform: 'translateX(-50%) translateY(-50%)',
                maxWidth: '420px'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '10px'
                }}>
                    <span style={{ margin: 'auto', fontWeight: 'bolder', fontSize: '18px' }}>LaunchDarkly</span>
                </div>
                <div>
                    A problem has been detected with this application and it  has been shut down to prevent damage to your device.<br /><br />
                    If this is the first time you've seen this, consider yourself lucky.<br /><br />
                    If problems continue, you need LaunchDarkly feature flagging in your application ASAP.<br /><br />
                    Technical Information: <br />
                    *** STOP: (0xRELEASFEATURESWITHFLAGS, 0xSEPARATEDEPLOYFROMRELEASE)
                </div>
            </div>
        </div>
    );
}