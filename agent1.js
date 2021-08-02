const N3 = require('n3');
const { DataFactory } = N3;
const { namedNode, blankNode, quad, literal, defaultGraph } = DataFactory;
const fetch = require('node-fetch');
const { performance } = require('perf_hooks');
const http = require('http');
const { resolve } = require('path');

const XSD_INTEGER = namedNode('http://www.w3.org/2001/XMLSchema#integer');
const LDP_CONTAINS = namedNode('http://www.w3.org/ns/ldp#contains');
const RDF_TYPE = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
const RDF_SUBJECT = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#subject');
const RDF_PREDICATE = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate');
const RDF_OBJECT = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#object');
const RDF_FIRST = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first');
const RDF_REST = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest');
const RDF_NIL = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil');
const ARENA = 'http://arena2036.example.org/';

var uriVisisted;
var store;
var numSafeRequest;
var numUnsafeRequest;

http.globalAgent.maxSockets = 1;

run();

async function run() {
    await new Promise(resolve => 
    setTimeout(async () => {
        await doStep([
            crawl,
            placeStorageAffordances,
            placeStationAffordances,
        ]);
        resolve();
    }, 500));

    await new Promise(resolve => 
    setTimeout(async () => {
        await doStep([
            crawl,
            placeTransporterAffordances,
        ]);
        resolve();
    }, 500));
}

async function doStep(functions) {
    return new Promise(async (resolve) => {
        uriVisisted = new Map();
        store = new N3.Store();
        numSafeRequest = 0;
        numUnsafeRequest = 0;
        startTime = performance.now();
        for(fun of functions) {
            await fun();
        }
        console.log('===Finished in ' + (performance.now() - startTime).toFixed(3) + ' ms. Did ' + numSafeRequest + ' safe and ' + numUnsafeRequest + ' unsafe requests.===');
        resolve();
    });
}

async function crawl() {
    return new Promise(async (resolve) => {
        let newRequest = true;
        while(newRequest) {
            newRequest = false;
            /*
            {
                [] http:mthd httpm:GET ;
                    http:requestURI <http://127.0.1.1:8080/> .
            }
            */
            newRequest |= await getRequest('http://127.0.1.1:8080/');

            /*
            {
                ?a ldp:contains ?b .
            } => {
                [] http:mthd httpm:GET ;
                    http:requestURI ?b .
            } .
            */
            for(let object of store.getObjects(null, LDP_CONTAINS)) {
                newRequest |= await getRequest(object.value);
            }
        }
        resolve();
    });
}

