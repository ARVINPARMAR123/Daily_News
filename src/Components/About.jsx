import React, { useState } from "react";

function About(props) {

    // const [myStyle, setMyStyle] = useState({
    //     color: 'black',
    //     backgroundColor: 'white'
    // });
    // const [btnText, setBtnText] = useState("Enable Dark Mode")

    // const toggleStyle = () => {
    //     if(myStyle.color === 'black'){
    //         setMyStyle({
    //             color: 'white',
    //             backgroundColor: 'black'
    //         })
    //         setBtnText("Enable Light Mode")
    //     }
    //     else{
    //         setMyStyle({
    //             color: 'black',
    //             backgroundColor: 'white'
    //         })
    //         setBtnText("Enable Dark Mode")
    //     }
    // }

    let myStyle = {
      color: props.mode === 'dark' ? 'white' : '#042743',
      backgroundColor: props.mode === 'dark' ? 'rgb(36 74 104)' : 'white'
    }

  return (
    <div className="container my-5" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
        <h1>About Us</h1>
      <div className="accordion my-3 w-75" id="accordionExample" style={myStyle}>
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              style={myStyle}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <b>Analyze Your Text</b>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show "
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <strong>This is the first item’s accordion body.</strong> Wordpad gives a way to analyze your text quickly and efficiently. Be it word count, character count or convert your text in Uppercase or Lowercase...
            </div>
          </div>
        </div>
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              style={myStyle}
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <b>Free to Use</b>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <strong>This is the second item’s accordion body.</strong> Wordpad is a free character tool the provides instant count & word count statistics for a given text. Wordpad reports the number of words and Characters. Thus it is suitable for writing text with word/character limit.
            </div>
          </div>
        </div>
        <div className="accordion-item " style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              style={myStyle}
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <b>Browser Compatible</b>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body " style={myStyle}>
              <strong>This is the third item’s accordion body.</strong> This word counter software works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera.. It suits to count character in facebook, Blog, Books, Excel document, PDF document, etc..
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={toggleStyle} className="btn btn-primary">{btnText}</button> */}
    </div>
  );
}

export default About;
