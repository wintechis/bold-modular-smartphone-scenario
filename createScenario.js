const N3 = require('n3');
const { DataFactory } = N3;
const { blankNode, namedNode, literal, quad } = DataFactory;
const fs = require('fs');

const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const arena = 'http://arena2036.example.org/'
const xsd = 'http://www.w3.org/2001/XMLSchema#'

let rawdata = fs.readFileSync(process.argv[2]);
let scenario = JSON.parse(rawdata);

const store = new N3.Store();

count = {
    'soldering': 1,
    'memoryStorage': 1,
    'cpuStorage': 1,
    'mainboardStorage': 1,
    'fastTransporter': 1,
    'slowTransporter': 1
}

store.addQuads([
    quad(namedNode('mainboardRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('mainboardRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'mainboardStorage'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'mainboard'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'baseProcessingTime'), literal(4), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('mainboardRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('cpuRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'cpuStorage'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'cpu'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'baseProcessingTime'), literal(5), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('cpuRecipe')),
    quad(namedNode('ramRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('ramRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'memoryStorage'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'ram'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'baseProcessingTime'), literal(3), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('ramRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('flashMemoryRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'memoryStorage'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'flashMemory'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'baseProcessingTime'), literal(4), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('flashMemoryRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('mainModuleRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'soldering'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'cpu'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'ram'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'flashMemory'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'mainboard'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'mainModule'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'baseProcessingTime'), literal(6), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'inputProcessingTime'), literal(1), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'processingTimeVariance'), literal(2), namedNode('mainModuleRecipe')),
])

scenario.forEach(element => {
    switch(element.type) {
        case 'shopfloor':
            store.addQuads([
                quad(namedNode('shopfloor'), namedNode(rdf + 'type'), namedNode(arena + 'Shopfloor'), namedNode('/')),
                quad(namedNode('shopfloor'), namedNode(rdf + 'type'), namedNode(arena + 'Shopfloor'), namedNode('shopfloor')),
                quad(namedNode('shopfloor'), namedNode(arena + 'sizeX'), literal(element['x']), namedNode('shopfloor')),
                quad(namedNode('shopfloor'), namedNode(arena + 'sizeY'), literal(element['y']), namedNode('shopfloor')),
            ])
            break
        case 'soldering':
            store.addQuads([
                quad(namedNode('solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationX2'), literal(element['x'] + 3), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationY2'), literal(element['y'] + 1), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'skills'), namedNode(arena + 'soldering'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'queue'), namedNode('solderingStation' + count['soldering'] + 'TaskQueue'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'affordances'), namedNode('solderingStation' + count['soldering'] + 'Affordances'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'recipe'), namedNode('mainModuleRecipe'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'inputPort'), blankNode('soldering' + count['soldering'] + 'input'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationX'), literal(element['x'] - 1), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationY'), literal(element['y']), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'outputPort'), blankNode('soldering' + count['soldering'] + 'output'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationX'), literal(element['x'] + 4), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationY'), literal(element['y'] + 1), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('solderingStation' + count['soldering'] + 'TaskQueue')),
            ])
            count['soldering'] += 1
            break
        case 'memoryStorage':
            store.addQuads([
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX2'), literal(element['x'] + 1), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY2'), literal(element['y'] + 1), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'skills'), namedNode(arena + 'memoryStorage'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'queue'), namedNode('memoryStorageStation' + count['memoryStorage'] + 'TaskQueue'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'affordances'), namedNode('memoryStorageStation' + count['memoryStorage'] + 'Affordances'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'recipe'), namedNode('ramRecipe'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'outputPort'), blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationX'), literal(element['x'] + 2), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationY'), literal(element['y'] + 1), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('memoryStorageStation' + count['memoryStorage'] + 'TaskQueue')),
            ])
            count['memoryStorage'] += 1
            break
        case 'cpuStorage':
            store.addQuads([
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX2'), literal(element['x'] + 1), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY2'), literal(element['y'] + 1), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'skills'), namedNode(arena + 'cpuStorage'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'queue'), namedNode('cpuStorageStation' + count['cpuStorage'] + 'TaskQueue'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'affordances'), namedNode('cpuStorageStation' + count['cpuStorage'] + 'Affordances'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'recipe'), namedNode('cpuRecipe'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'outputPort'), blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationX'), literal(element['x'] + 2), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationY'), literal(element['y'] + 1), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('cpuStorageStation' + count['cpuStorage'] + 'TaskQueue')),
            ])
            count['cpuStorage'] += 1
            break
        case 'mainboardStorage':
            store.addQuads([
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'locationX2'), literal(element['x'] + 1), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'locationY2'), literal(element['y'] + 1), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'skills'), namedNode(arena + 'mainboardStorage'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'queue'), namedNode('mainboardStorageStation' + count['mainboardStorage'] + 'TaskQueue'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'affordances'), namedNode('mainboardStorageStation' + count['mainboardStorage'] + 'Affordances'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'recipe'), namedNode('mainboardRecipe'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'outputPort'), blankNode('mainboardStorage' + count['mainboardStorage'] + 'output'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(blankNode('mainboardStorage' + count['mainboardStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(blankNode('mainboardStorage' + count['mainboardStorage'] + 'output'), namedNode(arena + 'locationX'), literal(element['x'] + 2), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(blankNode('mainboardStorage' + count['mainboardStorage'] + 'output'), namedNode(arena + 'locationY'), literal(element['y'] + 1), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(blankNode('mainboardStorage' + count['mainboardStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('mainboardStorageStation' + count['mainboardStorage'])),
                quad(namedNode('mainboardStorageStation' + count['mainboardStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('mainboardStorageStation' + count['mainboardStorage'] + 'TaskQueue')),
            ])
            count['mainboardStorage'] += 1
            break
        case 'slowTransporter':
            store.addQuads([
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('/')),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'locationX'), literal(element['x']), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'locationY'), literal(element['y']), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'speed'), literal(0.5), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'capacity'), literal(4), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'queue'), namedNode('slowTransporter' + count['slowTransporter'] + 'TaskQueue'), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('slowTransporter' + count['slowTransporter'] + 'TaskQueue')),
            ])
            count['slowTransporter'] += 1
            break
        case 'fastTransporter':
            store.addQuads([
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('/')),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'locationX'), literal(element['x']), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'locationY'), literal(element['y']), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'speed'), literal(1), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'capacity'), literal(2), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'queue'), namedNode('fastTransporter' + count['fastTransporter'] + 'TaskQueue'), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('fastTransporter' + count['fastTransporter'] + 'TaskQueue')),
            ])
            count['fastTransporter'] += 1
            break
    }
});

const writer = new N3.Writer(fs.createWriteStream(process.argv[2].substring(0, process.argv[2].lastIndexOf('.')) + '.trig'), {
        prefixes: {
            rdf: rdf,
            arena: arena,
            xsd: xsd
    },
    format: 'application/trig'
});
writer.addQuads(store.getQuads(null, null, null, null))
writer.end()