/*
Basic affordances (storage stations)
{
    ?station a arena:Workstation ;
        arena:skills ?skill ;
        arena:outputPort ?port ;
        ldp:contains ?affordanceContainer .

    ?port arena:locationX ?x ;
        arena:locationY ?y .

    ?affordanceContainer a arena:AffordanceContainer .

    ?recipe a arena:Recipe ;
        arena:requiresSkill ?skill ;
        arena:requiresProducts arena:none ;
        arena:yieldsProducts ?yields ;
        arena:baseProcessingTime ?time .
} => {
    [] http:mthd httpm:POST ;
        http:requestURI ?affordanceContainer ;
        http:body {
            <> a arena:Affordance ;
                arena:hasPostcondition [
                    rdf:subject _:p ;
                    rdf:predicate rdf:type ;
                    rdf:object arena:Product
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:kind ;
                    rdf:object ?yields
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:locationX ;
                    rdf:object ?x
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:locationY ;
                    rdf:object ?y
                ] ;
                arena:time ?time .
        } .
} .
*/
async function placeStorageAffordances() {
   await Promise.all(store.getSubjects(RDF_TYPE, namedNode(ARENA + 'Workstation')).map(async (station) => {
        await Promise.all(store.getObjects(station, namedNode(ARENA + 'skills')).map(async (skill) => {
            await Promise.all(store.getObjects(station, namedNode(ARENA + 'outputPort')).map(async (port) => {
                await Promise.all(store.getObjects(port, namedNode(ARENA + 'locationX')).map(async (x) => {
                    await Promise.all(store.getObjects(port, namedNode(ARENA + 'locationY')).map(async (y) => {
                        await Promise.all(store.getObjects(station, LDP_CONTAINS).map(async (affordanceContainer) => {
                            if(store.getQuads(affordanceContainer, RDF_TYPE, namedNode(ARENA + 'AffordanceContainer')).length > 0) {
                                await Promise.all(store.getSubjects(RDF_TYPE, namedNode(ARENA + 'Recipe')).map(async (recipe) => {
                                    if(store.getQuads(recipe, namedNode(ARENA + 'requiresSkill'), skill).length > 0) {
                                        if(store.getQuads(recipe, namedNode(ARENA + 'requiresProducts'), namedNode(ARENA + 'none')).length > 0) {
                                            await Promise.all(store.getObjects(recipe, namedNode(ARENA + 'yieldsProducts')).map(async (yieldsProduct) => {
                                                await Promise.all(store.getObjects(recipe, namedNode(ARENA + 'baseProcessingTime')).map(async (time) => {
                                                    // Check if affordance is already present
                                                    let alreadyPresent = store.getObjects(affordanceContainer, LDP_CONTAINS).map((affordance) => {
                                                        let typePresent = false;
                                                        let kindPresent = false;
                                                        let locationXPresent = false;
                                                        let locationYPresent = false;
                                                        store.getObjects(affordance, namedNode(ARENA + 'hasPostcondition')).forEach((postcondition) => {
                                                            if(store.getQuads(postcondition, RDF_PREDICATE, RDF_TYPE).length > 0 && store.getQuads(postcondition, RDF_OBJECT, namedNode(ARENA + 'Product')).length > 0) {
                                                                typePresent = true;
                                                            }
                                                            if(store.getQuads(postcondition, RDF_PREDICATE, namedNode(ARENA + 'kind')).length > 0 && store.getQuads(postcondition, RDF_OBJECT, yieldsProduct).length > 0) {
                                                                kindPresent = true;
                                                            }
                                                            if(store.getQuads(postcondition, RDF_PREDICATE, namedNode(ARENA + 'locationX')).length > 0 && store.getQuads(postcondition, RDF_OBJECT, x).length > 0) {
                                                                locationXPresent = true;
                                                            }
                                                            if(store.getQuads(postcondition, RDF_PREDICATE, namedNode(ARENA + 'locationY')).length > 0 && store.getQuads(postcondition, RDF_OBJECT, y).length > 0) {
                                                                locationYPresent = true;
                                                            }
                                                        });
                                                        return store.getQuads(affordance, namedNode(ARENA + 'hasPrecondition'), namedNode(ARENA + 'none')).length > 0 &&
                                                            typePresent && kindPresent && locationXPresent && locationYPresent;
                                                    }).reduce((prev, curr) => prev || curr, false);
                                                
                                                    if(!alreadyPresent) {
                                                        let postCond1 = blankNode();
                                                        let postCond2 = blankNode();
                                                        let postCond3 = blankNode();
                                                        let postCond4 = blankNode();
                                                        let product = blankNode();
                                                        let task = blankNode();
                                                        let taskL = blankNode();
                                                        await postRequest(affordanceContainer.value, [
                                                            quad(namedNode(''), RDF_TYPE, namedNode(ARENA + 'Affordance')),
                                                            quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), namedNode(ARENA + 'none')),
                                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond1),
                                                            quad(postCond1, RDF_SUBJECT, product),
                                                            quad(postCond1, RDF_PREDICATE, RDF_TYPE),
                                                            quad(postCond1, RDF_OBJECT, namedNode(ARENA + 'Product')),
                                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond2),
                                                            quad(postCond2, RDF_SUBJECT, product),
                                                            quad(postCond2, RDF_PREDICATE, namedNode(ARENA + 'kind')),
                                                            quad(postCond2, RDF_OBJECT, yieldsProduct),
                                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond3),
                                                            quad(postCond3, RDF_SUBJECT, product),
                                                            quad(postCond3, RDF_PREDICATE, namedNode(ARENA + 'locationX')),
                                                            quad(postCond3, RDF_OBJECT, x),
                                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond4),
                                                            quad(postCond4, RDF_SUBJECT, product),
                                                            quad(postCond4, RDF_PREDICATE, namedNode(ARENA + 'locationY')),
                                                            quad(postCond4, RDF_OBJECT, y),
                                                            quad(namedNode(''), namedNode(ARENA + 'needsTask'), taskL),
                                                            quad(taskL, RDF_FIRST, task),
                                                            quad(taskL, RDF_REST, RDF_NIL),
                                                            quad(task, RDF_TYPE, namedNode(ARENA + 'WorkstationTask')),
                                                            quad(task, namedNode(ARENA + 'instrument'), station),
                                                            quad(task, namedNode(ARENA + 'recipe'), recipe),
                                                            quad(task, namedNode(ARENA + 'output'), product),
                                                            quad(namedNode(''), namedNode(ARENA + 'estimatedTime'), time),
                                                        ]);
                                                    }
                                                }));
                                            }));
                                        }
                                    }
                                }));
                            }
                        }));
                    }));
                }));
            }));
        }));
   }));
}

