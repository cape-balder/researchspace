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

import RDF = require('../core/Rdf');

module spin {
  export var _NAMESPACE = 'http://spinrdf.org/spin#';

  export const Template = RDF.iri(_NAMESPACE + 'Template');
  export const SelectTemplate = RDF.iri(_NAMESPACE + 'SelectTemplate');
  export const ConstructTemplate = RDF.iri(_NAMESPACE + 'ConstructTemplate');
  export const AskTemplate = RDF.iri(_NAMESPACE + 'AskTemplate');
  export const UpdateTemplate = RDF.iri(_NAMESPACE + 'UpdateTemplate');
  export const constraintProp = RDF.iri(_NAMESPACE + 'constraint');
  export const bodyProp = RDF.iri(_NAMESPACE + 'body');

  export var text = RDF.iri(_NAMESPACE + 'text');
}

export default spin;
