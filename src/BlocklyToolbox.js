import React from 'react';
import PropTypes from 'prop-types';
import {
  Block,
  Xml,
  Category
} from './ToolBoxTagsComponents';

let styles = null;

const BlocklyToolbox = (props) => {
  const groupedByCategory = props.tools.reduce(
    (accumulated, item) => {
      const result = accumulated;
      result[item.category] = result[item.category] || [];
      result[item.category].push(item.name);
      return result;
    },
    {}
  );

  const elements = Object.keys(groupedByCategory).map((key) => {
    const blocks = groupedByCategory[key].map((type) => {
      return <Block type={type} key={type} />;
    });
    return (
      <Category
        key={key}
        name={key}
      >
        {blocks}
      </Category>
    );
  });

  return (
    <Xml
      style={styles.toolbox}
      onRef={props.onRef}
    >
      {elements}
      {props.children}
    </Xml>
  );
};

BlocklyToolbox.defaultProps = {
  onRef: () => {},
};

BlocklyToolbox.propTypes = {
  onRef: PropTypes.func,
  tools: PropTypes.arrayOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

styles = {
  toolbox: {
    display: 'none',
  },
};

export default BlocklyToolbox;