/*
Simple affordances (e.g. soldering stations)
{
    ?station a arena:Workstation ;
        arena:skills ?skill ;
        arena:outputPort ?output ;
        arena:outputPort ?input ;
        ldp:contains ?affordanceContainer .

    ?input arena:locationX ?inputX ;
        arena:locationY ?inputY .

    ?output arena:locationX ?outputX ;
        arena:locationY ?outputY .

    ?affordanceContainer a arena:AffordanceContainer .

    ?recipe a arena:Recipe ;
        arena:requiresSkill ?skill ;
        arena:requiresProducts ?requires ;
        arena:yieldsProducts ?yields ;
        arena:baseProcessingTime ?time .
} => {
    [] http:mthd httpm:POST ;
        http:requestURI ?affordanceContainer ;
        http:body {
            <> a arena:Affordance ;
                arena:hasPrecondition [
                    rdf:subject _:p ;
                    rdf:predicate rdf:type ;
                    rdf:object arena:Product
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:kind ;
                    rdf:object ?requires
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:locationX ;
                    rdf:object ?inputX
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:locationY ;
                    rdf:object ?inputY
                ] ;
                arena:hasPostcondition [
                    rdf:subject _:p ;
                    rdf:predicate rdf:type ;
                    rdf:object arena:Product
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:kind ;
                    rdf:object ?yields
                ] ;
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:locationX ;
                    rdf:object ?outputX
                ], [
                    rdf:subject _:p ;
                    rdf:predicate arena:locationY ;
                    rdf:object ?outputY
                ] ;
                #arena:time ?time .
        } .
} .
*/
async function placeStationAffordances() {
   await Promise.all(store.getSubjects(RDF_TYPE, namedNode(ARENA + 'Workstation')).map(async (station) => {
        await Promise.all(store.getObjects(station, namedNode(ARENA + 'skills')).map(async (skill) => {
            await Promise.all(store.getObjects(station, namedNode(ARENA + 'outputPort')).map(async (outputPort) => {
                await Promise.all(store.getObjects(outputPort, namedNode(ARENA + 'locationX')).map(async (outX) => {
                    await Promise.all(store.getObjects(outputPort, namedNode(ARENA + 'locationY')).map(async (outY) => {
                        await Promise.all(store.getObjects(station, namedNode(ARENA + 'inputPort')).map(async (inputPort) => {
                            await Promise.all(store.getObjects(inputPort, namedNode(ARENA + 'locationX')).map(async (inX) => {
                                await Promise.all(store.getObjects(inputPort, namedNode(ARENA + 'locationY')).map(async (inY) => {
                                    await Promise.all(store.getObjects(station, LDP_CONTAINS).map(async (affordanceContainer) => {
                                        if(store.getQuads(affordanceContainer, RDF_TYPE, namedNode(ARENA + 'AffordanceContainer')).length > 0) {
                                            await Promise.all(store.getSubjects(RDF_TYPE, namedNode(ARENA + 'Recipe')).map(async (recipe) => {
                                                if(store.getQuads(recipe, namedNode(ARENA + 'requiresSkill'), skill).length > 0) {
                                                    if(store.getObjects(recipe, namedNode(ARENA + 'requiresProducts')).filter(o => !o.equals(namedNode(ARENA + 'none'))).length > 0) {
                                                        if(store.getObjects(recipe, namedNode(ARENA + 'yieldsProducts')).filter(o => !o.equals(namedNode(ARENA + 'none'))).length > 0) {
                                                            await Promise.all(store.getObjects(recipe, namedNode(ARENA + 'baseProcessingTime')).map(async (time) => {
                                                                let postStore = new N3.Store();
                                                                let task = blankNode();
                                                                let taskL = blankNode();
                                                                store.getObjects(recipe, namedNode(ARENA + 'requiresProducts')).filter(o => !o.equals(namedNode(ARENA + 'none'))).forEach((required) => {
                                                                    let product = blankNode();
                                                                    let preCond1 = blankNode();
                                                                    let preCond2 = blankNode();
                                                                    let preCond3 = blankNode();
                                                                    let preCond4 = blankNode();
                                                                    postStore.addQuads([
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), preCond1),
                                                                        quad(preCond1, RDF_SUBJECT, product),
                                                                        quad(preCond1, RDF_PREDICATE, RDF_TYPE),
                                                                        quad(preCond1, RDF_OBJECT, namedNode(ARENA + 'Product')),
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), preCond2),
                                                                        quad(preCond2, RDF_SUBJECT, product),
                                                                        quad(preCond2, RDF_PREDICATE, namedNode(ARENA + 'kind')),
                                                                        quad(preCond2, RDF_OBJECT, required),
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), preCond3),
                                                                        quad(preCond3, RDF_SUBJECT, product),
                                                                        quad(preCond3, RDF_PREDICATE, namedNode(ARENA + 'locationX')),
                                                                        quad(preCond3, RDF_OBJECT, inX),
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), preCond4),
                                                                        quad(preCond4, RDF_SUBJECT, product),
                                                                        quad(preCond4, RDF_PREDICATE, namedNode(ARENA + 'locationY')),
                                                                        quad(preCond4, RDF_OBJECT, inY),
                                                                        quad(task, namedNode(ARENA + 'input'), product),
                                                                    ]);
                                                                });

                                                                store.getObjects(recipe, namedNode(ARENA + 'yieldsProducts')).filter(o => !o.equals(namedNode(ARENA + 'none'))).forEach((yielded) => {
                                                                    let product = blankNode();
                                                                    let postCond1 = blankNode();
                                                                    let postCond2 = blankNode();
                                                                    let postCond3 = blankNode();
                                                                    let postCond4 = blankNode();
                                                                    postStore.addQuads([
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond1),
                                                                        quad(postCond1, RDF_SUBJECT, product),
                                                                        quad(postCond1, RDF_PREDICATE, RDF_TYPE),
                                                                        quad(postCond1, RDF_OBJECT, namedNode(ARENA + 'Product')),
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond2),
                                                                        quad(postCond2, RDF_SUBJECT, product),
                                                                        quad(postCond2, RDF_PREDICATE, namedNode(ARENA + 'kind')),
                                                                        quad(postCond2, RDF_OBJECT, yielded),
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond3),
                                                                        quad(postCond3, RDF_SUBJECT, product),
                                                                        quad(postCond3, RDF_PREDICATE, namedNode(ARENA + 'locationX')),
                                                                        quad(postCond3, RDF_OBJECT, outX),
                                                                        quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postCond4),
                                                                        quad(postCond4, RDF_SUBJECT, product),
                                                                        quad(postCond4, RDF_PREDICATE, namedNode(ARENA + 'locationY')),
                                                                        quad(postCond4, RDF_OBJECT, outY),
                                                                        quad(task, namedNode(ARENA + 'output'), product),
                                                                    ]);
                                                                });

                                                                postStore.addQuads([
                                                                    quad(namedNode(''), RDF_TYPE, namedNode(ARENA + 'Affordance')),
                                                                    quad(namedNode(''), namedNode(ARENA + 'needsTask'), taskL),
                                                                    quad(taskL, RDF_FIRST, task),
                                                                    quad(taskL, RDF_REST, RDF_NIL),
                                                                    quad(task, RDF_TYPE, namedNode(ARENA + 'WorkstationTask')),
                                                                    quad(task, namedNode(ARENA + 'instrument'), station),
                                                                    quad(task, namedNode(ARENA + 'recipe'), recipe),
                                                                    quad(namedNode(''), namedNode(ARENA + 'estimatedTime'), time),
                                                                ]);

                                                                await postRequest(affordanceContainer.value, postStore.getQuads(null, null, null));
                                                            }));
                                                        }
                                                    }
                                                }
                                            }));
                                        }
                                    }));
                                }));
                            }));
                        }));
                    }));
                }));
            }));
        }));
   }));
}

