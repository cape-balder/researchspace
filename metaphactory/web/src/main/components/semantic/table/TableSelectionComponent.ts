/*
 * Copyright (C) 2015-2017, metaphacts GmbH
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, you can receive a copy
 * of the GNU Lesser General Public License from http://www.gnu.org/
 */

import { Set } from 'immutable';
import { assign } from 'lodash';
import { Component, PropTypes, DOM as D } from 'react';

/**
 * Component that selects row in the table. Can be placed anywhere as a row child.
 */
class SemanticTableSelectionComponent extends Component<{ rowData: any }, {}> {
  static contextTypes = {
    semanticTableEvents: PropTypes.any.isRequired,
    semanticTableRowData: PropTypes.any.isRequired,
    semanticTableSelected: PropTypes.any.isRequired,
  };

  context: {
    semanticTableEvents: any;
    semanticTableRowData: any;
    semanticTableSelected: Set<any>;
  };

  render() {
    const selected = this.context.semanticTableSelected.has(this.context.semanticTableRowData);

    return D.input(
      assign({
        type: 'checkbox',
        checked: selected,
        onChange: this.toggleSelection,
      }, this.props)
    );
  }

  private toggleSelection = () => {
    this.context.semanticTableEvents.toggleRowSelection(
      this.context.semanticTableRowData
    );
  }
}

export default SemanticTableSelectionComponent;
