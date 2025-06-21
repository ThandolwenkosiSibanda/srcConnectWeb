import React, { useState } from "react";
import styled from "styled-components";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faQuoteLeft,
  faQuoteRight,
  faPaperclip,
  faListOl,
  faListUl,
  faAt,
  faUnderline,
  faItalic,
  faBold,
} from "@fortawesome/free-solid-svg-icons";

import { stateToHTML } from "draft-js-export-html";

const DraftContainer = styled.div`
  background-color: #fff;
  // padding: 1rem;
  border-radius: 0.5rem;
  color: #111;
  margin-bottom: 1rem;

  div.DraftEditor-root {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    min-height: 200px;
    width: 100%;
    overflow-y: auto;
    color: #111;
  }

  div.DraftEditor-editorContainer,
  div.public-DraftEditor-content {
    height: 100%;
    color: #111;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #111;
    }
  }

  .toolBarButton {
    margin: 0.3rem;
  }

  select {
    .header-one {
      font-size: 1.5rem;
    }

    .header-two {
      font-size: 1rem;
    }

    .header-three {
      font-size: 0.5rem;
    }

    .header-four {
      font-size: 1rem;
    }

    .header-five {
      font-size: 1rem;
    }

    .header-six {
      font-size: 1rem;
    }
  }
`;

const DraftEditor = ({ editorState, setEditorState, readOnly = false }) => {
  const [active, setActive] = useState("");

  const _onBoldMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onUnderlineMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const _onNewBlockDown = (e, type) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const onToggleBlock = (e) => {
    e.preventDefault();
    setActive(e.target.value);
    setEditorState(RichUtils.toggleBlockType(editorState, e.target.value));
  };

  const dataToBeSaved = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  const contentState = convertFromRaw(JSON.parse(dataToBeSaved));
  const editorStateNow = EditorState.createWithContent(contentState);

  let html = stateToHTML(contentState);

  return (
    <DraftContainer>
      {!readOnly && (
        <button
          className="toolBarButton"
          onMouseDown={(e) => {
            _onBoldMouseDown(e);
          }}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
      )}

      {!readOnly && (
        <button
          className="toolBarButton"
          onMouseDown={(e) => {
            _onItalicMouseDown(e);
          }}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
      )}

      {!readOnly && (
        <button
          className="toolBarButton"
          onMouseDown={(e) => {
            _onUnderlineMouseDown(e);
          }}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
      )}

      {!readOnly && (
        <select
          value={active}
          onChange={(e) => {
            onToggleBlock(e);
          }}
          style={{ maxWidth: "200px" }}
        >
          <option value={"header-one"}> {"Heading One"}</option>
          <option value={"header-two"}> {"Heading Two"}</option>
          <option value={"header-three"}> {"Heading Three"}</option>
          <option value={"header-four"}> {"Heading Four"}</option>
          <option value={"header-five"}> {"Heading Five"}</option>
          <option value={"header-six"}> {"Heading Six"}</option>
        </select>
      )}

      {!readOnly && (
        <button
          className="toolBarButton"
          onMouseDown={(e) => {
            _onNewBlockDown(e, "ordered-list-item");
          }}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
      )}

      {!readOnly && (
        <button
          className="toolBarButton"
          onMouseDown={(e) => {
            _onNewBlockDown(e, "unordered-list-item");
          }}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
      )}

      {/* <button
        className="toolBarButton"
        onMouseDown={(e) => {
          _onNewBlockDown(e, "blockquote");
        }}
      >
        <FontAwesomeIcon icon={faQuoteLeft} />{" "}
        <FontAwesomeIcon icon={faQuoteRight} />
      </button> */}

      {/* <button
        className="toolBarButton"
        onMouseDown={(e) => {
          _onNewBlockDown(e, "code-block");
        }}
      >
        <FontAwesomeIcon icon={faCode} />
      </button> */}

      {/* <button
        className="toolBarButton"
        onMouseDown={(e) => {
          _onNewBlockDown(e);
        }}
      >
        Code Block
      </button> */}

      {/* <button
        className="toolBarButton"
        onMouseDown={(e) => {
          _onNewBlockDown(e);
        }}
      >
        <FontAwesomeIcon icon={faPaperclip} />
      </button>

      <button
        className="toolBarButton"
        onMouseDown={(e) => {
          _onNewBlockDown(e);
        }}
      >
        <FontAwesomeIcon icon={faAt} />
      </button> */}

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        readOnly={readOnly}
      />
    </DraftContainer>
  );
};

export default DraftEditor;