async function placeTransporterAffordances() {
    let affPost = new Map();
    let affPre = new Map();
    return Promise.all([
        Promise.all(store.getSubjects(RDF_TYPE, namedNode(ARENA + 'Workstation')).map(async (workstation) => {
            await Promise.all(store.getObjects(workstation, namedNode(ARENA + 'affords')).map(async (affordance) => {
                let postTriples = affPost.get(affordance);
                if(!postTriples) {
                    postTriples = new Map();
                    affPost.set(affordance, postTriples);
                }
                store.getObjects(affordance, namedNode(ARENA + 'hasPostcondition')).forEach((postcondition) => {
                    if(!postcondition.equals(namedNode(ARENA + 'none'))) {
                        let subject = store.getObjects(postcondition, RDF_SUBJECT)[0];
                        let predicate = store.getObjects(postcondition, RDF_PREDICATE)[0];
                        let object = store.getObjects(postcondition, RDF_OBJECT)[0];

                        let pContainer = postTriples.get(subject.id);
                        if(!pContainer) {
                            pContainer = new Map();
                            postTriples.set(subject.id, pContainer);
                        }
                        pContainer.set(predicate.value, object);
                    }
                });
                let preTriples = affPre.get(affordance);
                if(!preTriples) {
                    preTriples = new Map();
                    affPre.set(affordance, preTriples);
                    store.getObjects(affordance, namedNode(ARENA + 'hasPrecondition')).forEach((precondition) => {
                        if(!precondition.equals(namedNode(ARENA + 'none'))) {
                            let subject = store.getObjects(precondition, RDF_SUBJECT)[0];
                            let predicate = store.getObjects(precondition, RDF_PREDICATE)[0];
                            let object = store.getObjects(precondition, RDF_OBJECT)[0];

                            let pContainer = preTriples.get(subject.id);
                            if(!pContainer) {
                                pContainer = new Map();
                                preTriples.set(subject.id, pContainer);
                            }
                            pContainer.set(predicate.value, object);
                        }
                    });
                }
            }));
        })),
        Promise.all(Array.from(affPost).map(async ([affordancePost, prodMapPost], _) => {
            await Promise.all(Array.from(prodMapPost).map(async ([prod1, preObMapPost], _) => {
                await Promise.all(Array.from(affPre).map(async ([affordancePre, prodMapPre], _) => {
                    await Promise.all(Array.from(prodMapPre).map(async ([prod2, preObMapPre], _) => {
                        let kindPost = preObMapPost.get(ARENA + 'kind');
                        let kindPre = preObMapPre.get(ARENA + 'kind');
                        let xPost = preObMapPost.get(ARENA + 'locationX').value;
                        let xPre = preObMapPre.get(ARENA + 'locationX').value;
                        let yPost = preObMapPost.get(ARENA + 'locationY').value;
                        let yPre = preObMapPre.get(ARENA + 'locationY').value;
                        if(kindPre.equals(kindPost) && (xPre !== xPost || yPre !== yPost)) {
                            await Promise.all(store.getSubjects(RDF_TYPE, namedNode(ARENA + 'Transporter')).map(async (transporter) => {
                                await Promise.all(store.getObjects(transporter, LDP_CONTAINS).map(async (affordanceContainer) => {
                                    if(store.getQuads(affordanceContainer, RDF_TYPE, namedNode(ARENA + 'AffordanceContainer')).length > 0) {
                                        let product = blankNode();
                                        let taskL1 = blankNode();
                                        let taskL2 = blankNode();
                                        let task1 = blankNode();
                                        let task2 = blankNode();
                                        let preCond1 = blankNode();
                                        let preCond2 = blankNode();
                                        let preCond3 = blankNode();
                                        let preCond4 = blankNode();
                                        let postCond1 = blankNode();
                                        let postCond2 = blankNode();
                                        let postCond3 = blankNode();
                                        let postCond4 = blankNode();
                                        await postRequest(affordanceContainer.value, [
                                            quad(namedNode(''), RDF_TYPE, namedNode(ARENA + 'Affordance')),
                                            quad(namedNode(''), namedNode(ARENA + 'needsTask'), taskL1),
                                            quad(taskL1, RDF_FIRST, task1),
                                            quad(taskL1, RDF_REST, taskL2),
                                            quad(taskL2, RDF_FIRST, task2),
                                            quad(taskL2, RDF_REST, RDF_NIL),
                                            quad(task1, RDF_TYPE, namedNode(ARENA + 'TransporterTask')),
                                            quad(task1, namedNode(ARENA + 'instrument'), transporter),
                                            quad(task1, namedNode(ARENA + 'toLocationX'), literal(xPost, XSD_INTEGER)),
                                            quad(task1, namedNode(ARENA + 'toLocationY'), literal(yPost, XSD_INTEGER)),
                                            quad(task1, namedNode(ARENA + 'input'), product),
                                            quad(task2, RDF_TYPE, namedNode(ARENA + 'TransporterTask')),
                                            quad(task2, namedNode(ARENA + 'instrument'), transporter),
                                            quad(task2, namedNode(ARENA + 'toLocationX'), literal(xPre, XSD_INTEGER)),
                                            quad(task2, namedNode(ARENA + 'toLocationY'), literal(yPre, XSD_INTEGER)),
                                            quad(task2, namedNode(ARENA + 'output'), product),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), preCond1),
                                            quad(preCond1, RDF_SUBJECT, product),
                                            quad(preCond1, RDF_PREDICATE, RDF_TYPE),
                                            quad(preCond1, RDF_OBJECT, namedNode(ARENA + 'Product')),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), preCond2),
                                            quad(preCond2, RDF_SUBJECT, product),
                                            quad(preCond2, RDF_PREDICATE, namedNode(ARENA + 'kind')),
                                            quad(preCond2, RDF_OBJECT, kindPre),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), preCond3),
                                            quad(preCond3, RDF_SUBJECT, product),
                                            quad(preCond3, RDF_PREDICATE, namedNode(ARENA + 'locationX')),
                                            quad(preCond3, RDF_OBJECT, literal(xPre, XSD_INTEGER)),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), preCond4),
                                            quad(preCond4, RDF_SUBJECT, product),
                                            quad(preCond4, RDF_PREDICATE, namedNode(ARENA + 'locationY')),
                                            quad(preCond4, RDF_OBJECT, literal(yPre, XSD_INTEGER)),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), postCond1),
                                            quad(postCond1, RDF_SUBJECT, product),
                                            quad(postCond1, RDF_PREDICATE, RDF_TYPE),
                                            quad(postCond1, RDF_OBJECT, namedNode(ARENA + 'Product')),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), postCond2),
                                            quad(postCond2, RDF_SUBJECT, product),
                                            quad(postCond2, RDF_PREDICATE, namedNode(ARENA + 'kind')),
                                            quad(postCond2, RDF_OBJECT, kindPost),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), postCond3),
                                            quad(postCond3, RDF_SUBJECT, product),
                                            quad(postCond3, RDF_PREDICATE, namedNode(ARENA + 'locationX')),
                                            quad(postCond3, RDF_OBJECT, literal(xPost, XSD_INTEGER)),
                                            quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), postCond4),
                                            quad(postCond4, RDF_SUBJECT, product),
                                            quad(postCond4, RDF_PREDICATE, namedNode(ARENA + 'locationY')),
                                            quad(postCond4, RDF_OBJECT, literal(yPost, XSD_INTEGER)),
                                        ]);
                                    }
                                }));
                            }));
                        }
                    }));
                }));
            }));
        }))
    ]);
}

