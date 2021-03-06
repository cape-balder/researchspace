/*
 * Copyright (C) 2015-2017, © Trustees of the British Museum
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

/**
 * @author Artem Kozlov <ak@metaphacts.com>
 */

import * as React from 'react';
import * as ReactSelect from 'react-select';
import * as _ from 'lodash';

import { Dataset } from 'platform/components/semantic/search/data/datasets/Model';

export interface DatasetSelectorProps {
  availableDatasets: Array<Dataset>
  selectedDatasets: Array<Dataset>
  onDatasetsSelection: (datasets: Array<Dataset>) => void
  disabled?: boolean
}

export class DatasetSelector extends React.Component<DatasetSelectorProps, void> {

  render() {
    return this.props.availableDatasets.length > 0 ? this.datasetSelector() : null;
  }

  componentDidMount() {
    if (_.isEmpty(this.props.selectedDatasets)) {
      this.props.onDatasetsSelection(
        _.filter(this.props.availableDatasets, d => d.isDefault)
      );
    }
  }

  private datasetSelector = () => {
    return <ReactSelect
      disabled={this.props.disabled}
      options={this.datasetsToOptions(this.props.availableDatasets)}
      multi={true}
      value={this.datasetsToOptions(this.props.selectedDatasets)}
      onChange={this.selectDatasets}
      placeholder='Select Datasets'
    />;
  }

  private datasetsToOptions = (datasets: Array<Dataset>): ReactSelect.Options =>
    _.map(datasets, dataset => {
      const alignmentsLabels =
        _.map(dataset.alignments, alignment => alignment.label).join(', ');
      return {
        value: dataset.iri.value,
        label: `${dataset.label} [${alignmentsLabels}]`,
      };
    });

  private selectDatasets = (options: ReactSelect.Options) => {
    const { availableDatasets } = this.props;
    this.props.onDatasetsSelection(
      _.map(
        options,
        option => _.find(availableDatasets, dataset => dataset.iri.value === option.value)
      )
    );
  }
}
