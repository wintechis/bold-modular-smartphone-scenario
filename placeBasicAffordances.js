const N3 = require('n3');
const { DataFactory } = N3;
const { namedNode, blankNode, quad } = DataFactory;
const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

const LDP_CONTAINS = namedNode('http://www.w3.org/ns/ldp#contains');
const RDF_TYPE = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
const RDF_SUBJECT = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#subject');
const RDF_PREDICATE = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate');
const RDF_OBJECT = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#object');
const ARENA = 'http://arena2036.example.org/';

const store = new N3.Store();

const uriVisisted = new Map();

var numSafeRequest = 0;
var numUnsafeRequest = 0;

run();

async function run() {
    let startTime = performance.now();
    // Safe requests
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

    // Unsafe requests
    /*
    Basic affordances (storage stations)
    {
        ?station a arena:Workstation ;
            arena:skills ?skill ;
            arena:locationX ?x ;
            arena:locationY ?y ;
            ldp:contains ?affordanceContainer .

        ?affordanceContainer a arena:AffordanceContainer .

        ?recipe a arena:Recipe ;
            arena:requiresSkill ?skill ;
            NOT PRESENT(arena:requiresProducts ?requires) ;
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
                    ] ;
                    #arena:time ?time .
            } .
    } .
    */
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
                                                            quad(namedNode(''), namedNode(ARENA + 'needsTask'), task),
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
   console.log('Finished in ' + (performance.now() - startTime).toFixed(3) + ' ms. Did ' + numSafeRequest + ' safe and ' + numUnsafeRequest + ' unsafe requests.');
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

async function postRequest(uri, quads) {
    return new Promise(resolve => {
        const writer = new N3.Writer();
        writer.addQuads(quads);
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

function isVisited(uri) {
    return uriVisisted.get(uri) != undefined; 
}

function started(uri) {
    uriVisisted.set(uri, false);
}

function finished(uri) {
    uriVisisted.set(uri, true);
}