async function placeCombinedAffordances() {
    return new Promise(async (resolve) => {
        let affs = [];
        store.getObjects(null, namedNode(ARENA + 'affords')).map((affordance) => {
            let preMap = new Map();
            store.getObjects(affordance, namedNode(ARENA + 'hasPrecondition')).forEach((precond) => {
                let subjects = store.getObjects(precond, RDF_SUBJECT);
                if(subjects.length < 1) {
                    return;
                }
                let predicates = store.getObjects(precond, RDF_PREDICATE);
                if(predicates.length < 1) {
                    return;
                }
                let objects = store.getObjects(precond, RDF_OBJECT);
                if(objects.length < 1) {
                    return;
                }

                let mapped = preMap.get(subjects[0].id);
                if(!mapped) {
                    mapped = new Cond(subjects[0].value);
                    preMap.set(subjects[0].id, mapped);
                }

                mapped[predicates[0].id] = objects[0].id
            });
            let postMap = new Map();
            store.getObjects(affordance, namedNode(ARENA + 'hasPostcondition')).forEach((postcond) => {
                let subjects = store.getObjects(postcond, RDF_SUBJECT);
                if(subjects.length < 1) {
                    return;
                }
                let predicates = store.getObjects(postcond, RDF_PREDICATE);
                if(predicates.length < 1) {
                    return;
                }
                let objects = store.getObjects(postcond, RDF_OBJECT);
                if(objects.length < 1) {
                    return;
                }

                let mapped = postMap.get(subjects[0].id);
                if(!mapped) {
                    mapped = new Cond(subjects[0].value);
                    postMap.set(subjects[0].id, mapped);
                }

                mapped[predicates[0].id] = objects[0].id
            });
            affs.push({
                affordance: affordance,
                preconds: Array.from(preMap.values()),
                postconds: Array.from(postMap.values()),
            });
        });
        await Promise.all(affs.map(async (obj1) => {
            return new Promise(async (resolve) => {
                let mapBNodes = new Map();
                let affordance1 = obj1.affordance;
                let preconds = obj1.preconds;
                let neededAffordances = new Set();
                let handledPreconds = new Set();
                affs.forEach((obj2) => {
                    let affordance2 = obj2.affordance;
                    let postcond = obj2.postconds[0];
                    let toHandle = preconds.filter((precond) => postcond.equals(precond));
                    toHandle.forEach((prec) => mapBNodes.set(postcond.bNode, prec.bNode));
                    if(toHandle.length > 0) {
                        handledPreconds.add(toHandle[0]);
                        preconds = preconds.filter((cond) => !cond.equals(toHandle[0]));
                        neededAffordances.add(affordance2);
                    }
                });
                if(preconds.length <= 0 && handledPreconds.size > 0) {
                    let affordanceContainer = store.getSubjects(LDP_CONTAINS, affordance1)[0];
                    let tasksSooner = Array.from(neededAffordances.values()).map((affordance) =>
                        rdfList2Array(store.getObjects(affordance, namedNode(ARENA + 'needsTask'))[0])
                    ).reduce((a, b) => a.concat(b), []);
                    let tasksLater = rdfList2Array(store.getObjects(affordance1, namedNode(ARENA + 'needsTask'))[0]);
                    let tasks = tasksSooner.concat(tasksLater);

                    let preconditions = new Set(Array.from(neededAffordances.values()).map((affordance) =>
                        store.getObjects(affordance, namedNode(ARENA + 'hasPrecondition'))
                    ).reduce((a, b) => a.concat(b), []));
                    let precondQuads;
                    if(preconditions.size == 1 && preconditions.has(namedNode(ARENA + 'none'))) {
                        precondQuads = [
                            quad(namedNode('', namedNode(ARENA + 'hasPrecondition'), namedNode(ARENA + 'none')))
                        ];
                    } else {
                        precondQuads = Array.from(preconditions.values()).map((precond) => [
                            quad(namedNode(''), namedNode(ARENA + 'hasPrecondition'), precond),
                            ...store.getQuads(precond, null, null),
                        ]).reduce((a, b) => a.concat(b), []);
                    }
                    precondQuads = precondQuads.map((q) => {
                        let subject = q.subject;
                        let mappedSubject = mapBNodes.get(subject.value);
                        if(mappedSubject) {
                            subject = blankNode(mappedSubject);
                        }
                        let predicate = q.predicate;
                        let mappedPredicate = mapBNodes.get(predicate.value);
                        if(mappedPredicate) {
                            predicate = blankNode(mappedPredicate);
                        }
                        let object = q.object;
                        let mappedObject = mapBNodes.get(object.value);
                        if(mappedObject) {
                            object = blankNode(mappedObject);
                        }
                        return quad(subject, predicate, object);
                    });

                    let postconditions = store.getObjects(affordance1, namedNode(ARENA + 'hasPostcondition'));
                    let postcondQuads;
                    if(postconditions.size == 1 && postconditions.has(namedNode(ARENA + 'none'))) {
                        postcondQuads = [
                            quad(namedNode('', namedNode(ARENA + 'hasPostcondition'), namedNode(ARENA + 'none')))
                        ];
                    } else {
                        postcondQuads = Array.from(postconditions.values()).map((postcond) => [
                            quad(namedNode(''), namedNode(ARENA + 'hasPostcondition'), postcond),
                            ...store.getQuads(postcond, null, null),
                        ]).reduce((a, b) => a.concat(b), []);
                    }

                    let taskQuads = tasks.map((task) => store.getQuads(task, null, null)).reduce((a, b) => a.concat(b), []);
                    taskQuads = taskQuads.map((q) => {
                        let subject = q.subject;
                        let mappedSubject = mapBNodes.get(subject.value);
                        if(mappedSubject) {
                            subject = blankNode(mappedSubject);
                        }
                        let predicate = q.predicate;
                        let mappedPredicate = mapBNodes.get(predicate.value);
                        if(mappedPredicate) {
                            predicate = blankNode(mappedPredicate);
                        }
                        let object = q.object;
                        let mappedObject = mapBNodes.get(object.value);
                        if(mappedObject) {
                            object = blankNode(mappedObject);
                        }
                        return quad(subject, predicate, object);
                    });

                    let taskList = blankNode();
                    await postRequest(affordanceContainer.value, [
                        quad(namedNode(''), RDF_TYPE, namedNode(ARENA + 'Affordance')),
                        quad(namedNode(''), namedNode(ARENA + 'needsTask'), taskList),
                    ].concat(array2RdfList(taskList, tasks)).concat(taskQuads).concat(precondQuads).concat(postcondQuads));
                }
                resolve();
            });
        }));
        resolve();
    });
}

