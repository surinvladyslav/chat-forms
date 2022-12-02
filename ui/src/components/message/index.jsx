import React, {useEffect, useState} from 'react';
import cx from 'classnames';

import './index.scss';

export const Message = ({text, is, id, date, onClick}) => {
  const [tick, setTick] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTick(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={cx('bubble is-read', (is ? 'is-in' : 'is-out'))}
      onClick={onClick}
      data-message-id={id}
    >
      <div className="bubble-content-wrapper">
        <div className="bubble-content">
          <div className="message">
            {text}
            <span className="time tgico">
                <span className="i18n" style={{
                  opacity: 0,
                  marginLeft: '0.5rem',
                }}>{date}</span>
                <svg className="double-tick" style={{opacity: '0'}}
                     xmlns="http://www.w3.org/2000/svg"
                     version="1.0" width="512.000000pt"
                     height="512.000000pt"
                     viewBox="0 0 512.000000 512.000000"
                     preserveAspectRatio="xMidYMid meet">
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                      <path
                        d="M3249 3826 c-19 -7 -45 -19 -57 -28 -12 -8 -358 -347 -770 -754 -411 -406 -840 -830 -953 -942 l-206 -203 -401 418 c-221 230 -423 435 -449 455 -130 102 -310 60 -389 -92 -29 -55 -26 -163 6 -222 16 -30 201 -229 512 -551 268 -278 512 -527 541 -554 59 -54 108 -73 183 -73 105 0 69 -33 1204 1090 580 574 1065 1057 1078 1074 69 94 49 256 -41 332 -72 61 -174 80 -258 50z"/>
                      <path
                        d="M4777 3816 c-20 -8 -52 -25 -70 -40 -17 -14 -452 -442 -966 -950 l-935 -925 -63 59 c-103 96 -204 113 -315 53 -85 -46 -128 -121 -128 -223 0 -70 17 -117 61 -169 81 -94 295 -302 328 -317 20 -10 64 -20 98 -22 121 -8 57 -65 1218 1083 578 572 1060 1053 1072 1071 92 133 22 328 -136 382 -45 16 -117 14 -164 -2z"/>
                  </g>
                </svg>
                <div className="inner tgico">
                  <span className="i18n">{date}</span>
                  <span className="double-tick-wrapper">
                    {
                      tick ?
                        <svg className="double-tick"
                             xmlns="http://www.w3.org/2000/svg" version="1.0"
                             width="512.000000pt" height="512.000000pt"
                             viewBox="0 0 512.000000 512.000000"
                             preserveAspectRatio="xMidYMid meet">
                          <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#000000" stroke="none">
                            <path
                              d="M3249 3826 c-19 -7 -45 -19 -57 -28 -12 -8 -358 -347 -770 -754 -411 -406 -840 -830 -953 -942 l-206 -203 -401 418 c-221 230 -423 435 -449 455 -130 102 -310 60 -389 -92 -29 -55 -26 -163 6 -222 16 -30 201 -229 512 -551 268 -278 512 -527 541 -554 59 -54 108 -73 183 -73 105 0 69 -33 1204 1090 580 574 1065 1057 1078 1074 69 94 49 256 -41 332 -72 61 -174 80 -258 50z"/>
                            <path
                              d="M4777 3816 c-20 -8 -52 -25 -70 -40 -17 -14 -452 -442 -966 -950 l-935 -925 -63 59 c-103 96 -204 113 -315 53 -85 -46 -128 -121 -128 -223 0 -70 17 -117 61 -169 81 -94 295 -302 328 -317 20 -10 64 -20 98 -22 121 -8 57 -65 1218 1083 578 572 1060 1053 1072 1071 92 133 22 328 -136 382 -45 16 -117 14 -164 -2z"/>
                          </g>
                        </svg> :
                        <svg className="double-tick tick"
                             xmlns="http://www.w3.org/2000/svg"
                             version="1.0" width="512.000000pt"
                             height="512.000000pt"
                             viewBox="0 0 512.000000 512.000000"
                             preserveAspectRatio="xMidYMid meet">
                          <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#000000" stroke="none">
                            <path
                              d="M4605 4386 c-105 -33 -109 -36 -1445 -1372 l-1315 -1314 -595 595 c-553 551 -600 596 -662 625 -159 74 -328 51 -454 -63 -100 -90 -149 -234 -125 -364 25 -134 9 -117 839 -944 726 -724 771 -767 832 -794 78 -34 185 -44 257 -25 122 33 70 -16 1629 1543 1614 1616 1522 1517 1547 1660 34 199 -91 392 -292 453 -56 17 -162 17 -216 0z"/>
                          </g>
                        </svg>
                    }
                  </span>
                </div>
              </span>
          </div>
          {/*{*/}
          {/*    image &&*/}
          {/*    <div className="attachment media-container">*/}
          {/*        <img src={image}/>*/}
          {/*    </div>*/}
          {/*}*/}
        </div>
      </div>
    </div>
  );
};