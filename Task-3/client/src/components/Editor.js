import React, { useRef, useEffect } from 'react';
import './Editor.css';

function Editor({ content, onChange, onCursorChange, currentUser }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const currentPosition = textarea.selectionStart;
      
      // Only update if content is different to avoid cursor jumping
      if (textarea.value !== content) {
        const scrollTop = textarea.scrollTop;
        textarea.value = content;
        textarea.scrollTop = scrollTop;
        
        // Try to maintain cursor position
        if (currentPosition <= content.length) {
          textarea.setSelectionRange(currentPosition, currentPosition);
        }
      }
    }
  }, [content]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleSelect = (e) => {
    if (onCursorChange) {
      onCursorChange(e.target.selectionStart);
    }
  };

  const handleKeyUp = (e) => {
    if (onCursorChange) {
      onCursorChange(e.target.selectionStart);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <span className="editor-title">📝 Collaborative Editor</span>
        <span className="editor-info">
          {currentUser && (
            <span style={{ color: currentUser.color }}>
              ● {currentUser.name}
            </span>
          )}
        </span>
      </div>
      <div className="editor-wrapper">
        <div className="line-numbers">
          {content.split('\n').map((_, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          defaultValue={content}
          onChange={handleChange}
          onSelect={handleSelect}
          onKeyUp={handleKeyUp}
          onClick={handleSelect}
          spellCheck={false}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
}

export default Editor;