async function executeTasks() {
    return new Promise(async (resolve) => {
        await Promise.all(store.getObjects(null, namedNode(ARENA + 'affords')).filter((affordance) => {
            let preconds = store.getObjects(affordance, namedNode(ARENA + 'hasPrecondition'));
            if(preconds.length == 1 && preconds[0].equals(namedNode(ARENA + 'none'))) {
                let length = 0;
                let kind = false;
                store.getObjects(affordance, namedNode(ARENA + 'hasPostcondition')).forEach((postcond) => {
                    length++;
                    if(store.getQuads(postcond, RDF_PREDICATE, namedNode(ARENA + 'kind')).length > 0 &&
                        store.getQuads(postcond, RDF_OBJECT, namedNode(ARENA + 'mainModule')).length > 0) {
                            kind = true;
                    }
                });
                return length == 4 && kind;
            } else {
                return false;
            }
        }).slice(0, 1).map(async(affordance) => {
            return new Promise(async (resolve) => {
                let productMap = new Map();
                let taskList = rdfList2Array(store.getObjects(affordance, namedNode(ARENA + 'needsTask'))[0]);
                taskList.map((task) => store.getQuads(task, null, null)).reduce((a, b) => a.concat(b), []).forEach((q) => {
                    if(q.predicate.termType == "BlankNode") {
                        let mapped = productMap.get(q.predicate.value);
                        if(!mapped) {
                            let product = namedNode('http://127.0.1.1:8080/products/product-' + generateUUID());
                            productMap.set(q.predicate.value, product);
                        }
                    }
                    if(q.object.termType == "BlankNode") {
                        let mapped = productMap.get(q.object.value);
                        if(!mapped) {
                            let product = namedNode('http://127.0.1.1:8080/products/product-' + generateUUID());
                            productMap.set(q.object.value, product);
                        }
                    }
                });
                await Promise.all(Array.from(productMap.values()).map((product) => {
                    putRequest(product.id, [
                        quad(product, RDF_TYPE, namedNode(ARENA + 'Product')),
                    ]);
                }));
                await Promise.all(taskList.map(async (task, index) => {
                    return new Promise(async (resolve) => {
                        let instrument = store.getObjects(task, namedNode(ARENA + 'instrument'))[0];
                        let affordanceContainer = store.getObjects(instrument, LDP_CONTAINS).filter((container) => store.getQuads(container, RDF_TYPE, namedNode(ARENA + 'TaskContainer')).length > 0)[0];
                        let taskQuads = store.getQuads(task, null, null).map((q) => {
                            let predicate = q.predicate;
                            if(predicate.termType == "BlankNode") {
                                let mapped = productMap.get(predicate.value);
                                if(mapped) {
                                    predicate = mapped;
                                }
                            }
                            let object = q.object;
                            if(object.termType == "BlankNode") {
                                let mapped = productMap.get(object.value);
                                if(mapped) {
                                    object = mapped;
                                }
                            }
                            return quad(namedNode(''), predicate, object);
                        })
                        taskQuads.push(quad(namedNode(''), namedNode(ARENA + 'queuePosition'), literal(index, XSD_INTEGER)));
                        await postRequest(affordanceContainer.id, taskQuads);
                        resolve();
                    });
                }));
                resolve();
            });
        }));
    });
}

