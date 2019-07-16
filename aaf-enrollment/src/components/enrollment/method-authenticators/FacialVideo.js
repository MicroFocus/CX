import React from 'react';
import t from '../../../i18n/locale-keys';
import PropTypes from 'prop-types';

function FacialVideo({captureDone, imgSrc, showFace, facialVideoKey}) {
    const feedStyle = {
        display: showFace ? 'block' : 'none'
    };

    let feedElement;
    if (imgSrc) {
        feedElement = (
            <div id="faceImgContainer">
                <img alt={t.face()} id="faceImg" src={imgSrc} />
            </div>
        );
    }
    else {
        feedElement = (
            <div>
                <canvas id={'canvasSnap' + facialVideoKey} />
                <video id={'video' + facialVideoKey} preload="none" autoPlay muted style={feedStyle} />
                <canvas id={'canvas' + facialVideoKey} style={feedStyle} />
            </div>
        );
    }

    let doneIcon = null;
    if (captureDone) {
        doneIcon = (
            <div className="done-icon">
                <i className="ias-icon ias-icon-facial_recognition" />
                <p>Image captured</p>
            </div>
        );
    }

    return (
        <div className="facial-video">
            {feedElement}
            {doneIcon}
        </div>
    );
}

FacialVideo.propTypes = {
    captureDone: PropTypes.bool.isRequired,
    facialVideoKey: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    showFace: PropTypes.bool.isRequired
};

export default FacialVideo;