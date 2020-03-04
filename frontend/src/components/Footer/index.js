import React from 'react';

const styles = {
    textAlign: 'center',
    lineHeight: '20px'
};

class Footer extends React.Component {

    render() {
        return (
            <div style={styles}>
                Message Text - платформа для обмена текста, логов и прочих выхлопов
            </div>
        );
    }
}

export default Footer;