function generateUUID() {
  let
    d = new Date().getTime(),
    d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
};

function Cond(bNode) {
  this['bNode'] = bNode;
  this[ARENA + 'kind'] = null;
  this[ARENA + 'locationX'] = null;
  this[ARENA + 'locationY'] = null;

  this.equals = function(other) {
     return other[ARENA + 'kind'] == this[ARENA + 'kind'] && other[ARENA + 'locationX'] == this[ARENA + 'locationX'] && other[ARENA + 'locationY'] == this[ARENA + 'locationY'];
  };
}

function rdfList2Array(rdflist) {
    let first = store.getObjects(rdflist, RDF_FIRST)[0];
    let rest = store.getObjects(rdflist, RDF_REST)[0];
    if(rest.equals(RDF_NIL)) {
        return [first];
    } else {
        return [first].concat(rdfList2Array(rest));
    }
}

function array2RdfList(listNode, array) {
    if(array.length === 1) {
        return [
            quad(listNode, RDF_FIRST, array[0]),
            quad(listNode, RDF_REST, RDF_NIL),
        ];
    } else {
        let newListNode = blankNode();
        return [
            quad(listNode, RDF_FIRST, array[0]),
            quad(listNode, RDF_REST, newListNode),
        ].concat(array2RdfList(newListNode, array.slice(1)));
    }
}

