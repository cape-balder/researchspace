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

package com.metaphacts.data.rdf.container;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.rdf4j.model.IRI;
import org.eclipse.rdf4j.model.Model;
import org.eclipse.rdf4j.model.impl.LinkedHashModel;
import org.eclipse.rdf4j.model.util.ModelException;
import org.eclipse.rdf4j.model.util.Models;
import org.eclipse.rdf4j.model.vocabulary.RDF;
import org.eclipse.rdf4j.model.vocabulary.RDFS;
import org.eclipse.rdf4j.repository.Repository;
import org.eclipse.rdf4j.repository.RepositoryException;

import com.google.common.base.Throwables;
import com.metaphacts.data.rdf.ModelUtils;
import com.metaphacts.data.rdf.PointedGraph;
import com.metaphacts.vocabulary.LDP;

/**
 * @author Johannes Trame <jt@metaphacts.com>
 */
@LDPR(iri = ClipboardRootContainer.IRI_STRING)
public class ClipboardRootContainer extends DefaultLDPContainer {

    public ClipboardRootContainer(IRI iri, Repository repository) {
        super(iri, repository);
    }

    private static final Logger logger = LogManager.getLogger(ClipboardRootContainer.class);
    
    public static final String IRI_STRING = "http://www.metaphacts.com/ontologies/platform#clipboardContainer";
    public static final IRI IRI = vf.createIRI(IRI_STRING);
    
    private static final IRI clipboardItemPredicate = vf.createIRI("http://www.metaphacts.com/ontologies/platform#clipboardItem");
    
    
    public void initialize() {
        if (!getReadConnection().hasOutgoingStatements(this.getResourceIRI())) {
            LinkedHashModel m = new LinkedHashModel();
            m.add(vf.createStatement(IRI, RDF.TYPE, LDP.Container));
            m.add(vf.createStatement(IRI, RDF.TYPE, LDP.Resource));
            m.add(vf.createStatement(IRI, RDFS.LABEL, vf.createLiteral("Clipboard Container")));
            try {
                getRootContainer().add(new PointedGraph(IRI, m));
            } catch (RepositoryException e) {
                throw Throwables.propagate(e);
            }
        }
    }
    
    @Override
    public IRI add(PointedGraph pointedGraph) throws RepositoryException {
        IRI clipboardItem = null;
        try {
            clipboardItem = Models.objectIRI(pointedGraph.getGraph().filter(pointedGraph.getPointer(), clipboardItemPredicate, null)).orElseThrow(
                    () -> new IllegalArgumentException("Clibpoard item to be added must be linked from an auxiliary note with the predicate "+clipboardItemPredicate ));
        } catch (ModelException|IllegalArgumentException e) {
           throw Throwables.propagate(e);
        }
        logger.trace("Checking whether identical clipboard item has already been created for current user.");
        IRI existingItem = checkForExistingItem(clipboardItem, clipboardItemPredicate, true);
        if(existingItem!=null){
            logger.trace("Same item has already been stored by the same user: "+existingItem +". Updating meta-information.");
            Model newModel = ModelUtils.replaceSubjectAndObjects(pointedGraph.getGraph(), pointedGraph.getPointer(), existingItem);
            // if same item already exists on clipboard for current user, just update item (i.e. update of creation date)
            PointedGraph pg = new PointedGraph(existingItem, newModel);
            update(pg);
            return existingItem;
        }else{
            return super.add(pointedGraph);
        }
    }

}