async function getRequest(uri) {
    return new Promise(resolve => {
        if(isVisited(uri)) {
            resolve(false);
        } else {
            started(uri);
            fetch(uri).then(res => {
                res.body.pipe(streamParser);
                finished(uri);
                console.log('GET\t ' + uri + '\t' + res.status);
                numSafeRequest++;
            });
            const streamParser = new N3.StreamParser();
            streamParser.on('data', (quad) => {
                store.addQuad(quad);
            });
            streamParser.on('end', () => {
                resolve(true);
            });
        }
    });
}

async function putRequest(uri, quads) {
    return new Promise(resolve => {
        const writer = new N3.Writer();
        quads.forEach((quad) => {
            if(quad.subject.equals(defaultGraph())) {
                writer.addQuad(namedNode(''), quad.predicate, quad.object);
            } else {
                writer.addQuad(quad.subject, quad.predicate, quad.object);
            }
        })
        writer.end((error, result) => {
            if(error) {
                console.error(error);
            }
            fetch(uri, {
                method: 'PUT',
                body: result,
                headers: {'Content-Type': 'text/turtle'}
            }).then(res => {
                console.log('PUT\t' + uri + '\t' + res.status);
                numUnsafeRequest++;
                resolve();
            });
        });
    });
}

async function postRequest(uri, quads) {
    return new Promise(resolve => {
        const writer = new N3.Writer();
        quads.forEach((quad) => {
            if(quad.subject.equals(defaultGraph())) {
                writer.addQuad(namedNode(''), quad.predicate, quad.object);
            } else {
                writer.addQuad(quad.subject, quad.predicate, quad.object);
            }
        })
        writer.end((error, result) => {
            if(error) {
                console.error(error);
            }
            fetch(uri, {
                method: 'POST',
                body: result,
                headers: {'Content-Type': 'text/turtle'}
            }).then(res => {
                console.log('POST\t' + uri + '\t' + res.status);
                numUnsafeRequest++;
                resolve();
            });
        });
    });
}

function getStoreFromReification(quads) {
    let store = new N3.Store();
    quads.forEach((rei) => {
        let subject = null;
        let predicate = null;
        let object = null;
        rei.forEach((quad) => {
            if(quad.predicate.equals(RDF_SUBJECT)) {
                subject = quad.object;
            } else if(quad.predicate.equals(RDF_PREDICATE)) {
                predicate = quad.object;
            } else if(quad.predicate.equals(RDF_OBJECT)) {
                object = quad.object;
            }
        });
        if(subject && predicate && object) {
            store.addQuad(subject, predicate, object);
        }
    });
    return store;
}

function entails(storeA, storeB) {
    let mapping = new Map();

    return storeB.getQuads(null, null, null).map((q) => {
        let subject = q.subject;
        if(subject.termType == "BlankNode") {
            let mapped = mapping.get(subject.id);
            if(mapped && mapped.length > 0) {
                subject = mapped[0];
            } else {
                subject = null;
            }
        }
        let predicate = q.predicate;
        if(predicate.termType == "BlankNode") {
            let mapped = mapping.get(predicate.id);
            if(mapped) {
                predicate = mapped;
            } else {
                predicate = null;
            }
        }
        let object = q.object;
        if(object.termType == "BlankNode") {
            let mapped = mapping.get(object.id);
            if(mapped) {
                object = mapped;
            } else {
                object = null;
            }
        }

        let correspQuads = storeA.getQuads(subject, predicate, object);
        if(correspQuads.length == 0) {
            let w = new N3.Writer();
            w.addQuad(quad(subject, predicate, object));
            w.end((err, result) => console.error('Not entailed because the following quad was not present: ' + result));
            console.error(mapping)
            return false;
        } else {
            if(!subject) {
                mapping.set(q.subject.id, correspQuads[0].subject);
            }
            if(!predicate) {
                mapping.set(q.predicate.id, correspQuads[0].predicate);
            }
            if(!object) {
                mapping.set(q.object.id, correspQuads[0].object);
            }
            return true;
        }
    }).reduce((a, b) => a && b, true);
}

function entailsHelper(quadsA, quadsB, mapping) {

}

function isVisited(uri) {
    return uriVisisted.get(uri) != undefined; 
}

function started(uri) {
    uriVisisted.set(uri, false);
}

function finished(uri) {
    uriVisisted.set(uri, true);
}